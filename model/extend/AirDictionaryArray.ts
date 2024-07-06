/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirColorString, AirEnumKey } from '../../type/AirType'
import { AirColor } from '../../enum/AirColor'
import { IDictionary } from '../../interface/IDictionary'
import { AirDictionary } from '../AirDictionary'

/**
 * # 字典数组
 * @author Hamm.cn
 */
export class AirDictionaryArray<T extends IDictionary = IDictionary> extends Array<T> {
  /**
   * # 创建字典
   * @param list 字典数组
   */
  static create(list: IDictionary[]): AirDictionaryArray {
    return this.createCustom<IDictionary>(list)
  }

  /**
   * # 创建自定义字典
   * @param list 字典数组
   */
  static createCustom<T extends IDictionary>(list: T[]): AirDictionaryArray<T> {
    const dictionary = new AirDictionaryArray<T>()
    list.forEach((json: T) => {
      const item = Object.assign(new AirDictionary(), json)
      dictionary.push(item)
    })
    return dictionary
  }

  /**
   * # 获取字典指定Key的Label
   * @param key Key
   * @param defaultLabel 默认Label
   */
  getLabel(key: AirEnumKey, defaultLabel = '-'): string {
    return this.get(key).label || defaultLabel
  }

  /**
   * # 获取字典指定Key的Color
   * @param key Key
   * @param defaultColor 默认Color
   */
  getColor(key: AirEnumKey, defaultColor: AirColorString = AirColor.NORMAL): AirColorString {
    return this.get(key).color || defaultColor
  }

  /**
   * # 获取一个字典选项
   * ---
   * 💡 可能返回一个空字典 但你可以放心的点属性
   * @param key Key
   */
  get(key: AirEnumKey): T {
    return this.findByKey(key) as T || {}
  }

  /**
   * # 查找一个字典选项 可能找不到
   * ---
   * 💡 可以尝试 ```.get()``` 后放心大胆的点属性
   * @param key Key
   */
  findByKey(key: AirEnumKey): T | undefined {
    return this.find((item) => item.key === key)
  }
}
