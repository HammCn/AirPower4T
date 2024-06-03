import {
  Dictionary, Field, FieldName, Type,
} from '../decorator/Custom'
import { AirModel } from './AirModel'
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
