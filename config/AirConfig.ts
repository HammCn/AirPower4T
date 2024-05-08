import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirCode } from '../enum/AirCode'
import { AirApi } from './AirApi'

/**
 * # AirPower 全局配置
 * ---
 * 💡 可自行在 ```main.ts``` 中覆盖此类中的配置
 * @author Hamm
 */
export class AirConfig {
  // #region 全局配置
  /**
   * # AirPower版本号
   */
  static readonly version = 'v1.4.9'

  /**
   * # AppKey
   * ---
   * 💡 用于处理一些唯一场景做项目区分 以及Oauth2的AppKey
   */
  static appKey = 'airpower'

  /**
   * # AppKey Header
   */
  static appKeyHeader = 'appkey'

  /**
   * # 项目名称
   * ---
   * 💡 会显示在浏览器标题上
   */
  static product = ''

  /**
   * # 接口根地址
   * ---
   * ### 💡 以 ```/``` 结尾
   */
  static apiUrl = ''

  /**
   * # 静态资源根路径
   * ---
   * ### 💡 以 ```/``` 结尾
   */
  static staticUrl = ''

  /**
   * # 默认的文件上传地址
   */
  static uploadUrl = `${AirConfig.apiUrl}attach/upload`

  /**
   * # 上传文件默认字段名称
   */
  static uploadFileName = 'file'

  /**
   * # AccessToken对应的Key
   * ---
   * 💡 ```缓存的名称``` 和 ```Api传输的Header``` 都叫这个名字
   */
  static authorizationHeaderKey = 'authorization'

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
   * # 全局http请求返回 成功状态码
   */
  static successCode: AirCode | number = AirCode.SUCCESS

  /**
   * # 全局http请求返回 继续状态码
   */
  static continueCode: AirCode | number = AirCode.CONTINUE

  /**
   * # 全局http请求返回 登录状态码
   */
  static unAuthorizeCode: AirCode | number = AirCode.UNAUTHORIZED

  /**
   * # 权限列表
   */
  private static permissionList: string[] = []

  /**
   * # 权限缓存Key
   */
  private static readonly permissionKey = '_permissions'

  /**
   * # 保存权限列表
   * @param permissions 权限列表
   */
  static savePermissionList(permissions: string[]) {
    this.permissionList = permissions
    AirApi.setStorage(this.appKey + this.permissionKey, JSON.stringify(permissions))
  }

  /**
   * # 获取缓存的权限列表
   */
  static getPermissionList(): string[] {
    const str = AirApi.getStorage(this.appKey + this.permissionKey) || '[]'
    try {
      return JSON.parse(str)
    } catch (e) {
      return []
    }
  }

  /**
   * # 是否有权限
   * @param permission 权限标识
   */
  static hasPermission(permission: string): boolean {
    return this.permissionList.includes(permission)
  }

  /**
   * # 保存身份令牌
   * @param accessToken 身份令牌
   */
  static saveAccessToken(accessToken: string): void {
    AirApi.setStorage(this.authorizationHeaderKey, accessToken)
  }

  /**
   * # 获取身份令牌
   */
  static getAccessToken(): string {
    return AirApi.getStorage(this.authorizationHeaderKey)
  }

  /**
   * # 移除本地存储的身份令牌
   */
  static removeAccessToken(): void {
    AirApi.removeStorage(this.authorizationHeaderKey)
  }

  /**
   * # 默认的格式化时间
   * ---
   * 💡 ```ADateTime``` ```ATable``` 的格式化都将默认使用这个配置
   * ```
   */
  static dateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss

  /**
   * # 网络请求失败最大重试次数
   */
  static retryTimesWhenNetworkError = 3

  /**
   * # 跳转登录的方法
   */
  static login = () => {
    AirApi.redirect("/view/login")
  }
}
