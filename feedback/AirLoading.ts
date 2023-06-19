/**
 * 加载状态
 * @author Hamm
 */
export class AirLoading {
  /**
   * 弹出这个Loading
   * @param message [可选]Loading文案 弹出Loading
   */
  static show(message: string): void {
    uni.showLoading({
      title: message,
      mask: true,
    })
  }

  /**
   * 关闭Loading
   */
  static hide(): void {
    uni.hideLoading()
  }
}
