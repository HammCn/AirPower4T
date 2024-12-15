import { AirAny } from '../type/AirType'

/**
 * # 标准的 `JSON` 数据
 * @author Hamm.cn
 */
export interface IJson<V = AirAny> {
  /**
   * ### `JSON` 的键
   */
  [x: string]: V;
}
