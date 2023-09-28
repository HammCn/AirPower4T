import { AirModel } from '../base/AirModel'
import { Type } from '../decorator/Custom'

/**
 * # 分页类
 * @author Hamm
 */
export class AirPage extends AirModel {
  /**
   * # 分页页数
   */
  @Type(Number) pageNum = 1

  /**
   * # 每页数量
   */
  @Type(Number) pageSize = 20
}
