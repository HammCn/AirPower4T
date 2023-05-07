import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'
import { IEntity } from '../interface/IEntity'

/**
 * # 实体超类
 * @author Hamm
 */
export class AirEntity extends AirModel implements IEntity {
  /**
   * # 主键ID
   */
  @Expose() id!: number

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

  /**
   * # 设置ID
   * @param id ID
   */
  setId(id: number): this {
    this.id = id
    return this
  }
}
