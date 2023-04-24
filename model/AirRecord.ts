/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRecord } from '../interface/IRecord'
import { AirColor } from '../enum/AirColor'

/**
 * # 标准记录集实现类
 * @author Hamm
 */
export class AirRecord implements IRecord {
  key!: number | string | boolean

  label!: any

  color?: AirColor | string

  disabled?: boolean = false

  // eslint-disable-next-line no-use-before-define
  children?: this[]

  /**
   * #  设置常量值
   * @param key 常量值
   */
  setKey(key: string | number | boolean): this {
    this.key = key
    return this
  }

  /**
    * #  设置常量描述
    * @param label 常量的描述
    */
  setLabel(label: any): this {
    this.label = label
    return this
  }

  /**
   * #  设置枚举值是否被禁用
   * @param disabled [可选]是否禁用
   */
  setDisabled(disabled = true): this {
    this.disabled = disabled
    return this
  }

  /**
   * #  设置子集
   * @param children 子集
   */
  setChildren(children: this[]): this {
    this.children = children
    return this
  }
}
