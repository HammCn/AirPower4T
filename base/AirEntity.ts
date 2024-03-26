import { FieldName, Type } from '../decorator/Custom'
import { AirModel } from './AirModel'

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
   * # 获取一个只包含ID的实体
   * @returns 仅包含ID的实体
   */
  newInstanceOnlyId() {
    return new AirEntity(this.id)
  }
}
