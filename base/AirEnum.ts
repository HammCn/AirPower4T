/**
 * # 枚举基类
 * @author Hamm
 */
export class AirEnum {
  /**
   * # 枚举的值
   */
  private key!: number

  /**
   * # 枚举的描述
   */
  private label!: string

  /**
   * # 获取枚举的值
   * @returns 枚举的值
   */
  getKey() {
    return this.key
  }

  /**
   * # 获取枚举的描述
   * @returns 枚举的描述
   */
  getLabel() {
    return this.label
  }

  /**
   * # 实例化创建一个枚举项目
   * @param key 枚举值
   * @param label 枚举描述
   */
  constructor(key: number, label: string) {
    this.key = key
    this.label = label
  }

  /**
   * # 根据Key查一个枚举项目
   * @param key 枚举的Key
   * @returns 枚举项目
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  static get<T extends AirEnum>(this: new (...args: any[]) => T, key: number): T | null {
    const keys = Object.getOwnPropertyNames(this)
    for (const k of keys) {
      if (['name', 'length', 'prototype'].includes(k)) {
        // eslint-disable-next-line no-continue
        continue
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item: T = (this as any)[k]
      if (item.getKey() === key) return item
    }
    return null
  }
}
