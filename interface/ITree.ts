import { AirEntity } from '../base/AirEntity'

/**
 * # 标准树结构
 * @author Hamm.cn
 */
export interface ITree extends AirEntity {
  /**
   * ## 树节点名称
   */
  name: string

  /**
   * ## 树的子节点
   * 为了成功的数据转换,请注意自行 `@Type`
   */
  children: this[]

  /**
   * ## 父节点 `ID`
   */
  parentId?: number
}
