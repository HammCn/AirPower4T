/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirModel } from '../base/AirModel'
import { AirConfig } from '../config/AirConfig'
import { AirAlert } from '../feedback/AirAlert'
import { AirConfirm } from '../feedback/AirConfirm'
import { AirLoading } from '../feedback/AirLoading'
import { IFile } from '../interface/IFile'
import { IJson } from '../interface/IJson'
import { AirFileEntity } from '../model/entity/AirFileEntity'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * # 封装的网络请求类
 * @author Hamm
 */
export class AirHttp {
  /**
   * # 访问的接口URL
   */
  private url = ''

  /**
   * # Loading
   */
  private loading = ''

  /**
   * # 请求方式 默认POST
   */
  private method: 'GET' | 'POST' = 'POST'

  /**
   * # 回调失败信息
   */
  private errorCallback = false

  /**
   * # 请求头
   */
  private header: IJson = {}

  /**
   * # 操作重试次数
   */
  private triedTimes = 0

  /**
   * # 创建一个HTTP实例
   * @param url (可选) 请求的地址
   */
  constructor(url?: string) {
    if (url) {
      this.url = url
    }
    this.header[AirConfig.appKeyHeader] = AirConfig.appKey
    this.header[AirConfig.authorizationHeaderKey] = AirConfig.getAccessToken()
  }

  /**
   * # 编辑请求头
   * @param key KEY
   * @param value VALUE
   */
  setHeader(key: string, value: any): this {
    this.header[key] = value
    return this
  }

  /**
   * # 是否回调错误信息
   */
  callbackError(): this {
    this.errorCallback = true
    return this
  }

  /**
   * # 是否显示加载中状态
   * @param loading 加载文字
   */
  setLoading(loading: string): this {
    this.loading = loading
    return this
  }

  /**
   * # 上传文件
   * @param option 上传配置
   * @param clazz 转换的类
   */
  async upload<T extends IFile>(option: UniNamespace.UploadFileOption, clazz?: ClassConstructor<T>): Promise<T> {
    return new Promise((success, fail) => {
      if (this.loading) {
        AirLoading.show(this.loading)
      }
      option.header = this.header
      option.url = option.url || (AirConfig.apiUrl + this.url)

      option.complete = () => {
        if (this.loading) {
          AirLoading.hide()
        }
      }
      option.success = (res) => {
        try {
          const json = JSON.parse(res.data)
          switch (json[AirConfig.httpCodeKey]) {
            case AirConfig.successCode:
              if (clazz) {
                // eslint-disable-next-line new-cap
                success(AirModel.parse(new clazz(), json[AirConfig.httpDataKey]))
                return
              }
              success(AirFileEntity.fromJson(json[AirConfig.httpDataKey]) as T)
              break
            case AirConfig.unAuthorizeCode:
              AirConfig.login()
              break
            default:
              if (this.errorCallback) {
                fail(json[AirConfig.httpMessageKey])
                return
              }
              AirAlert.show('上传失败', json[AirConfig.httpMessageKey] as string || '上传文件失败, 请稍后再试')
          }
        } catch (e) {
          if (this.errorCallback) {
            fail(e)
            return
          }
          AirAlert.show('上传失败', '上传文件失败, 请稍后再试')
        }
      }
      uni.uploadFile(option)
    })
  }

  /**
   * # 发送请求
   *
   * @param body (可选)请求体
   * @see post() 直接发送POST
   * @see get() 直接发送GET
   */
  async send(json: IJson): Promise<any> {
    return new Promise((success, fail) => {
      try {
        if (this.loading) {
          AirLoading.show(this.loading)
        }
        console.warn('[HTTP HEADER]', this.header)
        console.warn('[HTTP BODY]', json)
        console.warn('[HTTP URL]', AirConfig.apiUrl + this.url)
        uni.request({
          url: AirConfig.apiUrl + this.url,
          data: json,
          method: this.method,
          header: this.header,
          success: (res) => {
            const json = res.data as IJson
            try {
              switch (json[AirConfig.httpCodeKey]) {
                case AirConfig.successCode:
                  console.warn('[HTTP DATA]', json[AirConfig.httpDataKey])
                  success(json[AirConfig.httpDataKey])
                  break
                case AirConfig.unAuthorizeCode:
                  console.warn('[HTTP LOGIN]', res.data)
                  if (this.errorCallback) {
                    fail(json)
                    return
                  }
                  AirConfig.login()
                  break
                default:
                  console.warn('[HTTP ERROR]', res.data)
                  if (this.errorCallback) {
                    fail(json)
                    return
                  }
                  AirAlert.show(json[AirConfig.httpMessageKey] as string || '服务器处理异常, 请稍后再试')
              }
            } catch (e) {
              console.warn('[HTTP ERROR]', res.data, e)
              if (this.errorCallback) {
                fail(e)
                return
              }
              AirAlert.show('操作失败', '解析数据出现异常, 请联系管理员处理')
            }
          },
          fail: (res) => {
            console.warn('[HTTP ERROR]', res)
            this.triedTimes += 1
            console.warn(res)
            if (this.errorCallback) {
              fail(res)
              return
            }
            // 尝试重试
            if (this.triedTimes <= AirConfig.retryTimesWhenNetworkError) {
              AirConfirm.create().setConfirmText('重试').show('网络错误', '请求网络出现异常, 是否重试?').then(async () => {
                try {
                  const res = await this.send(json)
                  success(res)
                } catch (e) {
                  fail(e)
                }
              })
                .catch(() => fail(res))
            } else {
              this.triedTimes = 0
              AirAlert.show('网络错误', '请求网络出现异常, 请检查你的网络信息或稍后再试')
              fail(res)
            }
          },
          complete: () => {
            if (this.loading) {
              AirLoading.hide()
            }
          },
        })
      } catch (e) {
        console.warn('net work error', e)
      }
    })
  }

  /**
   * # 发送POST
   * @param model 发送的数据模型(数组)
   */
  async post<T extends AirModel>(model?: T | T[]): Promise<IJson | IJson[]> {
    let json = {}
    if (model) {
      if (Array.isArray(model)) {
        json = model.map((item) => item.toJson())
      } else {
        json = model.toJson()
      }
    }
    this.method = 'POST'
    return this.send(json)
  }

  /**
   * # 发送GET请求 只支持简单一维数据
   * @param params (可选)可携带的参数
   */
  get(params?: IJson): Promise<any> {
    if (params) {
      const queryArray = []
      // eslint-disable-next-line guard-for-in
      for (const key in params) {
        queryArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      if (this.url.includes('?')) {
        this.url += `&${queryArray.join('&')}`
      } else {
        this.url += `?${queryArray.join('&')}`
      }
    }
    this.method = 'GET'
    return this.send({})
  }
}
