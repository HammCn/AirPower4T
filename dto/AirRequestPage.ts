import { Expose, Type } from 'class-transformer'
import { AirPage } from './AirPage'
import { AirRequest } from './AirRequest'
import { AirEntity } from './AirEntity'

/**
 * # 请求分页类
 * @author Hamm
 */
export class AirRequestPage<E extends AirEntity> extends AirRequest<E> {
  /**
   * # 分页信息
   */
  @Type(() => AirPage)
  @Expose() page = new AirPage()
}
