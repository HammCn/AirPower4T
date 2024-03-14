import { AirFeedbackType } from '../enum/AirFeedbackType'
import { AirI18n } from '../helper/AirI18n'

/**
 * # 通知基类
 * @author Hamm
 */
export class AirNotification {
  /**
   * # 通知内容
   */
  private message = '操作成功'

  /**
   * # 通知默认保留时长
   */
  private duration = 1500

  /**
   * # 创建实例方法
   */
  static create(): AirNotification {
    return new AirNotification()
  }

  /**
   * # 设置消息
   * @param message 消息
   */
  setMessage(message?: string): this {
    if (message) {
      this.message = message
    }
    return this
  }

  /**
   * # 设置自动关闭时间
   * @param duration 自动关闭时间
   */
  setDuration(duration: number): this {
    this.duration = duration
    return this
  }

  /**
   * # 成功通知
   * @param message [可选] 消息
   */
  async success(message?: string): Promise<void> {
    return this.setMessage(message).show(AirFeedbackType.SUCCESS)
  }

  /**
   * # 成功通知
   * @param message [可选] 消息
   */
  static async success(message?: string): Promise<void> {
    return this.create().success(message)
  }

  /**
   * # 错误通知
   * @param message [可选] 消息
   */
  async error(message?: string): Promise<void> {
    return this.setMessage(message).show(AirFeedbackType.ERROR)
  }

  /**
   * # 错误通知
   * @param message [可选] 消息
   */
  static async error(message?: string): Promise<void> {
    return this.create().error(message)
  }

  /**
   * # ⛔️ 显示通知 ⛔️
   * @param type 可选枚举通知类型
   */
  private async show(type: AirFeedbackType): Promise<void> {
    return new Promise<void>((resolve) => {
      wx.showToast({
        title: this.message,
        icon: type,
        duration: this.duration,
        success: () => {
          resolve()
        },
      })
    })
  }
}
