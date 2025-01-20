/**
 * # 加载状态
 * @author Hamm.cn
 */
export class AirLoading {
  /**
   * ### 弹出这个 `Loading`
   * @param message `可选` Loading文案
   */
  static show(message: string): void {
    uni.showLoading({
      title: message,
      mask: true,
    })
  }

  /**
   * ### 关闭 `Loading`
   */
  static hide(): void {
    uni.hideLoading()
  }
}
