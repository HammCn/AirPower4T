import { AirEntity } from '../base/AirEntity'
import { AirModel } from '../base/AirModel'
import { Type } from '../decorator/Custom'
import { AirSort } from './AirSort'

/**
 * 请求类
 * @author Hamm
 */
export class AirRequest<E extends AirEntity = AirEntity> extends AirModel {
  /**
   * 查询信息
   */
  filter!: E

  /**
   * 关键词搜索
   */
  keyword!: string

  /**
   * 排序信息
   */
  @Type(AirSort)
  sort = new AirSort()
}
