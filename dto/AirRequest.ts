import { Expose, Type } from 'class-transformer'
import { AirSort } from './AirSort'
import { AirModel } from '../model/AirModel'
import { AirEntity } from './AirEntity'

/**
 * # 请求类
 * @author Hamm
 */
export class AirRequest<E extends AirEntity = AirEntity> extends AirModel {
  /**
   * # 查询信息
   */
  @Expose() filter!: E

  /**
   * # 关键词搜索
   */
  @Expose() keyword!: string

  /**
   * # 排序信息
   */
  @Type(() => AirSort)
  @Expose() sort = new AirSort()
}
