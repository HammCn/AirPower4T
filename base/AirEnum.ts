import { AirConstant } from '../config/AirConstant'
import { AirColor } from '../enum/AirColor'
import { IDictionary } from '../interface/IDictionary'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import {
  AirAny, AirColorString, AirEnumKey, ClassConstructor,
} from '../type/AirType'

/**
 * # 枚举基类
 * @author Hamm.cn
 */
export class AirEnum<K extends AirEnumKey = number> implements IDictionary {
  /**
   * ## 枚举的值
   */
  key!: K

  /**
   * ## 枚举的描述
   */
  label!: string

  /**
   * ## 标准 `AirColor` 颜色或自定义颜色
   * 支持 `AirColor` `标准色` `十六进制` `HTML标准色`
   */
  color?: AirColorString

  /**
   * ## 是否被禁用
   *  如禁用, 下拉选项中将显示但无法选中
   */
  disabled?: boolean

  /**
   * ## 实例化创建一个枚举项目
   * @param key 枚举值
   * @param label 枚举描述
   * @param color `可选` 枚举扩展的颜色
   * @param disable `可选` 是否禁用
   */
  constructor(key: K, label: string, color?: AirColorString, disable?: boolean) {
    this.key = key
    this.label = label
    this.color = color
    this.disabled = disable
  }

  /**
   * ## 获取枚举的 `Label`
   * @param key `Key`
   * @param defaultLabel `可选` 默认的标签
   */
  static getLabel(key: AirEnumKey, defaultLabel = AirConstant.HYPHEN): string {
    return this.get(key)?.label || defaultLabel
  }

  /**
   * ## 获取枚举的颜色
   * @param key `Key`
   * @param defaultColor `可选` 默认颜色
   */
  static getColor(key: AirEnumKey, defaultColor: AirColorString = AirColor.NORMAL): AirColorString {
    return this.get(key)?.color || defaultColor
  }

  /**
   * ## 获取枚举是否禁用
   * @param key `Key`
   */
  static isDisabled(key: AirEnumKey): boolean | undefined {
    return this.get(key)?.disabled
  }

  /**
   * ## 查找一个枚举选项
   * @param key `Key`
   */
  static get<E extends AirEnum<AirEnumKey>>(this: ClassConstructor<E>, key: AirEnumKey): E | null {
    return (this as AirAny).toArray()
      .find((item: E) => item.key === key) || null
  }

  /**
   * ## 将枚举转为数组
   * @returns 枚举数组
   */
  // eslint-disable-next-line no-unused-vars
  static toArray<K extends AirEnumKey, E extends AirEnum<K>>(this: ClassConstructor<E>): E[] {
    return Object.values(this)
      .filter((item) => item instanceof this)
  }

  /**
   * ## 将枚举转为字典
   * @returns 枚举字典
   */
  // eslint-disable-next-line no-unused-vars
  static toDictionary<D extends IDictionary>(this: ClassConstructor<D>): AirDictionaryArray<D> {
    return AirDictionaryArray.createCustom<D>(Object.values(this)
      .filter((item) => item instanceof this))
  }

  /**
   * ## 判断 `Key` 是否相等
   * @param key `Key`
   */
  equalsKey(key: K): boolean {
    return this.key === key
  }

  /**
   * ## 判断 `Key` 是否不相等
   * @param key `Key`
   */
  notEqualsKey(key: K): boolean {
    return this.key !== key
  }
}
