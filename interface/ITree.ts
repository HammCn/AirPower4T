import { AirEntity } from '../dto/AirEntity'

/**
 * # 标准树结构
 * @author Hamm
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITree<E extends ITree<E> = any> extends AirEntity {
    /**
     * # 树节点名称
     */
    name: string

    /**
     * # 父节点ID
     */
    parentId: number

    /**
     * # 树的子节点
     * ---
     * #### 💡 为了成功的数据转换,请注意自行 @Expose
     */
    children: E[]
}
