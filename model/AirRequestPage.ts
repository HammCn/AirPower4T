import { AirEntity } from '../base/AirEntity'
import { Type } from '../decorator/Custom'
import { AirPage } from './AirPage'
import { AirRequest } from './AirRequest'

/**
 * 请求分页类
 * @author Hamm
 */
export class AirRequestPage<E extends AirEntity> extends AirRequest<E> {
  /**
   * 分页信息
   */
  @Type(AirPage)
  page = new AirPage()
}
