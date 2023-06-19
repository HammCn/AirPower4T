/**
 * 消息弹窗类
 * 可通过 ```.create()``` 方法创建自定义实例
 * @author Hamm
 */
export class AirAlert {
    /**
     * 确认按钮文字
     */
    protected confirmText = '确认'

    /**
     * 确认按钮颜色
     */
    protected confirmColor = ''

    /**
     * 设置确认按钮文字
     * @param confirmText 确认按钮文字
     */
    setConfirmText(confirmText: string): this {
      this.confirmText = confirmText
      return this
    }

    /**
     * 设置确认按钮文字
     * @param confirmText 确认按钮文字
     */
    setConfirmColor(confirmColor: string): this {
      this.confirmText = confirmColor
      return this
    }

    /**
     * 显示弹窗消息提醒
     * @param content [可选] 消息内容
     * @param description [可选] 消息标题
     */
    show(content?: string, description?: string): Promise<void> {
      return this.alert(content, description)
    }

    /**
     * 创建实例方法
     */
    static create(): AirAlert {
      return new AirAlert()
    }

    /**
     * 显示弹窗消息提醒
     * @param content [可选] 消息内容
     * @param description [可选] 消息描述
     */
    static show(content?: string, description?: string): Promise<void> {
      return this.create().show(content, description)
    }

    /**
     * 弹出提示
     * @param content [可选] 消息内容
     * @param description [可选] 消息描述
     */
    private alert(content = '操作成功', description: string | undefined = undefined): Promise<void> {
      return new Promise<void>((resolve) => {
        wx.showModal({
          title: content,
          content: description,
          confirmText: this.confirmText,
          confirmColor: this.confirmColor,
          showCancel: false,
          success: () => {
            resolve()
          },
        })
      })
    }
}
