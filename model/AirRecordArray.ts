/* eslint-disable @typescript-eslint/no-explicit-any */

import { AirColor } from '../enum/AirColor'
import { IRecord } from '../interface/IRecord'

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
  getLabel(key: any, defaultLabel = '-') {
    return this.find((item) => item.key === key)?.label || defaultLabel
  }

  /**
   * # 获取字典记录集指定Key的Color
   * @param key Key
   * @param defaultColor 默认Color
   */
  getColor(key: any, defaultColor: AirColor | string = AirColor.NORMAL) {
    return this.find((item) => item.key === key)?.color || defaultColor
  }
}
