import { AirAlert } from './AirAlert'

/**
 * # 确认弹窗类
 * 可通过 ```.create()``` 方法创建自定义实例
 * @author Hamm
 */
export class AirConfirm extends AirAlert {
  /**
   * # 取消按钮文字
   */
  protected cancelText = '取消'

  /**
   * # 设置取消按钮文字
   * @param confirmText 取消按钮文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * # 显示确认消息提醒
   * @param content 消息内容
   * @param description [可选] 消息标题
   */
  show(content: string, description?: string): Promise<void> {
    return this.confirm(content, description)
  }

  /**
   * # 创建实例方法
   */
  static create(): AirConfirm {
    return new AirConfirm()
  }

  /**
   * # 显示确认消息提醒
   * @param content 消息内容
   * @param description [可选] 消息描述
   */
  static show(content: string, description?: string): Promise<void> {
    return this.create().show(content, description)
  }

  /**
   * # 弹出提示
   * @param content 消息内容
   * @param description [可选] 消息描述
   */
  private confirm(content: string, description = ''): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      wx.showModal({
        title: content,
        content: description,
        confirmText: this.confirmText,
        confirmColor: this.confirmColor,
        cancelText: this.cancelText,
        success: (res) => {
          if (res.confirm) {
            resolve()
            return
          }
          reject()
        },
      })
    })
  }
}
