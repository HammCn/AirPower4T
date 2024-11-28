import { AirModel } from '../base/AirModel'
import { Field } from '../decorator/Field'

/**
 * # 分页类
 * @author Hamm.cn
 */
export class AirPage extends AirModel {
  /**
   * ## 分页页数
   */
  @Field({
    type: Number,
  })
    pageNum = 1

  /**
   * ## 每页数量
   */
  @Field({
    type: Number,
  })
    pageSize = 20

  /**
   * ## 是否在当前首页
   */
  isFirstPage(): boolean {
    return this.pageNum === 1
  }
}
