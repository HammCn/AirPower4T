import { AirEntity } from '../base/AirEntity'
import { AirModel } from '../base/AirModel'
import { Type } from '../decorator/Custom'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirSort } from './AirSort'

/**
 * # 请求类
 * @author Hamm
 */
export class AirRequest<E extends AirEntity = AirEntity> extends AirModel {
  /**
   * # 查询信息
   */
  filter!: E

  /**
   * # 关键词搜索
   */
  keyword!: string

  /**
   * # 排序信息
   */
  @Type(AirSort) sort!: AirSort

  /**
   * # 如传入filter的类 将自动初始化一个空filter
   * @param filterClass filter的类
   */
  constructor(filterClass: ClassConstructor<E>) {
    super()
    if (filterClass) {
      this.filter = AirClassTransformer.parse({}, filterClass)
    }
  }

  /**
   * # 设置排序对象
   * @param sort 排序对象
   */
  setSort(sort: AirSort): this {
    this.sort = sort
    return this
  }
}
