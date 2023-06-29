/* eslint-disable @typescript-eslint/no-explicit-any */

import { AirColor } from '../../enum/AirColor'
import { IRecord } from '../../interface/IRecord'
import { AirRecord } from '../AirRecord'

/**
 * # 字典记录集数组
 * @author Hamm
 */
export class AirRecordArray<T extends IRecord> extends Array<T> {
  /**
   * # 获取字典记录集指定Key的Label
   * @param key Key
   * @param defaultLabel 默认Label
   */
  getLabel(key: boolean | number | string, defaultLabel = '-'): string {
    return this.find((item) => item.key === key)?.label || defaultLabel
  }

  /**
   * # 获取字典记录集指定Key的Color
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
   * # 创建可扩展的记录集字典
   * @param list 字典数组
   */
  static createCustom<T extends IRecord>(list: T[]): AirRecordArray<T> {
    const recordArray = new AirRecordArray<T>()
    list.forEach((json: T) => {
      const item = { ...new AirRecord(), ...json }
      recordArray.push(item)
    })
    return recordArray
  }

  /**
   * # 创建记录集字典
   * @param list 字典数组
   */
  static create(list: IRecord[]): AirRecordArray<IRecord> {
    const recordArray = new AirRecordArray<IRecord>()
    list.forEach((json) => {
      const item = { ...new AirRecord(), ...json }
      recordArray.push(item)
    })
    return recordArray
  }
}
