/* eslint-disable class-methods-use-this */

import { IJson } from '../interface/IJson'

/**
 * # 路由助手
 * @author Hamm.cn
 */
export class AirRouter {
  /**
   * ### 打开子页面
   * @param url 页面
   * @param param `可选` 参数
   */
  static go(url: string, param?: IJson) {
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
   * ### 重定向页面
   * @param url 页面
   */
  static replace(url: string) {
    wx.redirectTo({
      url: `/view/${url}`,
    })
  }

  /**
   * ### 返回上一页
   */
  static back() {
    wx.navigateBack()
  }
}
