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
import { AirAny } from '../type/AirType'
import { AirConstant } from '../config/AirConstant'

/**
 * # 网络请求类
 * @author Hamm.cn
 */
export class AirHttp {
  /**
   * ## 访问的接口 `URL`
   */
  private url = AirConstant.EMPTY_STRING

  /**
   * ## `Loading`
   */
  private loading!: Ref<boolean>

  /**
   * ## 基础返回对象
   */
  private axiosResponse!: Promise<AxiosResponse<AirAny, AirAny>>

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
    this.axiosRequestConfig.baseURL = this.url.indexOf(AirConstant.PREFIX_HTTP) === 0 || this.url.indexOf(AirConstant.PREFIX_HTTPS) === 0 ? AirConstant.EMPTY_STRING : AirConfig.apiUrl
    this.axiosRequestConfig.timeout = this.timeout
    this.axiosRequestConfig.headers = {}
    this.axiosRequestConfig.headers[AirConstant.CONTENT_TYPE] = AirHttpContentType.JSON
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
    return this.addHttpHeader('Content-Type', contentType)
  }

  /**
   * ## 发送请求
   *
   * @param body `可选` 请求体
   * @see post() 直接发送 `POST`
   * @see get() 直接发送 `GET`
   */
  send(body?: unknown): Promise<AirAny> {
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
        if (AirHttp.isSuccess(data)) {
          // 成功
          resolve(AirHttp.getResponseData(data))
          return
        }
        if (this.errorCallback) {
          reject(data)
          return
        }
        if (AirHttp.isContinue(data)) {
          // 需要继续操作
          AirAlert.success(data[AirConfig.httpMessageKey] || AirI18n.get().SomeOperateSuccessAndContinuePlease || '部分操作成功，请继续操作', AirI18n.get().ContinueOperate || '继续操作')
          reject(data)
          return
        }
        if (AirHttp.isUnAuthorize(data)) {
          // 需要登录
          this.redirectToLogin()
          return
        }
        // 其他业务错误
        AirNotification.error(data[AirConfig.httpMessageKey] || defaultErrorMessage, errorTitle)
      }).catch((err) => {
        if (this.errorCallback) {
          reject(err)
          return
        }
        if (AirHttp.isUnAuthorize(err)) {
          // 一般不会使用这种方式
          this.redirectToLogin()
          return
        }
        AirNotification.error(defaultErrorMessage, errorTitle)
      }).finally(() => {
        if (this.loading) {
          this.loading.value = false
        }
      })
    })
  }

  /**
   * ## 跳转到登录页面
   */
  // eslint-disable-next-line class-methods-use-this
  private redirectToLogin(): void {
    // 需要登录
    if (!AirConfig.router) {
      AirNotification.error('请为 airpower/app 的 AirConfig 注入当前项目的路由', '请先登录')
      return
    }
    AirConfig.router.push('/login')
  }

  /**
   * ## 获取请求返回的数据
   * @param data 请求返回的数据
   * @returns 数据
   */
  public static getResponseData(data: IJson): AirAny {
    return data[AirConfig.httpDataKey]
  }

  /**
   * ## 是否操作成功
   * @param data 请求返回的数据
   * @returns `true` 操作成功
   */
  public static isSuccess(data: IJson): boolean {
    return data[AirConfig.httpCodeKey] === AirConfig.successCode
  }

  /**
   * ## 是否需要登录
   * @param data 请求返回的数据
   * @returns `true` 需要登录
   */
  public static isUnAuthorize(data: IJson): boolean {
    return data[AirConfig.httpCodeKey] === AirConfig.unAuthorizeCode
  }

  /**
   * ## 是否需要继续操作
   * @param data 请求返回的数据
   * @returns `true` 继续操作
   */
  public static isContinue(data: IJson): boolean {
    return data[AirConfig.httpCodeKey] === AirConfig.continueCode
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
  get(params?: IJson): Promise<AirAny> {
    if (params) {
      const queryArray: string[] = []
      // eslint-disable-next-line guard-for-in
      for (const key in params) {
        queryArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      if (this.url.includes(AirConstant.QUESTION_MARK)) {
        this.url += `&${queryArray.join(AirConstant.AND_MARK)}`
      } else {
        this.url += `?${queryArray.join(AirConstant.AND_MARK)}`
      }
    }
    this.setHttpMethod(AirHttpMethod.GET)
    return this.send()
  }
}
