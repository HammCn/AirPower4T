/* eslint-disable no-unused-vars */

/**
 * # 返回状态码
 * @author Hamm.cn
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
   * # 需要跳转到登录
   */
  UNAUTHORIZED = 401,

  /**
   * # 发生错误
   */
  ERROR = 500
}
