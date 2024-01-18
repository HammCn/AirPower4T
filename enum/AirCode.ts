/* eslint-disable no-unused-vars */

/**
 * # 返回状态码
 * @author Hamm
 */
export enum AirCode {
  /**
   * # 返回正常
   */
  SUCCESS = 200,

  /**
   * # 继续操作
   */
  CONTINUE = 201,

  /**
   * # 要求重定向或下载
   */
  REDIRECT = 301,

  /**
   * # 需要跳转到登录
   */
  UNAUTHORIZED = 401,

  /**
   * # 发生错误
   */
  ERROR = 500
}
