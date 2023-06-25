import { ElNotification } from 'element-plus'
import { AirFeedbackType } from '../enum/AirFeedbackType'

/**
 * # 通知基类
 * @author Hamm
 */
export class AirNotification {
  /**
   * # 通知标题
   */
  private title = '系统提示'

  /**
   * # 通知内容
   */
  private message = '你并没有传入具体的错误信息：）'

  /**
   * # 通知默认保留时长
   */
  private duration = 2000

  /**
   * # 创建实例方法
   */
  static create(): AirNotification {
    return new AirNotification()
  }

  /**
   * # 设置标题
   * @param title 标题
   */
  setTitle(title: string): this {
    this.title = title
    return this
  }

  /**
   * # 设置消息
   * @param message 消息
   */
  setMessage(message: string): this {
    this.message = message
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
   * # 警告通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  async warning(message?: string, title?: string): Promise<boolean> {
    this.setTitleAndMessage(title, message)
    return this.show(AirFeedbackType.WARNING)
  }

  /**
   * # 警告通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  static async warning(message?: string, title?: string): Promise<boolean> {
    return this.create().warning(message, title)
  }

  /**
   * # 成功通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  async success(message?: string, title?: string): Promise<boolean> {
    return this.setTitleAndMessage(title, message).show(AirFeedbackType.SUCCESS)
  }

  /**
   * # 成功通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  static async success(message?: string, title?: string): Promise<boolean> {
    return this.create().success(message, title)
  }

  /**
   * # 信息通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  async info(message?: string, title?: string): Promise<boolean> {
    return this.setTitleAndMessage(title, message).show(AirFeedbackType.INFO)
  }

  /**
   * # 信息通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  static async info(message?: string, title?: string): Promise<boolean> {
    return this.create().info(message, title)
  }

  /**
   * # 错误通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  async error(message?: string, title?: string): Promise<boolean> {
    return this.setTitleAndMessage(title, message).show(AirFeedbackType.ERROR)
  }

  /**
   * # 错误通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   */
  static async error(message?: string, title?: string): Promise<boolean> {
    return this.create().error(message, title)
  }

  /**
   * # ⛔️设置标题和内容
   * @param title [可选]标题
   * @param message [可选]内容
   */
  private setTitleAndMessage(title?: string, message?: string) {
    if (title) {
      this.setTitle(title)
    }
    if (message) {
      this.setMessage(message)
    }
    return this
  }

  /**
   * # ⛔️ 显示通知 ⛔️
   *
   * 如用户点击了通知 返回true 否则false
   * @param type 可选枚举通知类型
   * @see success()
   * @see warning()
   * @see error()
   * @see info()
   */
  private async show(type: AirFeedbackType): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      ElNotification({
        title: this.title,
        message: this.message,
        type,
        duration: this.duration,
        onClose: () => {
          resolve(false)
        },
        onClick: () => {
          resolve(true)
        },
      })
    })
  }
}
