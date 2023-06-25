import { Type } from '../decorator/Custom'
import { AirModel } from './AirModel'

/**
 * # 实体超类
 * @author Hamm
 */
export class AirEntity extends AirModel {
  /**
   * # 主键ID
   */
  @Type(Number) id!: number

  /**
   * # 实例化一个实体
   * @param id [可选] 主键ID
   */
  constructor(id?: number) {
    super()
    if (id) {
      this.id = id
    }
  }
}
