/**
 * # 树配置项
 * @author Hamm.cn
 */
export interface ITreeProps {
  /**
   * ### 表示子集节点的 `key`
   * 一般为 `children`
   */
  children?: string

  /**
   * ### 表示是否含有子集节点的key 一般为 `hasChildren`
   * 如不传入 则自动判断 `children` 的数据是否为有效数组
   */
  hasChildren?: string

  /**
   * ### 用于显示到树控件上的 `key`
   */
  label?: string

  /**
   * ### 是否严格的遵守父子节点不互相关联
   */
  checkStrictly?: boolean
}
