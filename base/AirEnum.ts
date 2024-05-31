import { AirColor } from '../enum/AirColor'
import { IDictionary } from '../interface/IDictionary'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { AirEnumKey } from '../type/AirType'

/**
 * # 枚举基类
 * @author Hamm
 */
export class AirEnum<K extends AirEnumKey = AirEnumKey> implements IDictionary {
  /**
   * # 枚举的值
   */
  key!: K

  /**
   * # 枚举的描述
   */
  label!: string

  /**
   * # 标准 **AirColor** 颜色或自定义颜色
   * ---
   * ### 💡 支持 ```AirColor``` 标准色 / 十六进制 / HTML标准色
   */
  color?: AirColor | string

  /**
   * # 是否被禁用
   * ---
   * ### 💡  如禁用, 下拉选项中将显示但无法选中
   */
  disabled?: boolean

  /**
   * # 实例化创建一个枚举项目
   * @param key 枚举值
   * @param label 枚举描述
   * @param color 颜色
   * @param disabled 是否禁用
   */
  constructor(key: K, label: string, color?: AirColor | string, disabled?: boolean) {
    this.key = key
    this.label = label
    this.color = color
    this.disabled = disabled
  }

  /**
   * # 根据Key查一个枚举项目
   * @param key 枚举的Key
   * @returns 枚举项目
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  static get<T extends AirEnum>(this: new (...args: any[]) => T, key: number): T | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).toArray().find((item:T) => item.key === key) || null
  }

  /**
   * # 将枚举转为字典数组
   * @returns 字典数组
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  static toDictionary<T extends AirEnum>(this: new (...args: any[]) => T): AirDictionaryArray<T> {
    return AirDictionaryArray.createCustom<T>(Object.values(this)
      .filter((item) => item instanceof this))
  }
}
