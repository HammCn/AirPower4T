import { AirEntity } from '../base/AirEntity'
import { AirModel } from '../base/AirModel'
import { Field } from '../decorator/Field'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { ClassConstructor } from '../type/AirType'
import { AirSort } from './AirSort'

/**
 * # 请求类
 * @author Hamm.cn
 */
export class AirRequest<E extends AirEntity = AirEntity> extends AirModel {
  /**
   * ## 查询信息
   */
  filter!: E

  /**
   * ## 排序信息
   */
  @Field({
    type: AirSort,
  })
    sort?: AirSort

  /**
   * ## 初始化一个请求类
   * @param filterClass 如传入 `filter` 的类 将自动初始化一个空 `filter`
   */
  constructor(filterClass: ClassConstructor<E>) {
    super()
    this.filter = AirClassTransformer.parse({}, filterClass)
  }

  /**
   * ## 设置排序对象
   * @param sort 排序对象
   */
  setSort(sort: AirSort): this {
    this.sort = sort
    return this
  }
}
