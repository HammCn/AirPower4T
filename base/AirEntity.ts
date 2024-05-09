import {
  Dictionary, Field, Type,
} from '../decorator/Custom'
import { AirModel } from './AirModel'
<<<<<<< HEAD
=======
import { Table } from '../decorator/TableField'
>>>>>>> web
import { AirDisableDictionary } from '../model/AirDisableDictionary'

/**
 * # 实体超类
 * @author Hamm
 */
export class AirEntity extends AirModel {
  /**
   * # 主键ID
   */
  @Type(Number)
  @Field('ID') id!: number

  @Type(Boolean)
  @Dictionary(AirDisableDictionary)
<<<<<<< HEAD
  @FieldName('禁用') isDisabled!: boolean
=======
  @Table({
    showColor: true,
    width: 80,
    orderNumber: -100,
    forceShow: true,
    removed: true,
  })
  @Field('禁用') isDisabled!: boolean
>>>>>>> web

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
