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
  @Type(String) keyword!: string

  /**
   * # 排序信息
   */
  @Type(AirSort) sort!: AirSort

  /**
   * # 初始化一个请求类
   * @param filterClass 如传入filter的类 将自动初始化一个空filter
   */
  constructor(filterClass: ClassConstructor<E>) {
    super()
    this.filter = AirClassTransformer.parse({}, filterClass)
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
