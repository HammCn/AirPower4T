import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirCode } from '../enum/AirCode'
import { AirApi } from './AirApi'
import { AirCodeNumber } from '../type/AirType'
import { AirConstant } from './AirConstant'

/**
 * # `AirPower` 全局配置
 * 可自行在 `main.ts` 中覆盖此类中的配置
 * @author Hamm.cn
 */
export class AirConfig {
  /**
   * ## `AirPower` 版本号
   */
  static readonly version = 'v2.3.5'

  /**
   * ## `AppKey`
   * 用于处理一些唯一场景做项目区分 以及 `Oauth2` 的 `AppKey`
   */
  static appKey = 'airpower'

  /**
   * ## `AppKey Header`
   */
  static appKeyHeader = 'appkey'

  /**
   * ## 项目名称
   */
  static product = AirConstant.EMPTY_STRING

  /**
   * ## 接口根地址
   * 以 `/` 结尾
   */
  static apiUrl = ''

  /**
   * ## 静态资源根路径
   * 以 `/` 结尾
   */
  static staticUrl = ''

  /**
   * ## 默认的文件上传地址
   */
  static uploadUrl = `${AirConfig.apiUrl}attach/upload`

  /**
   * ## 上传文件默认字段名称
   */
  static uploadFileName = 'file'

  /**
   * ## `AccessToken` 对应的 `Key`
   * `缓存的名称` 和 `Api传输的Header` 都叫这个名字
   */
  static authorizationHeaderKey = 'Authorization'

  /**
   * ## `Http` 返回状态码的字段
   */
  static httpCodeKey = 'code'

  /**
   * ## `Http` 返回错误信息的字段
   */
  static httpMessageKey = 'message'

  /**
   * ## `Http` 返回数据的字段
   */
  static httpDataKey = 'data'

  /**
   * ## 全局 `http` 请求返回 成功状态码
   */
  static successCode: AirCodeNumber = AirCode.SUCCESS

  /**
   * ## 全局 `http` 请求返回 继续状态码
   */
  static continueCode: AirCodeNumber = AirCode.CONTINUE

  /**
   * ## 全局 `http` 请求返回 登录状态码
   */
  static unAuthorizeCode: AirCodeNumber = AirCode.UNAUTHORIZED

  /**
   * ## 默认的格式化时间
   * ```
   */
  static dateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss

  /**
   * ## 网络请求失败最大重试次数
   */
  static retryTimesWhenNetworkError = 3

  /**
   * ## 跳转登录的方法
   */
  static login = () => {
    AirApi.redirect('/view/login')
  }
  /**
   * ## 保存身份令牌
   * @param accessToken 身份令牌
   */
  static saveAccessToken(accessToken: string): void {
    AirApi.setStorage(this.authorizationHeaderKey, accessToken)
  }

  /**
   * ## 获取身份令牌
   */
  static getAccessToken(): string {
    return AirApi.getStorage(this.authorizationHeaderKey)
  }

  /**
   * ## 移除本地存储的身份令牌
   */
  static removeAccessToken(): void {
    AirApi.removeStorage(this.authorizationHeaderKey)
  }
}
