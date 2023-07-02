import { AirModel } from '../base/AirModel'
import { ClassConstructor } from '../type/ClassConstructor'
import { IJson } from '../interface/IJson'

/**
 * # 转换类型助手
 * @author Hamm
 */
export class AirClassTransformer {
  /**
   * # 复制一个新的JSON对象
   * @param json JSON
   */
  static copyJson<T extends IJson>(json: T): T {
    if (!json) {
      return json
    }
    return JSON.parse(JSON.stringify(json))
  }

  /**
   * # 转换JSON数据到指定类的对象
   * @param json JSON
   * @param clazz 目标类
   */
  // eslint-disable-next-line class-methods-use-this
  static parse<T extends AirModel>(json: IJson, clazz: ClassConstructor<T>): T {
    // eslint-disable-next-line new-cap
    return AirModel.parse(new clazz(), json)
  }

  /**
   * # 转换JSON数组数据到指定类的对象数组
   * @param jsonArray JSON数组
   * @param clazz 目标类
   */
  static parseArray<T extends AirModel>(jsonArray: IJson[], clazz: ClassConstructor<T>): T[] {
    return jsonArray.map((json) => this.parse(json, clazz))
  }

  /**
   * # 复制一个实例
   * @param from 来源类对象实例
   * @param to 目标类
   */
  static copy<F extends AirModel, M extends AirModel>(from: F, to: ClassConstructor<M>): M {
    return this.parse(from.toJson(), to)
  }

  /**
   * # 初始化一个指定类型的实例
   *
   * @param to 目标类
   */
  static newInstance<T extends AirModel>(clazz: ClassConstructor<T>): T {
    return this.parse({}, clazz)
  }
}
