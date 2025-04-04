import type { AirEntity } from '../base/AirEntity'
import { Field } from '../decorator'
import { AirPage } from './AirPage'
import { AirRequest } from './AirRequest'

/**
 * # 请求分页类
 * @author Hamm.cn
 */
export class AirRequestPage<E extends AirEntity> extends AirRequest<E> {
  /**
   * ### 分页信息
   */
  @Field({
    type: AirPage,
  })
  page = new AirPage()
}
