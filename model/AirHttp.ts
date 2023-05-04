/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders, Method,
} from 'axios'
import { Ref } from 'vue'
import { AirConfig } from '../AirConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirHttpContentType } from '../enum/AirHttpContentType'
import { AirHttpMethod } from '../enum/AirHttpMethod'

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
  private httpUrl = ''

  /**
   * # 是否隐藏自动错误提示
   */
  private flagIgnoreError = false

  /**
   * # 配置一个Loading的Ref对象
   */
  private loading!: Ref<boolean>

  /**
   * # 初始化一个AirHttp客户端
   * @param url 请求URL
   */
  constructor(url: string) {
    // 初始化一些默认值
    this.axiosRequestConfig.method = <Method>AirHttpMethod.POST
    this.axiosRequestConfig.baseURL = AirConfig.apiRootUrl
    this.axiosRequestConfig.timeout = AirConfig.timeout
    this.axiosRequestConfig.headers = {
      'content-type': AirHttpContentType.JSON,
    }
    const accessToken = AirConfig.getAccessToken()
    if (accessToken) {
      this.axiosRequestConfig.headers[AirConfig.accessTokenKey] = accessToken
    }
    if (url) {
      this.httpUrl = url
    }
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
  setHttpHeader(header: Record<string, string>): this {
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
   * # 不自动处理错误
   * ---
   * ### 💡 请注意自行接管错误信息
   */
  withOutError(): this {
    this.flagIgnoreError = true
    return this
  }

  /**
   * # 不提交认证的header信息
   */
  withOutToken(): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers[AirConfig.accessTokenKey]) {
      delete this.axiosRequestConfig.headers[AirConfig.accessTokenKey]
    }
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
        this.axiosResponse = axios.post(this.httpUrl, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.PUT:
        this.axiosResponse = axios.put(this.httpUrl, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.PATCH:
        this.axiosResponse = axios.patch(this.httpUrl, body, this.axiosRequestConfig)
        break
      case AirHttpMethod.DELETE:
        this.axiosResponse = axios.delete(this.httpUrl, this.axiosRequestConfig)
        break
      default:
        this.axiosResponse = axios.get(this.httpUrl, this.axiosRequestConfig)
    }
    return new Promise((data, error) => {
      this.axiosResponse.then((res) => {
        if (this.loading) {
          this.loading.value = false
        }
        switch (res.data[AirConfig.defaultHttpGlobalCodeKey]) {
          case AirConfig.defaultHttpSuccessCode:
            // 成功
            data(res.data[AirConfig.defaultHttpGlobalDataKey])
            break
          case AirConfig.defaultHttpUnauthorizedCode:
            // 需要登录
            if (AirConfig.router) {
              if (this.flagIgnoreError) {
                error(res.data)
              } else {
                AirConfig.router.push('/login')
              }
            } else {
              new AirNotification()
                .setTitle('请先登录')
                .setMessage('请为@/airpower/app的AirConfig注入当前项目的路由')
                .error()
            }
            break
          default:
            // 其他业务错误
            if (!this.flagIgnoreError) {
              new AirNotification()
                .setTitle(AirConfig.errorTitle)
                .setMessage(res.data[AirConfig.defaultHttpGlobalMessageKey] || AirConfig.errorMessage)
                .error()
            }
            error(res.data)
        }
      }).catch((err) => {
        // 其他错误
        if (this.loading) {
          this.loading.value = false
        }
        if (!this.flagIgnoreError) {
          new AirNotification()
            .setTitle(AirConfig.errorTitle)
            .setMessage(AirConfig.errorMessage)
            .error()
        }
        error(err)
      })
    })
  }

  /**
   * # 发送POST请求
   * @param body [可选]POST的数据
   */
  post(body?: any): Promise<any> {
    this.setHttpMethod(AirHttpMethod.POST)
    return this.send(body)
  }

  /**
   * # 发送GET请求 只支持简单一维数据
   * @param params [可选]可携带的参数
   */
  get(params?: Record<string, any>): Promise<any> {
    if (params) {
      const queryArray = []
      // eslint-disable-next-line guard-for-in
      for (const key in params) {
        queryArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      if (this.httpUrl.includes('?')) {
        this.httpUrl += `&${queryArray.join('&')}`
      } else {
        this.httpUrl += `?${queryArray.join('&')}`
      }
    }
    this.setHttpMethod(AirHttpMethod.GET)
    return this.send()
  }
}
