/**
 * # 枚举基类
 * @author Hamm
 */
export class AirEnum<K = number> {
  /**
   * # 枚举的值
   */
  private key!: K

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
  constructor(key: K, label: string) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).toArray().find((item:T) => item.getKey() === key) || null
  }

  /**
   * # 将枚举转为数组
   * @returns 枚举数组
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  static toArray<T extends AirEnum>(this: new (...args: any[]) => T): T[] {
    return Object.values(this)
      .filter((item) => item instanceof this)
  }
}
