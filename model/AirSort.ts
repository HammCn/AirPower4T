import { AirModel } from '../base/AirModel'
import { AirSortType } from '../enum/AirSortType'

/**
 * 排序类
 * @author Hamm
 */
export class AirSort extends AirModel {
  /**
   * 排序字段 默认 ```id```
   */
  field = 'id'

  /**
   * 排序方式 默认 ```desc```
   */
  direction = AirSortType.DESC
}
