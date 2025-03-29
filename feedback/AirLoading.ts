import type { IJson } from '../interface/IJson'
import type { AirAny } from '../type/AirType'
import { ElLoading } from 'element-plus'
import { AirI18n } from '../helper/AirI18n'

/**
 * # 通知基类
 * @author Hamm.cn
 */
export class AirLoading {
  /**
   * ### `Loading` 实例
   */
  private instance: AirAny

  /**
   * ### `Loading` 文字
   */
  private message = AirI18n.get().Loading || '加载中'

  /**
   * ### 加载目标
   */
  private readonly target: string | unknown = document.body

  /**
   * ### 是否全屏
   */
  private fullscreen = true

  /**
   * ### 背景色
   */
  private background = 'rgba(255,255,255,0.9)'

  /**
   * ### 是否锁定
   */
  private isLock = false

  /**
   * ### 实例一个 `Loading`
   * @param domId `可选` DomId 可选参数
   */
  constructor(domId?: string) {
    if (domId) {
      this.target = domId
    }
  }

  /**
   * ### 创建实例方法
   */
  static create(): AirLoading {
    return new AirLoading()
  }

  /**
   * ### 弹出这个 `Loading`
   * @param message `可选` Loading文案
   */
  static show(message?: string): AirLoading {
    return this.create().show(message)
  }

  /**
   * ### 设置是否全屏
   * @param isFullScreen 是否全屏
   */
  setFullScreen(isFullScreen: boolean): this {
    this.fullscreen = isFullScreen
    return this
  }

  /**
   * ### 设置背景色
   * @param background 背景色 `RGB/RGBA/#333`
   */
  setBackground(background: string): this {
    this.background = background
    return this
  }

  /**
   * ### 设置加载文字
   * @param message 文字
   */
  setMessage(message: string): this {
    this.message = message
    return this
  }

  /**
   * ### 设置锁定
   * @param isLock 是否锁定
   */
  setLock(isLock: boolean): this {
    this.isLock = isLock
    return this
  }

  /**
   * ### 弹出这个 `Loading`
   * @param message `可选` Loading文案
   */
  show(message?: string): this {
    if (message) {
      this.setMessage(message)
    }
    const options: IJson = {
      background: this.background,
      lock: this.isLock,
      text: this.message,
      fullscreen: this.fullscreen,
    }
    if (this.target) {
      options.target = this.target
    }
    this.instance = ElLoading.service(options)
    return this
  }

  /**
   * ### 关闭 `Loading`
   */
  close(): void {
    if (this.instance) {
      this.instance.close()
    }
  }
}
