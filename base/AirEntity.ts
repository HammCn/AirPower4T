import { Dictionary, Field, Type } from '../decorator/Custom'
import { AirModel } from './AirModel'
import { AirDisableDictionary } from '../model/AirDisableDictionary'
import { AirConstant } from '../config/AirConstant'

/**
 * # 实体超类
 * @author Hamm.cn
 */
export class AirEntity extends AirModel {
  /**
   * ## 主键 `ID`
   */
  @Type(Number)
  @Field('ID') id!: number

  /**
   * ## 是否禁用
   */
  @Type(Boolean)
  @Dictionary(AirDisableDictionary)
  @Field('禁用') isDisabled!: boolean

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
  copyExposeId() {
    return this.copy()
      .exposeId()
  }

  /**
   * ## 只暴露 `ID`
   */
  exposeId() {
    return this.expose(AirConstant.ID)
  }

  /**
   * ## 排除 `ID`
   */
  excludeId() {
    return this.exclude(AirConstant.ID)
  }
}
