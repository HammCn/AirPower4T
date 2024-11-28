import { AirAlert } from './AirAlert'
import { IJson } from '../interface/IJson'

/**
 * # 确认弹窗类
 * 可通过 `.create()` 方法创建自定义实例
 * @author Hamm.cn
 */
export class AirConfirm extends AirAlert {
  /**
   * ## 取消按钮文字
   */
  protected cancelText = '取消'

  /**
   * ## 设置取消按钮文字
   * @param confirmText 取消按钮文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * ## 显示确认消息提醒
   * @param content 确认内容
   * @param title `可选` 确认标题
   */
  show(content: string, title?: string): Promise<void> {
    return this.confirm(content, title)
  }

  /**
   * ## 创建实例方法
   */
  static create(): AirConfirm {
    return new AirConfirm()
  }

  /**
   * ## 显示确认消息提醒
   * @param content 确认内容
   * @param title `可选` 确认标题
   */
  static show(content: string, title?: string): Promise<void> {
    return this.create().show(content, title)
  }

  /**
   * ## 弹出提示
   * @param content 确认内容
   * @param title `可选` 确认标题
   */
  private confirm(content: string, title = '操作提醒'): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      wx.showModal({
        title,
        content,
        confirmText: this.confirmText,
        confirmColor: this.confirmColor,
        cancelText: this.cancelText,
        success: (res: IJson) => {
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
