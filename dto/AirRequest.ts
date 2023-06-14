import { ClassConstructor, Expose, Type } from 'class-transformer'
import { AirSort } from './AirSort'
import { AirModel } from '../model/AirModel'
import { AirEntity } from './AirEntity'
import { AirClassTransformer } from '../helper/AirClassTransformer'

/**
 * # 请求类
 * @author Hamm
 */
export class AirRequest<E extends AirEntity = AirEntity> extends AirModel {
  /**
   * # 查询信息
   */
  @Expose() filter!: E

  /**
   * # 关键词搜索
   */
  @Expose() keyword!: string

  /**
   * # 排序信息
   */
  @Type(() => AirSort)
  @Expose() sort = new AirSort()

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
}
