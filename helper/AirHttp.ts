/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { Ref } from 'vue'
import { AirNotification } from '../feedback/AirNotification'
import { AirHttpContentType } from '../enum/AirHttpContentType'
import { AirHttpMethod } from '../enum/AirHttpMethod'
import { AirConfig } from '../config/AirConfig'
import { AirModel } from '../base/AirModel'
import { IJson } from '../interface/IJson'
import { AirAlert } from '../feedback/AirAlert'
import { AirI18n } from './AirI18n'

/**
 * # 网络请求类
 * @author Hamm.cn
 */
export class AirHttp {
  /**
   * ## 访问的接口 `URL`
   */
  private url = ''

  /**
   * ## `Loading`
   */
  private loading!: Ref<boolean>

  /**
   * ## 基础返回对象
   */
  private axiosResponse!: Promise<AxiosResponse<any, any>>

  /**
   * ## 基础请求配置
   */
  private axiosRequestConfig: AxiosRequestConfig = {}

  /**
   * ## 是否隐藏自动错误提示
   */
  private errorCallback = false

  /**
   * ## 请求超时毫秒数
   */
  private timeout = AirConfig.timeout

  /**
   * ## 设置请求超时时间
   * @param timeout 超时毫秒数
   */
  setTimeout(timeout: number) {
    this.timeout = timeout
    return this
  }

  /**
   * ## 是否回调错误信息
   */
  callbackError(): this {
    this.errorCallback = true
    return this
  }

  /**
   * ## 创建一个 `AirHttp` 实例
   * @param url `可选` 请求的地址
   */
  constructor(url?: string) {
    if (url) {
      this.url = url
    }
    // 初始化一些默认值
    this.axiosRequestConfig.method = <Method>AirHttpMethod.POST
    this.axiosRequestConfig.baseURL = AirConfig.apiUrl
    this.axiosRequestConfig.timeout = this.timeout
    this.axiosRequestConfig.headers = {
      'content-type': AirHttpContentType.JSON,
    }
    const accessToken = AirConfig.getAccessToken()
    if (accessToken) {
      this.axiosRequestConfig.headers[AirConfig.authorizationHeaderKey] = accessToken
    }
    if (url) {
      this.url = url
    }
  }

  /**
   * ## 创建一个 `AirHttp` 客户端
   * @param url 请求的 `URL`
   */
  static create(url: string): AirHttp {
    return new AirHttp(url)
  }

  /**
   * ## 设置 `Loading`
   * @param loading Loading
   *
   */
  setLoading(loading: Ref<boolean>): this {
    this.loading = loading
    return this
  }

  /**
   * ## 设置请求头
   * @param header 请求头
   */
  setHttpHeader(header: IJson): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers['content-type']) {
      header = {
        ...header,
        'content-type': this.axiosRequestConfig.headers['content-type'],
      }
    }
    this.axiosRequestConfig.headers = header
    return this
  }

  /**
   * ## 允许携带 `Cookies`
   */
  withCredentials(): this {
    this.axiosRequestConfig.withCredentials = true
    return this
  }

  /**
   * ## 添加一个请求头
   * @param key 请求头 `key`
   * @param value 请求头 `value`
   */
  addHttpHeader(key: string, value: string): this {
    this.axiosRequestConfig.headers = this.axiosRequestConfig.headers || {}
    this.axiosRequestConfig.headers[key] = value
    return this
  }

  /**
   * ## 设置请求方法
   * - 支持直接调用 `.post()` `.get()`
   * @param method 请求方法
   */
  setHttpMethod(method: AirHttpMethod): this {
    this.axiosRequestConfig.method = <Method>method
    return this
  }

  /**
   * ## 设置请求`content-type`
   * @param contentType `content-type`
   */
  setContentType(contentType: AirHttpContentType): this {
    this.axiosRequestConfig.headers = {
      ...this.axiosRequestConfig.headers,
      'content-type': contentType,
    }
    return this
  }

  /**
   * ## 发送请求
   *
   * @param body `可选` 请求体
   * @see post() 直接发送 `POST`
   * @see get() 直接发送 `GET`
   */
  send(body?: any): Promise<any> {
    /**
     * 如传入了自定义的loading, 则标记loading
     */
    if (this.loading) {
      this.loading.value = true
    }
    switch (this.axiosRequestConfig.method) {
      case AirHttpMethod.POST:
        this.axiosResponse = axios.post(this.url, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.PUT:
        this.axiosResponse = axios.put(this.url, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.PATCH:
        this.axiosResponse = axios.patch(this.url, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.DELETE:
        this.axiosResponse = axios.delete(this.url, this.axiosRequestConfig)
        break
      default:
        this.axiosResponse = axios.get(this.url, this.axiosRequestConfig)
    }
    return new Promise((resolve, reject) => {
      const errorTitle = AirI18n.get().SystemError || AirConfig.errorTitle
      const defaultErrorMessage = AirI18n.get().SystemErrorAndRetryPlease || AirConfig.errorMessage
      this.axiosResponse.then(({ data }) => {
        if (data[AirConfig.httpCodeKey] === AirConfig.successCode) {
          // 成功
          resolve(data[AirConfig.httpDataKey])
          return
        }
        if (this.errorCallback) {
          reject(data)
          return
        }
        if (data[AirConfig.httpCodeKey] === AirConfig.continueCode) {
          // 需要继续操作
          AirAlert.success(data[AirConfig.httpMessageKey] || AirI18n.get().SomeOperateSuccessAndContinuePlease || '部分操作成功，请继续操作', AirI18n.get().ContinueOperate || '继续操作')
          reject(data)
          return
        }
        if (data[AirConfig.httpCodeKey] === AirConfig.unAuthorizeCode) {
          // 需要登录
          if (!AirConfig.router) {
            AirNotification.error('请为 airpower/app 的 AirConfig 注入当前项目的路由', '请先登录')
            reject(data)
            return
          }
          AirConfig.router.push('/login')
          reject(data)
          return
        }
        // 其他业务错误
        AirNotification.error(data[AirConfig.httpMessageKey] || defaultErrorMessage, errorTitle)
        reject(data)
      }).catch((err) => {
        // 其他错误
        if (!this.errorCallback) {
          AirNotification.error(defaultErrorMessage, errorTitle)
        }
        reject(err)
      }).finally(() => {
        if (this.loading) {
          this.loading.value = false
        }
      })
    })
  }

  /**
   * ## 发送 `POST`
   * @param model 发送的数据模型(数组)
   */
  post<T extends AirModel>(model?: T | T[]): Promise<IJson | IJson[]> {
    let json = {}
    if (model) {
      if (Array.isArray(model)) {
        json = model.map((item) => item.toJson())
      } else {
        json = model.toJson()
      }
    }
    this.setHttpMethod(AirHttpMethod.POST)
    return this.send(json)
  }

  /**
   * ## 发送 `GET` 请求 只支持简单一维数据
   * @param params `可选` 可携带的参数
   */
  get(params?: IJson): Promise<any> {
    if (params) {
      const queryArray: string[] = []
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
    this.setHttpMethod(AirHttpMethod.GET)
    return this.send()
  }
}
