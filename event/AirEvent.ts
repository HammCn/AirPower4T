/* eslint-disable @typescript-eslint/ban-types */
import { AirAny } from '../type/AirType'
import { AirEventType } from './AirEventType'

/**
 * # 事件
 * @author Hamm.cn
 */
class AirEvent {
  /**
   * ## 监听者
   */
  private listeners: Map<AirEventType | string, Array<Function>> = new Map()

  /**
   * ## 监听多个事件
   */
  onAll(types: Array<AirEventType | string>, callback: Function) {
    types.forEach((type) => {
      this.on(type, callback)
    })
  }

  /**
   * ## 监听事件
   * @param type 事件类型
   * @param callback 回调方法
   */
  on(type: AirEventType | string, callback: Function) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)?.push(callback)
    } else {
      this.listeners.set(type, [callback])
    }
  }

  /**
   * ## 监听一次事件
   * @param type 事件类型
   * @param callback 回调方法
   */
  once(type: AirEventType | string, callback: Function) {
    const onceCallback = (...args: AirAny[]) => {
      callback(...args)
      this.off(type, onceCallback)
    }
    this.on(type, onceCallback)
  }

  /**
   * ## 发出事件
   * @param type 事件类型
   * @param args 参数
   */
  emit(type: AirEventType | string, ...args: AirAny[]) {
    if (this.listeners.has(type)) {
      this.listeners.get(type)?.forEach((callback) => {
        callback(...args)
      })
    }
  }

  /**
   * ## 取消监听事件
   * @param type 事件类型
   * @param callback 回调方法
   */
  off(type: AirEventType | string, callback: Function) {
    if (this.listeners.has(type)) {
      const callbacks = this.listeners.get(type)
      const index = callbacks?.indexOf(callback)
      if (index !== undefined && index !== -1) {
        callbacks?.splice(index, 1)
      }
    }
  }
}

export default new AirEvent()
