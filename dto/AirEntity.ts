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
   * # 设置ID
   * @param id ID
   */
  setId(id: number): this {
    this.id = id
    return this
  }
}
