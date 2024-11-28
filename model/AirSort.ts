import { AirModel } from '../base/AirModel'
import { AirSortType } from '../enum/AirSortType'

/**
 * # 排序类
 * @author Hamm.cn
 */
export class AirSort extends AirModel {
  /**
   * ## 排序字段 默认 `id`
   */
  field = 'id'

  /**
   * ## 排序方式 默认 `desc`
   */
  direction = AirSortType.DESC

  /**
   * ## 设置排序字段名
   * @param field 字段名
   */
  setField(field: string): this {
    this.field = field
    return this
  }

  /**
   * ## 设置排序方向
   * @param direction 方向
   */
  setDirection(direction: AirSortType): this {
    this.direction = direction
    return this
  }
}
