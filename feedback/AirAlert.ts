import { AirI18n } from '../helper/AirI18n'

/**
 * # 消息弹窗类
 * 可通过 ```.create()``` 方法创建自定义实例
 * @author Hamm.cn
 */
export class AirAlert {
  /**
   * # 确认按钮文字
   */
  protected confirmText = AirI18n.get().Confirm || '确定'

  /**
   * # 取消按钮文字
   */
  protected cancelText = AirI18n.get().Cancel || '取消'

  /**
   * # 确认按钮颜色
   */
  protected confirmColor = ''

  /**
   * # 取消按钮颜色
   */
  protected cancelColor = ''

  /**
   * # 设置确认按钮文字
   * @param confirmText 确认按钮文字
   */
  setConfirmText(confirmText: string): this {
    this.confirmText = confirmText
    return this
  }

  /**
   * # 设置确认按钮文字
   * @param confirmText 确认按钮文字
   */
  setConfirmColor(confirmColor: string): this {
    this.confirmColor = confirmColor
    return this
  }

  /**
   * # 设置取消按钮文字
   * @param cancelText 取消按钮文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * # 设置取消按钮颜色
   * @param cancelColor 取消按钮颜色
   */
  setCancelColor(cancelColor: string): this {
    this.cancelColor = cancelColor
    return this
  }

  /**
   * # 显示弹窗消息提醒
   * @param content 消息内容
   * @param description [可选] 消息标题
   */
  show(content: string, description?: string): Promise<void> {
    return this.alert(content, description)
  }

  /**
   * # 创建实例方法
   */
  static create(): AirAlert {
    return new AirAlert()
  }

  /**
   * # 显示弹窗消息提醒
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
  private alert(content: string, description = ''): Promise<void> {
    return new Promise<void>((resolve) => {
      wx.showModal({
        title: content,
        content: description,
        confirmText: this.confirmText,
        cancelText: this.cancelText,
        confirmColor: this.confirmColor,
        cancelColor: this.cancelColor,
        showCancel: false,
        success: () => {
          resolve()
        },
      })
    })
  }
}
