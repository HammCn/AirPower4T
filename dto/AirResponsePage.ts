import { Expose, Type } from 'class-transformer'
import { AirModel } from '../model/AirModel'
import { AirSort } from './AirSort'
import { AirEntity } from './AirEntity'
import { AirPage } from './AirPage'

/**
 * # 响应分页类
 * @author Hamm
 */
export class AirResponsePage<E extends AirEntity> extends AirModel {
  /**
   * # 返回的当前页数据列表
   */
  @Expose() list: E[] = []

  /**
   * # 返回的页码信息
   */
  @Type(() => AirPage)
  @Expose() page = new AirPage()

  /**
   * # 返回的排序信息
   */
  @Type(() => AirSort)
  @Expose() sort = new AirSort()

  /**
   * # 返回总条数
   */
  @Expose() total = 0

  /**
   * # 返回总页数
   */
  @Expose() pageCount = 0
}
