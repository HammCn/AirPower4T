import { AirModel } from '../base/AirModel'
import { ClassConstructor } from '../type/ClassConstructor'
/**
 * # 类转换助手
 * @author Hamm
 */
export class AirClassTransformer {
  /**
   * # 转换JSON数据到指定类的对象
   * @param json JSON
   * @param clazz 目标类
   */
  // eslint-disable-next-line class-methods-use-this
  static parse<T extends AirModel>(json: Record<string, unknown>, clazz: ClassConstructor<T>): T {
    // eslint-disable-next-line new-cap
    return AirModel.toModel(new clazz(), json)
  }

  /**
   * # 转换JSON数组数据到指定类的对象数组
   * @param jsonArray JSON数组
   * @param clazz 目标类
   */
  static parseArray<T extends AirModel>(jsonArray: Record<string, unknown>[], clazz: ClassConstructor<T>): T[] {
    return jsonArray.map((json) => this.parse(json, clazz))
  }
}
