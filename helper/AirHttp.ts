/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders, Method,
} from 'axios'
import { Ref } from 'vue'
import { AirNotification } from '../feedback/AirNotification'
import { AirHttpContentType } from '../enum/AirHttpContentType'
import { AirHttpMethod } from '../enum/AirHttpMethod'
import { AirConfig } from '../config/AirConfig'
import { AirModel } from '../base/AirModel'
import { IJson } from '../interface/IJson'

/**
 * # 网络请求类
 * @author Hamm
 */
export class AirHttp {
  /**
   * # 基础返回对象
   */
  private axiosResponse!: Promise<AxiosResponse<any, any>>

  /**
   * # 基础请求配置
   */
  private axiosRequestConfig: AxiosRequestConfig = {}

  /**
   * # 当前请求路径
   */
  private url = ''

  /**
   * # 是否隐藏自动错误提示
   */
  private errorCallback = false

  /**
   * # 是否回调错误信息
   */
  callbackError(): this {
    this.errorCallback = true
    return this
  }

  /**
   * # 配置一个Loading的Ref对象
   */
  private loading!: Ref<boolean>

  /**
   * # 创建一个HTTP实例
   * @param url [可选] 请求的地址
   */
  constructor(url?: string, baseUrl?: string) {
    if (url) {
      this.url = url
    }
    if (baseUrl) {
      this.url = `${baseUrl}/${this.url}`
    }
    // 初始化一些默认值
    this.axiosRequestConfig.method = <Method>AirHttpMethod.POST
    this.axiosRequestConfig.baseURL = AirConfig.apiUrl
    this.axiosRequestConfig.timeout = AirConfig.timeout
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
   * # 创建一个AirHttp客户端
   * @param url 请求的URL
   */
  static create(url: string): AirHttp {
    return new AirHttp(url)
  }

  /**
   * # 设置Loading的Ref对象
   * @param loading Loading的Ref
   *
   */
  setLoading(loading: Ref<boolean>): this {
    this.loading = loading
    return this
  }

  /**
   * # 设置请求头
   * @param header 请求头
   */
  setHttpHeader(header: IJson): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers['content-type']) {
      header = { ...header, 'content-type': this.axiosRequestConfig.headers['content-type'] }
    }
    this.axiosRequestConfig.headers = header as AxiosRequestHeaders
    return this
  }

  /**
   * # 添加一个请求头
   * @param key 请求头key
   * @param value 请求头value
   */
  addHttpHeader(key: string, value: string): this {
    this.axiosRequestConfig.headers = this.axiosRequestConfig.headers || {} as AxiosResponseHeaders
    this.axiosRequestConfig.headers[key] = value
    return this
  }

  /**
   * # 设置请求方法
   * - 支持直接调用 ```.post()``` ```.get()```
   * @param method 请求方法
   */
  setHttpMethod(method: AirHttpMethod): this {
    this.axiosRequestConfig.method = <Method>method
    return this
  }

  /**
   * # 设置请求content-type
   * @param contentType content-type
   */
  setContentType(contentType: AirHttpContentType): this {
    this.axiosRequestConfig.headers = { ...this.axiosRequestConfig.headers, 'content-type': contentType }
    return this
  }

  /**
   * # 发送请求
   *
   * @param body [可选]请求体
   * @see post() 直接发送POST
   * @see get() 直接发送GET
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
    return new Promise((data, error) => {
      this.axiosResponse.then((res) => {
        if (this.loading) {
          this.loading.value = false
        }
        switch (res.data[AirConfig.httpCodeKey]) {
          case AirConfig.successCode:
            // 成功
            data(res.data[AirConfig.httpDataKey])
            break
          case AirConfig.unAuthorizeCode:
            // 需要登录
            if (AirConfig.router) {
              if (this.errorCallback) {
                error(res.data)
              } else {
                AirConfig.router.push('/login')
              }
            } else {
              AirNotification.error('请为@/airpower/app的AirConfig注入当前项目的路由', '请先登录')
            }
            break
          default:
            // 其他业务错误
            if (!this.errorCallback) {
              AirNotification.error(res.data[AirConfig.httpMessageKey] || AirConfig.errorMessage, AirConfig.errorTitle)
            }
            error(res.data)
        }
      }).catch((err) => {
        // 其他错误
        if (this.loading) {
          this.loading.value = false
        }
        if (!this.errorCallback) {
          AirNotification.error(AirConfig.errorMessage, AirConfig.errorTitle)
        }
        error(err)
      })
    })
  }

  /**
   * # 发送POST
   * @param model 发送的数据模型(数组)
   */
  post<T extends AirModel>(model?: T | T[]): Promise<IJson | IJson[]> {
    let json = {}
    if (model) {
      if (model instanceof Array) {
        json = model.map((item) => item.toJson())
      } else {
        json = model.toJson()
      }
    }
    this.setHttpMethod(AirHttpMethod.POST)
    return this.send(json)
  }

  /**
   * # 发送GET请求 只支持简单一维数据
   * @param params [可选]可携带的参数
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
    this.setHttpMethod(AirHttpMethod.GET)
    return this.send()
  }
}
