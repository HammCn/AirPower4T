/* eslint-disable @typescript-eslint/no-explicit-any */

import { AirColor } from '../../enum/AirColor'
import { IDictionary } from '../../interface/IDictionary'
import { AirDictionary } from '../AirDictionary'

/**
 * # 字典数组
 * @author Hamm
 */
export class AirDictionaryArray<T extends IDictionary> extends Array<T> {
  /**
   * # 获取字典指定Key的Label
   * @param key Key
   * @param defaultLabel 默认Label
   */
  getLabel(key: boolean | number | string, defaultLabel = '-'): string {
    return this.find((item) => item.key === key)?.label || defaultLabel
  }

  /**
   * # 获取字典指定Key的Color
   * @param key Key
   * @param defaultColor 默认Color
   */
  getColor(key: boolean | number | string, defaultColor: AirColor | string = AirColor.NORMAL): AirColor | string {
    return this.find((item) => item.key === key)?.color || defaultColor
  }

  /**
   * # 获取一个字典选项
   * ---
   * ### 💡 可能返回一个空字典 但你可以放心的点属性
   * @param key Key
   */
  get(key: boolean | number | string): T {
    return this.find((item) => item.key === key) as T || {}
  }

  /**
   * # 查找一个字典选项 可能找不到
   * ---
   * ### 💡 可以尝试 ```.get()``` 后放心大胆的点属性
   * @param key Key
   */
  findByKey(key: boolean | number | string): T | undefined {
    return this.find((item) => item.key === key)
  }

  /**
   * # 创建可扩展的字典
   * @param list 字典数组
   */
  static createCustom<T extends IDictionary>(list: T[]): AirDictionaryArray<T> {
    const dictionary = new AirDictionaryArray<T>()
    list.forEach((json: T) => {
      const item = { ...new AirDictionary(), ...json }
      dictionary.push(item)
    })
    return dictionary
  }

  /**
   * # 创建字典
   * @param list 字典数组
   */
  static create(list: IDictionary[]): AirDictionaryArray<IDictionary> {
    return this.createCustom(list)
  }
}
