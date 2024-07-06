/* eslint-disable no-unused-vars */

/**
 * # HTTP状态码枚举
 * @author Hamm.cn
 */
export enum AirHttpStatus {
  /**
   * ## 请求正常
   */
  OK = 200,

  /**
   * ## 参数缺失/类型错误/请求方法错误等
   */
  BAD_REQUEST = 400,

  /**
   * ## 传入的身份令牌失效或缺失
   */
  UNAUTHORIZED = 401,

  /**
   * ## 没有权限访问的接口
   */
  FORBIDDEN = 403,

  /**
   * ## 请求的数据不存在
   */
  NOT_FOUND = 404,

  /**
   * ## 请求方法不被允许
   */
  METHOD_NOT_ALLOWED = 405,

  /**
   * ## 服务器发生业务逻辑错误
   */
  INTERNAL_SERVER_ERROR = 500,

  /**
   * ## 网关错误
   */
  BAD_GATEWAY = 502,

  /**
   * ## 后台服务异常
   */
  SERVICE_UNAVAILABLE = 503,

  /**
   * ## 请求超时
   */
  GATEWAY_TIMEOUT = 504,
}
