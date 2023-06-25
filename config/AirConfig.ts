import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'

/**
 * # AirPower全局配置
 * @author Hamm
 */
export class AirConfig {
  /**
   * # 当前版本号
   */
  static readonly version = 'v1.0.0'

  /**
   * # 应用Key
   */
  static appKey = ''

  /**
   * # API请求根地址(带/)
   */
  static apiUrl = ''

  /**
   * # 静态资源根地址(带/)
   */
  static staticUrl = ''

  /**
   * # 上传地址
   */
  static uploadUrl = 'attach/upload'

  /**
   * # 上传文件默认
   */
  static uploadFileName = 'file'

  /**
   * # 网络请求失败最大重试次数
   */
  static retryTimesWhenNetworkError = 3

  /**
   * # 接口请求成功的状态码
   */
  static successCode = 200

  /**
   * # 需要登录的状态码
   */
  static unAuthorizeCode = 401

  /**
   * # http请求身份令牌的header的key值
   */
  static authorizationHeaderKey = 'authorization'

  /**
   * # AppKey Header
   */
  static appKeyHeader = 'appkey'

  /**
   * # Http返回状态码的字段
   */
  static httpCodeKey = 'code'

  /**
   * # Http返回错误信息的字段
   */
  static httpMessageKey = 'message'

  /**
   * # Http返回数据的字段
   */
  static httpDataKey = 'data'

  /**
   * # 默认时间格式
   */
  static defaultDateTimeFormatter = AirDateTimeFormatter.MM_DD_HH_mm

  /**
   * # 保存身份令牌
   * @param accessToken 身份令牌
   */
  static saveAccessToken(accessToken: string): void {
    wx.setStorageSync(this.authorizationHeaderKey, accessToken)
  }

  /**
   * # 跳转登录的方法
   */
  static login = () => {
    wx.redirectTo({
      url: '/view/login',
    })
  }

  /**
   * # 获取身份令牌
   */
  static getAccessToken(): string {
    return wx.getStorageSync(this.authorizationHeaderKey) || ''
  }

  /**
   * # 移除本地存储的身份令牌
   */
  static removeAccessToken(): void {
    wx.removeStorageSync(this.authorizationHeaderKey)
  }
}
