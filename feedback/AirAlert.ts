import { ElMessageBox, ElMessageBoxOptions } from 'element-plus'
import { CSSProperties } from 'vue'
import { AirFeedbackType } from '../enum/AirFeedbackType'
import { AirI18n } from '../helper/AirI18n'
import { AirConstant } from '../config/AirConstant'

/**
 * # 消息弹窗类
 * 可通过 `.create()` 方法创建自定义实例
 * @author Hamm.cn
 */
export class AirAlert {
  /**
   * ### 确认按钮文字
   */
  protected confirmText = AirI18n.get().Confirm || '确定'

  /**
   * ### 取消按钮文字
   */
  protected cancelText = AirI18n.get().Cancel || '取消'

  /**
   * ### 可选的确认图标类型
   */
  protected icon = AirFeedbackType.NONE

  /**
   * ### 是否启用 `HTML` 富文本
   * @deprecated 请注意安全使用
   */
  protected isHtmlEnabled = false

  /**
   * ### 是否显示确认按钮
   */
  protected isConfirmButtonShow = true

  /**
   * ### 是否显示右上角关闭按钮
   */
  protected isCloseButtonShow = true

  /**
   * ### 是否esc可关闭
   */
  protected isCloseByEscape = false

  /**
   * ### 是否遮罩层可关闭
   */
  protected isCloseByCover = false

  /**
   * ### 弹窗宽度
   */
  protected width = AirConstant.EMPTY_STRING

  /**
   * ### 弹窗高度
   */
  protected height = AirConstant.EMPTY_STRING

  /**
   * ### 确认按钮样式类名
   */
  protected confirmButtonClass = AirConstant.EMPTY_STRING

  /**
   * ### 显示成功消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  static success(content?: string, title?: string): Promise<void> {
    return this.create()
      .success(content, title)
  }

  /**
   * ### 创建实例方法
   */
  static create(): AirAlert {
    return new AirAlert()
  }

  /**
   * ### 显示警告消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  static warning(content?: string, title?: string): Promise<void> {
    return this.create()
      .warning(content, title)
  }

  /**
   * ### 显示无图标的消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  static show(content?: string, title?: string): Promise<void> {
    return this.create()
      .show(content, title)
  }

  /**
   * ### 显示错误消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  static error(content?: string, title?: string): Promise<void> {
    return this.create()
      .error(content, title)
  }

  /**
   * ### 显示信息类消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  static info(content?: string, title?: string): Promise<void> {
    return this.create()
      .info(content, title)
  }

  /**
   * ### 设置确认按钮文字
   * @param confirmText 确认按钮文字
   */
  setConfirmText(confirmText: string): this {
    this.confirmText = confirmText
    return this
  }

  /**
   * ### 允许使用 `不安全` 的 `HTML` 富文本
   * @deprecated 请注意安全使用
   */
  enableHtml(): this {
    this.isHtmlEnabled = true
    return this
  }

  /**
   * ### 是否隐藏确认按钮
   */
  hideConfirm(): this {
    this.isConfirmButtonShow = false
    return this
  }

  /**
   * ### 是否隐藏关闭按钮
   */
  hideClose(): this {
    this.isCloseButtonShow = false
    return this
  }

  /**
   * ### 设置弹窗宽度
   * @param width 宽度
   * @param isPercent `可选` 是否百分比
   */
  setWidth(width: number, isPercent = false): this {
    if (isPercent) {
      this.width = `${width}%`
    } else {
      this.width = `${width}px`
    }
    return this
  }

  /**
   * ### 设置弹窗高度
   * @param height 高度
   * @param isPercent `可选` 是否百分比
   */
  setHeight(height: number, isPercent = false): this {
    if (isPercent) {
      this.height = `${height}%`
    } else {
      this.height = `${height}px`
    }
    return this
  }

  /**
   * ### 显示成功消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  success(content?: string, title?: string): Promise<void> {
    this.icon = AirFeedbackType.SUCCESS
    return this.alert(content, title)
  }

  /**
   * ### 显示警告消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  warning(content?: string, title?: string): Promise<void> {
    this.icon = AirFeedbackType.WARNING
    return this.alert(content, title)
  }

  /**
   * ### 显示无图标的消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  show(content?: string, title?: string): Promise<void> {
    this.icon = AirFeedbackType.NONE
    return this.alert(content, title)
  }

  /**
   * ### 显示错误消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  error(content?: string, title?: string): Promise<void> {
    this.icon = AirFeedbackType.ERROR
    return this.alert(content, title)
  }

  /**
   * ### 显示信息类消息提醒
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   */
  info(content?: string, title?: string): Promise<void> {
    return this.alert(content, title)
  }

  /**
   * ### 将确认按钮设置为危险颜色
   * 请注意,设置了危险按钮后, 所有的图标都将失效
   */
  dangerButton(): this {
    this.confirmButtonClass = 'danger'
    return this
  }

  /**
   * ### 获取配置
   */
  protected getConfig(): ElMessageBoxOptions {
    const customStyle: CSSProperties = {}
    if (this.width) {
      customStyle.width = this.width
    }
    if (this.height) {
      customStyle.height = this.height
    }
    return {
      showConfirmButton: this.isConfirmButtonShow,
      confirmButtonText: this.confirmText,
      cancelButtonText: this.cancelText,
      type: this.confirmButtonClass ? AirFeedbackType.NONE : this.icon,
      draggable: true,
      dangerouslyUseHTMLString: this.isHtmlEnabled,
      customClass: this.isHtmlEnabled ? 'rich-text' : AirConstant.EMPTY_STRING,
      customStyle,
      showClose: this.isCloseButtonShow,
      closeOnClickModal: this.isCloseByCover,
      closeOnPressEscape: this.isCloseByEscape,
      confirmButtonClass: this.confirmButtonClass,
    }
  }

  /**
   * ### 弹出提示
   * @param content `可选` 消息内容
   * @param title `可选` 消息标题
   *
   */
  private alert(content = '操作成功', title = '温馨提示'): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      ElMessageBox.alert(
        content,
        title,
        this.getConfig(),
      )
        .then(() => {
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }
}
