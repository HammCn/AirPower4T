import { AirEntity } from '@/airpower/base/AirEntity'
import { IsArray, Type } from '@/airpower/decorator/Custom'
import { IMenu } from '@/airpower/interface/IMenu'

/**
 * # 内置菜单实体
 * ---
 * 💡 如需扩展, 请自行实现 ```IMenu```
 * @author Hamm
 */
export class AirMenuEntity extends AirEntity implements IMenu {
  // eslint-disable-next-line no-use-before-define
  @Type(AirMenuEntity)
  @IsArray() children: this[] = []

  name!: string

  /**
   * # 菜单URL
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
  @Type(Boolean) isHide = false
}
