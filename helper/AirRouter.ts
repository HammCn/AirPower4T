/* eslint-disable class-methods-use-this */

/**
 * # 路由助手
 * @author Hamm
 */
export class AirRouter {
  /**
   * # 打开子页面
   * @param url 页面
   * @param param [可选]JSON参数
   */
  static go(url: string, param?: Record<string, unknown>) {
    if (param) {
      url += '?'
      // eslint-disable-next-line guard-for-in
      for (const key in param) {
        url += `${key}=${param[key]}`
      }
    }
    wx.navigateTo({
      url: `/view/${url}`,
    })
  }

  /**
   * # 重定向页面
   * @param url 页面
   */
  static replace(url: string) {
    wx.redirectTo({
      url: `/view/${url}`,
    })
  }

  /**
   * # 返回上一页
   */
  static back() {
    wx.navigateBack()
  }
}
