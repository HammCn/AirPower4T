import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'

/**
 * # 分页类
 * @author Hamm
 */
export class AirPage extends AirModel {
  /**
   * # 分页页数
   */
  @Expose() pageNum = 1

  /**
   * # 每页数量
   */
  @Expose() pageSize = 20
}
