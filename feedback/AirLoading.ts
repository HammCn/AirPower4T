/**
 * # 加载状态
 * @author Hamm.cn
 */
export class AirLoading {
  /**
   * # 弹出这个Loading
   * @param message (可选)Loading文案 弹出Loading
   */
  static show(message: string): void {
    my.showLoading({
      content: message,
    })
  }

  /**
   * # 关闭Loading
   */
  static hide(): void {
    my.hideLoading()
  }
}
