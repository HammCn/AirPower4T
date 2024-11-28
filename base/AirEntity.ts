import { AirModel } from './AirModel'
import { Table } from '../decorator/TableField'
import { AirDisableDictionary } from '../model/AirDisableDictionary'
import { AirConstant } from '../config/AirConstant'
import { Field } from '../decorator/Field'

/**
 * # 实体超类
 * @author Hamm.cn
 */
export class AirEntity extends AirModel {
  /**
   * ## 主键 `ID`
   */
  @Field({
    label: 'ID',
    type: Number,
  })
    id!: number

  /**
   * ## 是否禁用
   */
  @Table({
    showColor: true,
    width: 80,
    orderNumber: -100,
    forceShow: true,
    removed: true,
  })
  @Field({
    label: '是否禁用',
    type: Boolean,
    dictionary: AirDisableDictionary,
  })
    isDisabled!: boolean

  /**
   * ## 实例化一个实体
   * @param id `可选` 主键 `ID`
   */
  constructor(id?: number) {
    super()
    if (id) {
      this.id = id
    }
  }

  /**
   * ## 复制一个只包含 `ID` 的实体
   * @returns 仅包含ID的实体
   */
  copyExposeId(): this {
    return this.copy()
      .exposeId()
  }

  /**
   * ## 只暴露 `ID`
   */
  exposeId(): this {
    return this.expose(AirConstant.ID)
  }

  /**
   * ## 排除 `ID`
   */
  excludeId(): this {
    return this.exclude(AirConstant.ID)
  }

  /**
   * ## 设置禁用
   * @param isDisabled 禁用
   */
  setDisable(isDisabled = true): this {
    this.isDisabled = isDisabled
    return this
  }
}
