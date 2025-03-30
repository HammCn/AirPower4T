import type { AirAny } from '../type/AirType'
import { AirConfig } from '../config/AirConfig'
import { AirI18n } from '../helper/AirI18n'
import { AirNotification } from './AirNotification'

/**
 * # 错误反馈
 * @anthor Hamm
 */
export class AirError {
  /**
   * ### 错误状态码
   * 默认 `500`
   */
  private code = AirConfig.errorCode

  /**
   * ### 错误信息文本
   */
  private message = AirConfig.errorMessage

  /**
   * ### 实例一个错误提示框
   * @param error `可选` 错误信息
   */
  constructor(error?: AirAny) {
    switch (typeof error) {
      case 'object':
        this.code = error?.code || this.code
        this.message = error?.message || AirI18n.get().ErrorAndSeeConsole || '系统错误,请查看控制台错误信息'
        break
      case 'string':
        this.message = error
        break
      default:
    }
  }

  /**
   * ### 创建实例方法
   */
  static create(error?: AirAny): AirError {
    return new AirError(error)
  }

  /**
   * ### 显示错误信息提示
   * @param message 错误信息
   * @param code `可选` 错误代码
   */
  static async show(message: string, code?: number): Promise<void> {
    if (code) {
      return this.create().setCode(code).setMessage(message).show()
    }
    return this.create(message).show()
  }

  /**
   * ### 设置错误码
   * @param code 错误状态码
   */
  setCode(code: number): AirError {
    this.code = code
    return this
  }

  /**
   * ### 设置错误信息
   * @param message 错误信息
   */
  setMessage(message: string): AirError {
    this.message = message
    return this
  }

  /**
   * ### 显示错误信息提示
   */
  async show(): Promise<void> {
    await new AirNotification()
      .setTitle(AirI18n.get().SystemError || '发生错误')
      .setMessage(this.message)
      .error()
  }
}
