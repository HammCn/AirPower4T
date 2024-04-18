import { Dictionary, FieldName, Type } from '../decorator/Custom'
import { AirModel } from './AirModel'
import { TableField } from '@/airpower/decorator/TableField'
import { AirDisableDictionary } from '@/airpower/model/AirDisableDictionary'

/**
 * # 实体超类
 * @author Hamm
 */
export class AirEntity extends AirModel {
  /**
   * # 主键ID
   */
  @Type(Number)
  @FieldName('ID') id!: number

  @Type(Boolean)
  @Dictionary(AirDisableDictionary)
  @TableField({
    showColor: true,
    width: 80,
    orderNumber: -100,
    forceShow: true,
    removed: true,
  })
  @FieldName('禁用') isDisabled!: boolean

  /**
   * # 实例化一个实体
   * @param id (可选) 主键ID
   */
  constructor(id?: number) {
    super()
    if (id) {
      this.id = id
    }
  }

  /**
   * # 复制一个只包含ID的实体
   * @returns 仅包含ID的实体
   */
  copyExposeId() {
    return this.copy()
      .expose('id')
  }
}
