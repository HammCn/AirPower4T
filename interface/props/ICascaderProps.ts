import { ITreeProps } from './ITreeProps'

/**
 * # 级联面板配置项
 * @author Hamm.cn
 */
export interface ICascaderProps extends ITreeProps {
  /**
   * ### 节点是否多选
   */
  multiple?: boolean

  /**
   * ### 是否动态加载子节点，需与 `lazyLoad` 方法结合使用
   */
  lazy?: boolean

  /**
   * ### 指定选项的值为选项对象的某个属性值
   */
  value?: string

  /**
   * ### 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组
   * 若设置 `false`，则只返回该节点的值
   */
  emitPath?: boolean

  /**
   * ### 次级菜单的展开方式
   */
  expandTrigger?: 'hover' | 'click'

  /**
   * ### 指定选项的叶子节点的标志位为选项对象的某个属性值
   */
  leaf?: string

  /**
   * ### 指定选项的禁用为选项对象的某个属性值
   */
  disabled?: string
}
