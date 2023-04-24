import { ElMessageBox } from 'element-plus'
import { AirFeedbackIcon } from '../enum/AirFeedbackIcon'
import { AirAlert } from './AirAlert'

/**
 * #  确认弹窗类
 * @author Hamm
 */
export class AirConfirm extends AirAlert {
  /**
   * # 弹出确认框 DEMO
   */
  constructor() {
    super()
    this.title = '请你确认'
    this.content = '是否确认继续操作？'
    this.confirmText = '确认'
    this.cancelText = '取消'
    this.icon = AirFeedbackIcon.NONE
  }

  /**
   * # 创建实例方法
   */
  static create(): AirConfirm {
    return new AirConfirm()
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
   * # 启用ESC关闭
   */
  enableEscClose(): this {
    this.isCloseByEscape = true
    return this
  }

  /**
   * # 启用遮罩层关闭
   */
  enableCoverClose(): this {
    this.isCloseByCover = true
    return this
  }

  /**
   * # 显示成功图标的确认框
   * @param content [可选] 消息内容
   */
  success(content?: string): Promise<void> {
    this.setContent(content)
    this.icon = AirFeedbackIcon.SUCCESS
    return this.show()
  }

  /**
   * # 显示成功图标的确认框
   * @param content [可选] 消息内容
   */
  static success(content?: string): Promise<void> {
    return this.create().success(content)
  }

  /**
   * # 显示警告图标的确认框
   * @param content [可选] 消息内容
   */
  warning(content?: string): Promise<void> {
    this.setContent(content)
    this.icon = AirFeedbackIcon.WARNING
    return this.show()
  }

  /**
   * # 显示警告图标的确认框
   * @param content [可选] 消息内容
   */
  static warning(content?: string): Promise<void> {
    return this.create().warning(content)
  }

  /**
   * # 显示错误图标的确认框
   * @param content [可选] 消息内容
   */
  error(content?: string): Promise<void> {
    this.setContent(content)
    this.icon = AirFeedbackIcon.ERROR
    return this.show()
  }

  /**
   * # 显示错误图标的确认框
   * @param content [可选] 消息内容
   */
  static error(content?: string): Promise<void> {
    return this.create().error(content)
  }

  /**
   * # 显示消息图标的确认框
   * @param content [可选] 消息内容
   */
  info(content?: string): Promise<void> {
    this.setContent(content)
    this.icon = AirFeedbackIcon.INFO
    return this.show()
  }

  /**
   * # 显示消息图标的确认框
   * @param content [可选] 消息内容
   */
  static info(content?: string): Promise<void> {
    return this.create().info(content)
  }

  /**
   * # 显示无图标确认弹窗
   * 带图标请直接 ```.success()``` ```.warning()``` ```.error()```
   * @param content [可选] 消息内容
   */
  show(content?: string): Promise<void> {
    this.setContent(content)
    return new Promise<void>((resolve, reject) => {
      ElMessageBox.confirm(
        this.content,
        this.title,
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

  /**
   * # 显示无图标确认弹窗
   * 带图标请直接 ```.success()``` ```.warning()``` ```.error()```
   * @param content [可选] 消息内容
   */
  static show(content?: string): Promise<void> {
    return this.create().show(content)
  }
}
