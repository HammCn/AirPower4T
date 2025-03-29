/**
 * # 内置事件
 * @author Hamm.cn
 */
export enum AirEventType {
  /**
   * ### 未登录
   */
  UNAUTHORIZED,

  /**
   * ### 退出登录
   */
  LOGOUT,

  /**
   * ### 网络错误
   */
  NETWORK_ERROR,

  /**
   * ### 请求错误
   */
  REQUEST_ERROR,

  /**
   * ### 请求需要继续操作
   */
  REQUEST_CONTINUE,

  /**
   * ### 添加数据成功
   */
  ADD_SUCCESS,

  /**
   * ### 修改数据成功
   */
  UPDATE_SUCCESS,

  /**
   * ### 删除成功
   */
  DELETE_SUCCESS,

  /**
   * ### 删除失败
   */
  DELETE_FAIL,

  /**
   * ### 禁用成功
   */
  DISABLE_SUCCESS,

  /**
   * ### 禁用失败
   */
  DISABLE_FAIL,

  /**
   * ### 启用成功
   */
  ENABLE_SUCCESS,

  /**
   * ### 启用失败
   */
  ENABLE_FAIL,
}
