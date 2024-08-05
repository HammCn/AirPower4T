import { AirEntity } from '../base/AirEntity'
import { AirModel } from '../base/AirModel'
import { Type } from '../decorator/Custom'
import { AirPage } from './AirPage'
import { AirSort } from './AirSort'

/**
 * # 响应分页类
 * @author Hamm.cn
 */
export class AirResponsePage<E extends AirEntity> extends AirModel {
  /**
   * ## 返回的当前页数据列表
   */
  list: E[] = []

  /**
   * ## 返回的页码信息
   */
  @Type(AirPage) page = new AirPage()

  /**
   * ## 返回的排序信息
   */
  @Type(AirSort) sort = new AirSort()

  /**
   * ## 返回总条数
   */
  @Type(Number) total = 0

  /**
   * ## 返回总页数
   */
  @Type(Number) pageCount = 0
}
