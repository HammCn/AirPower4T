import { Dictionary, Field, Type } from '../decorator/Custom'
import { AirModel } from './AirModel'
import { Table } from '../decorator/TableField'
import { AirDisableDictionary } from '../model/AirDisableDictionary'

/**
 * # 实体超类
 * @author Hamm.cn
 */
export class AirEntity extends AirModel {
  /**
   * ## 主键ID
   */
  @Type(Number)
  @Field('ID') id!: number

  /**
   * ## 是否禁用
   */
  @Type(Boolean)
  @Dictionary(AirDisableDictionary)
  @Table({
    showColor: true,
    width: 80,
    orderNumber: -100,
    forceShow: true,
    removed: true,
  })
  @Field('禁用') isDisabled!: boolean

  /**
   * ## 实例化一个实体
   * @param id `可选` 主键ID
   */
  constructor(id?: number) {
    super()
    if (id) {
      this.id = id
    }
  }

  private static readonly ID = 'id'

  /**
   * ## 复制一个只包含ID的实体
   * @returns 仅包含ID的实体
   */
  copyExposeId() {
    return this.copy()
      .expose(AirEntity.ID)
  }

  /**
   * ## 只暴露ID
   */
  exposeId() {
    return this.expose(AirEntity.ID)
  }

  /**
   * ## 排除ID
   */
  excludeId() {
    return this.exclude(AirEntity.ID)
  }
}
