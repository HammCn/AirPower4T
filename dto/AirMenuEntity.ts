import { Expose, Type } from 'class-transformer'
import { AirEntity } from './AirEntity'
import { IMenu } from '../interface/IMenu'

/**
 * # 内置菜单实体
 * ---
 * 💡 如需扩展, 请自行实现 ```IMenu```
 * @author Hamm
 */
export class AirMenuEntity extends AirEntity implements IMenu {
  @Type(() => AirMenuEntity)
  @Expose() children: this[] = []

  @Expose() name!: string

  @Expose() parentId!: number

  /**
   * # 菜单URL
   */
  @Expose() path!: string

  /**
   * # 菜单图标
   */
  @Expose() icon!: string

  /**
   * # 菜单绑定组件路径
   */
  @Expose() component!: string

  /**
   * # 菜单是否隐藏
   */
  @Expose() isHide = false
}
