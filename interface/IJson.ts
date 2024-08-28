/**
 * # 标准的 `JSON` 数据
 * @author Hamm.cn
 */

import { AirAny } from '../type/AirType'

export interface IJson<V = AirAny> {
  /**
   * ## `JSON` 的键
   */
  [x: string]: V;
}
