import { ITree } from './ITree'

/**
 * # 标准菜单结构
 * @author Hamm
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IMenu<E extends IMenu<E> = any> extends ITree<E> {
    /**
     * # 菜单名称
     */
    name: string
    /**
     * # 菜单URL
     */
    path: string

    /**
     * # 菜单图标
     */
    icon: string

    /**
     * # 菜单绑定组件路径
     */
    component: string

    /**
     * # 菜单是否隐藏
     */
    isHide: boolean
}
