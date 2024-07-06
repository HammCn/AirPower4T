/**
 * # 标准的 `JSON` 数据
 * @author Hamm.cn
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IJson<V = any> {
  /**
   * ## `JSON` 的键
   */
  [x: string]: V;
}
