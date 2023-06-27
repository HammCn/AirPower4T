/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAlias, getClassName, getDefault, getFieldName, getFieldPrefix, getIgnorePrefix, getIsArray, getToJson, getToModel, getType,
} from '../decorator/Custom'
import { IJson } from '../interface/IJson'

/**
 * # AirModel 模型超类
 * @author Hamm
 */
export class AirModel {
  /**
   * # 用指定的数据对当前实例进行覆盖
   * ---
   * ### 💡 相同字段才会覆盖上去
   * @param obj 覆盖对象
   */
  recoverBy(obj: any): this {
    return Object.assign(this, obj)
  }

  /**
   * # 将当前实例复制到一个新实例上
   */
  copy(): this {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return AirModel.toModel(new this.constructor(), this.toJson())
  }

  /**
   * # 暴露部分类的字段
   * @param fields 字段列表
   */
  expose(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (!fields.includes(field)) {
        (this as any)[field] = undefined
      }
    }
    return this
  }

  /**
   * # 排除部分类的字段
   * @param fields 字段列表
   */
  exclude(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (fields.includes(field)) {
        (this as any)[field] = undefined
      }
    }
    return this
  }

  /**
   * # 转换到JSON
   */
  toJson(): IJson {
    const keys = Object.keys(this)
    const result: IJson = {}
    for (const key of keys) {
      const data = (this as any)[key]
      result[key] = data

      const payloadAlias = (!getIgnorePrefix(this, key) ? getFieldPrefix(this) : '') + getAlias(this, key)
      if (typeof data === 'object') {
        if (data instanceof Array) {
          // 数组需要循环转换
          const arr: IJson[] = []
          for (let i = 0; i < data.length; i += 1) {
            arr[i] = (data[i] as AirModel).toJson()
          }
          result[payloadAlias || key] = arr
        } else {
          // 对象需要递归转换
          result[payloadAlias || key] = (data as AirModel).toJson()
        }
      } else {
        result[payloadAlias || key] = data
      }

      const func = getToJson(this, key)
      if (func === null) {
        if (payloadAlias !== key) {
          delete result[key]
        }
        // eslint-disable-next-line no-continue
        continue
      }
      try {
        result[payloadAlias || key] = func(this)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('ToJson Function Error')
      }
      if (payloadAlias !== key) {
        delete result[key]
      }
    }
    return result
  }

  /**
   * # 从JSON转换到当前类的对象
   * @param json JSON
   */
  static fromJson<T extends AirModel>(this: new () => T, json: IJson = {}): T {
    const model: T = (Object.assign(new this()) as T)
    return AirModel.toModel<T>(model, json)
  }

  /**
   * # 从JSON数组转换到当前类的对象数组
   * @param jsonArray JSON数组
   */
  static fromJsonArray<T extends AirModel>(this: new () => T, jsonArray: IJson | IJson[] = []): T[] {
    const arr: T[] = []
    if (jsonArray instanceof Array) {
      for (let i = 0; i < jsonArray.length; i += 1) {
        const model: T = (Object.assign(new this()) as T)
        arr.push(AirModel.toModel(model, jsonArray[i]))
      }
    } else {
      const model: T = (Object.assign(new this()) as T)
      arr.push(AirModel.toModel(model, jsonArray))
    }
    return arr
  }

  /**
   * # 转换JSON为实体
   * @param model 实体
   * @param json JSON
   */
  // eslint-disable-next-line
  static toModel<T extends AirModel>(model: T, json: IJson = {}): T {
    const keys = Object.keys(model)
    for (const key of keys) {
      // 默认转换类为字符串
      const clazz = getType(model, key)
      const payloadAlias = getAlias(model, key)
      let data = json[(!getIgnorePrefix(model, key) ? getFieldPrefix(model) : '') + (payloadAlias || key)]
      if (data === undefined) {
        // 没有值尝试获取默认值
        data = getDefault(model, key)
      }
      (model as any)[key] = data

      if (getIsArray(model, key)) {
        const arr: any = []
        if (typeof data === 'object' && data instanceof Array) {
          for (let i = 0; i < data.length; i += 1) {
            // 如果标记了类 需要递归处理
            if (clazz) {
              // eslint-disable-next-line new-cap
              arr[i] = this.toModel(new clazz() as AirModel, data[i])
            }
          }
        }
        (model as any)[key] = arr
      } else if (clazz) {
        switch (clazz.name) {
          case 'String':
            (model as any)[key] = data ? data.toString() : getDefault(model, key)
            break
          case 'Number':
            (model as any)[key] = Number.isNaN(parseFloat(data)) ? getDefault(model, key) : parseFloat(data)
            break
          case 'Boolean':
            (model as any)[key] = !!data || getDefault(model, key)
            break
          default:
            // eslint-disable-next-line new-cap
            (model as any)[key] = this.toModel(new clazz() as AirModel, data)
        }
      }

      const func = getToModel(model, key)
      if (func === null) {
        // eslint-disable-next-line no-continue
        continue
      }
      try {
        (model as any)[key] = func((json as any))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('ToModel Function Error')
      }
    }
    // 最后删除无用的数据
    for (const key of keys) {
      const payloadAlias = getAlias(model, key)

      if (payloadAlias && payloadAlias !== key) {
        delete (model as any)[payloadAlias]
      }
    }
    return model
  }

  /**
   * # 创建一个当前类的实例
   */
  // eslint-disable-next-line no-unused-vars
  static newInstance<T>(this: new () => T): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.assign(new this(), null) as T
  }

  /**
   * # 获取类的可阅读名字
   * 可使用 @ClassName 装饰器修饰 如无修饰 则直接返回类名
   */
  static getCustomClassName() {
    return this.newInstance().getCustomClassName()
  }

  /**
   * # 获取属性的可阅读名字
   * @param fieldKey 属性名
   * 可使用 @FieldName 装饰器修饰 如无修饰 则直接返回属性名
   */
  static getCustomFieldName(fieldKey: string): string {
    return this.newInstance().getCustomFieldName(fieldKey)
  }

  //! 保留方法 内置组件中使用 项目中请直接使用上述的静态方法

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getCustomClassName(): string {
    return getClassName(this) || this.constructor.name
  }

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getCustomFieldName(fieldKey: string): string {
    return getFieldName(this, fieldKey)
  }
}
