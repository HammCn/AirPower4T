/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDictionary } from '../interface/IDictionary'
import { AirColor } from '../enum/AirColor'

/**
 * # 标准字典实现类
 * @author Hamm
 */
export class AirDictionary implements IDictionary {
  key!: number | string | boolean

  label!: any

  color?: AirColor | string

  disabled?: boolean = false

  children?: this[]

  /**
   * # 实例化一个标准字典选项
   * @param key (可选) 记录的key
   * @param label (可选) 记录的Label
   */
  constructor(key?: number | string | boolean, label?: any) {
    if (key) {
      this.key = key
    }
    if (label) {
      this.label = label
    }
  }

  /**
   * # 设置常量值
   * @param key 常量值
   */
  setKey(key: string | number | boolean): this {
    this.key = key
    return this
  }

  /**
    * # 设置常量描述
    * @param label 常量的描述
    */
  setLabel(label: any): this {
    this.label = label
    return this
  }

  /**
   * # 设置枚举值是否被禁用
   * @param disabled (可选)是否禁用
   */
  setDisabled(disabled = true): this {
    this.disabled = disabled
    return this
  }

  /**
   * # 设置子集
   * @param children 子集
   */
  setChildren(children: this[]): this {
    this.children = children
    return this
  }
}
