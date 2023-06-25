import { AirEntity } from '../base/AirEntity'

/**
 * # 标准树结构
 * @author Hamm
 */
export interface ITree extends AirEntity {
    /**
     * # 树节点名称
     */
    name: string

    /**
     * # 树的子节点
     * ---
     * ### 💡 为了成功的数据转换,请注意自行```@Expose```
     */
    children: this[]

    /**
     * # 父节点ID
     */
    parentId?: number
}
