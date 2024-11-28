import { Field } from '../../decorator/Field'
import { AirEntity } from '../../base/AirEntity'
import { IMenu } from '../../interface/IMenu'

/**
 * # 内置菜单实体
 * 如需扩展, 请自行实现 `IMenu`
 * @author Hamm.cn
 */
export class AirMenuEntity extends AirEntity implements IMenu {
  name!: string

  /**
   * # 菜单`URL`
   */
  path!: string

  /**
   * # 菜单图标
   */
  icon!: string

  /**
   * # 菜单绑定组件路径
   */
  component!: string

  /**
   * # 菜单是否隐藏
   */
  @Field({
    type: Boolean,
  })
    isDisabled = false

  @Field({
    // eslint-disable-next-line no-use-before-define
    type: AirMenuEntity,
    array: true,
  })
    children: this[] = []

  /**
   * # 设置菜单名称
   * @param name 菜单名称
   */
  setName(name: string): this {
    this.name = name
    return this
  }

  /**
   * # 设置菜单路径
   * 同步设置 `component` 如需手动设置 请继续调用 `setComponent()`
   * @param path 路径
   */
  setPath(path: string): this {
    this.path = path
    this.component = path
    return this
  }

  /**
   * # 设置组件地址
   * @param component 组件地址
   */
  setComponent(component: string): this {
    this.component = component
    return this
  }

  /**
   * # 设置子菜单列表
   * @param children 子菜单列表
   */
  setChildren(children: this[]): this {
    this.children = children
    return this
  }
}
