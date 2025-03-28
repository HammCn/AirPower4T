/* eslint-disable class-methods-use-this */
import { IJson } from '../interface/IJson'
import { AirAny } from '../type/AirType'
import { AirRand } from './AirRand'

/**
 * # 路由助手
 * @author Hamm.cn
 */
export class AirRouter {
  /**
   * ### 打开子页面
   * @param url 页面
   * @param param `可选` 参数
   * @param animationType `可选` 动画类型
   * @param animationDuration `可选` 动画时长
   */
  static async go(url: string, param?: IJson, animationType: 'auto' | 'none' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'fade-in' | 'zoom-out' | 'zoom-fade-out' | 'pop-in' = 'pop-in', animationDuration = 300) {
    return new Promise((resolve) => {
      if (param) {
        url += '?'
        // eslint-disable-next-line guard-for-in
        for (const key in param) {
          url += `${key}=${param[key]}`
        }
      }
      const eventId = AirRand.getRandMixedCharString()
      uni.navigateTo({
        url: `${url}&eventId=${eventId}`,
        animationType,
        animationDuration,
        success: () => {
          uni.$once(eventId, (data) => {
            resolve(data)
          })
        },
      })
    })
  }

  /**
   * ### 重定向页面
   * @param url 页面
   */
  static replace(url: string) {
    uni.redirectTo({
      url: `/view/${url}`,
    })
  }

  /**
   * ### 返回上一页
   */
  static back() {
    uni.navigateBack()
  }

  /**
   * ### 回调数据给上一页
   * @param data 数据
   * @param eventId 事件ID
   */
  static callback(data: AirAny, eventId: string) {
    uni.$emit(eventId, data)
    this.back()
  }
}
