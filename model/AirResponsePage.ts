import { AirEntity } from '../base/AirEntity'
import { AirModel } from '../base/AirModel'
import { Field } from '../decorator/Field'
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
  @Field({
    type: AirPage,
  })
    page = new AirPage()

  /**
   * ## 返回的排序信息
   */
  @Field({
    type: AirSort,
  })
    sort = new AirSort()

  /**
   * ## 返回总条数
   */
  @Field({
    type: Number,
  })
    total = 0

  /**
   * ## 返回总页数
   */
  @Field({
    type: Number,
  })
    pageCount = 0
}
