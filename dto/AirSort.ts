import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'
import { AirSortType } from '../enum/AirSortType'

/**
 * # 排序类
 * @author Hamm
 */
export class AirSort extends AirModel {
  /**
   * # 排序字段 默认 ```id```
   */
  @Expose() field = 'id'

  /**
   * # 排序方式 默认 ```desc```
   */
  @Expose() direction = AirSortType.DESC
}
