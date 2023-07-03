/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAlias, getClassName, getDefault, getFieldName, getFieldPrefix, getIgnorePrefix, getIsArray, getToJson, getToModel, getType,
} from '../decorator/Custom'
import { IJson } from '../interface/IJson'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { getFormConfig, getFormConfigList } from '../decorator/FormField'
import { getSearchConfigList } from '../decorator/SearchField'
import { getTableConfigList } from '../decorator/TableField'

/**
 * # 模型超类
 * @author Hamm
 */
export class AirModel {
  /**
   * # 用指定的数据对当前实例进行覆盖
   * ---
   * ### 💡 相同字段才会覆盖上去
   * @param obj 覆盖对象
   */
  recoverBy(obj: IJson | AirModel): this {
    return Object.assign(this, obj)
  }

  /**
   * # 将当前实例复制到一个新实例上
   */
  copy(): this {
    const newModel = Object.create(Object.getPrototypeOf(this))
    Object.assign(newModel, this)
    return newModel
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
   * ---
   * ### 💡 会自动进行数据别名转换
   */
  toJson(): IJson {
    const keys = Object.keys(this)
    const result: IJson = {}
    for (const key of keys) {
      const data = (this as any)[key]
      result[key] = data

      let payloadAlias = getAlias(this, key) || key
      if (!getIgnorePrefix(this, key) && getFieldPrefix(this)) {
        payloadAlias = getFieldPrefix(this) + payloadAlias
      }
      if (typeof data === 'object') {
        if (Array.isArray(data)) {
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
      if (func === undefined) {
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
        console.warn('ToJson Function Error', e)
      }
      if (payloadAlias !== key) {
        delete result[key]
      }
    }
    return result
  }

  /**
   * # 从JSON转换到当前类的对象
   * ---
   * ### 💡 会自动进行数据别名转换
   * @param json JSON
   */
  static fromJson<T extends AirModel>(this: new () => T, json: IJson = {}): T {
    const instance: T = (Object.assign(new this()) as T)
    return AirModel.parse<T>(instance, json)
  }

  /**
   * # 从JSON数组转换到当前类的对象数组
   * ---
   * ### 💡 会自动进行数据别名转换
   * @param jsonArray JSON数组
   */
  static fromJsonArray<T extends AirModel>(this: new () => T, jsonArray: IJson | IJson[] = []): T[] {
    const arr: T[] = []
    if (Array.isArray(jsonArray)) {
      for (let i = 0; i < jsonArray.length; i += 1) {
        const instance: T = (Object.assign(new this()) as T)
        arr.push(AirModel.parse(instance, jsonArray[i]))
      }
    } else {
      const instance: T = (Object.assign(new this()) as T)
      arr.push(AirModel.parse(instance, jsonArray))
    }
    return arr
  }

  /**
   * # 转换JSON为实体
   * ---
   * ### 💡 会自动进行数据别名转换
   * @param instance 实体
   * @param json JSON
   */
  static parse<T extends AirModel>(instance: T, json: IJson = {}): T {
    const keys = Object.keys(instance)
    for (const key of keys) {
      /** # 💡 装饰器为属性配置的强制转换类 */
      const FieldTypeClass = getType(instance, key)
      const payloadAlias = getAlias(instance, key)
      let data = json[
        (!getIgnorePrefix(instance, key)
          ? getFieldPrefix(instance)
          : ''
        )
        + (payloadAlias || key)]
      if (data === undefined) {
        // 没有值尝试获取默认值
        data = getDefault(instance, key)
      }
      (instance as any)[key] = data

      if (getIsArray(instance, key)) {
        const arr: any = []
        if (typeof data === 'object' && Array.isArray(data)) {
          for (let i = 0; i < data.length; i += 1) {
            // 如果标记了类 需要递归处理
            if (FieldTypeClass) {
              arr[i] = this.parse(new FieldTypeClass() as AirModel, data[i])
            }
          }
        }
        (instance as any)[key] = arr
      } else if (FieldTypeClass) {
        switch (FieldTypeClass.name) {
          case 'String':
            (instance as any)[key] = (data ? data.toString() : getDefault(instance, key))
            break
          case 'Number':
            (instance as any)[key] = (Number.isNaN(parseFloat(data)) ? getDefault(instance, key) : parseFloat(data))
            break
          case 'Boolean':
            (instance as any)[key] = !!data || getDefault(instance, key)
            break
          default:
            (instance as any)[key] = this.parse(new FieldTypeClass() as AirModel, data)
        }
      }

      const func = getToModel(instance, key)
      if (func === undefined) {
        // eslint-disable-next-line no-continue
        continue
      }
      try {
        (instance as any)[key] = func((json as any))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('ToModel Function Error', e)
      }
    }
    // 最后删除无用的数据
    for (const key of keys) {
      const payloadAlias = getAlias(instance, key)

      if (payloadAlias && payloadAlias !== key) {
        delete (instance as any)[payloadAlias]
      }
    }
    return instance
  }

  /**
   * # 创建一个当前类的实例
   */
  // eslint-disable-next-line no-unused-vars
  static newInstance<T extends AirModel>(): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.assign(new this(), null) as T
  }

  /**
   * # 获取类的可阅读名字
   * 可使用 @ClassName 装饰器修饰 如无修饰 则直接返回类名
   */
  static getClassName() {
    return this.newInstance().getClassName()
  }

  /**
   * # 获取属性的可阅读名字
   * @param fieldKey 属性名
   * 可使用 @FieldName 装饰器修饰 如无修饰 则直接返回属性名
   */
  static getFieldName(fieldKey: string): string {
    return this.newInstance().getFieldName(fieldKey)
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getClassName(): string {
    return getClassName(this) || this.constructor.name
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFieldName(fieldKey: string): string {
    return getFieldName(this, fieldKey)
  }

  /**
   *
   * # 获取表单配置的Label
   *
   * 依次读取 ```表单配置的label``` > ```@FieldName``` > ```fieldKey```
   * @param fieldKey 字段名
   */
  static getFormFieldLabel(fieldKey: string): string {
    return this.newInstance().getFormFieldLabel(fieldKey)
  }

  /**
   * # 获取表格字段的配置列表
   * @param fieldNameList 字段列表
   */
  static getTableFieldConfigList(...fieldNameList: string[]): AirTableFieldConfig[] {
    return this.newInstance().getTableFieldConfigList(fieldNameList)
  }

  /**
   * # 获取表单字段的配置列表
   * @param fieldNameList 字段列表
   */
  static getFormFieldConfigList(...fieldNameList: string[]): AirFormFieldConfig[] {
    return this.newInstance().getFormFieldConfigList(fieldNameList)
  }

  /**
   * # 获取搜索字段的配置列表
   * 如不传入参数 则默认取所有标记了注解的字段
   * @param fieldNameList [可选]字段列表
   */
  static getSearchFieldConfigList(...fieldNameList: string[]): AirSearchFieldConfig[] {
    return this.newInstance().getSearchFieldConfigList(fieldNameList)
  }

  /**
   * # 获取属性的表单配置
   * @param fieldKey 属性名
   */
  static getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return this.newInstance().getCustomFormFieldConfig(fieldKey)
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return getFormConfig(this, fieldKey)
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFormFieldLabel(fieldKey: string): string {
    return this.getCustomFormFieldConfig(fieldKey)?.label || this.getFieldName(fieldKey)
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getTableFieldConfigList(fieldNameList: string[] = []): AirTableFieldConfig[] {
    return getTableConfigList(this, fieldNameList)
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFormFieldConfigList(fieldNameList: string[] = []): AirFormFieldConfig[] {
    return getFormConfigList(this, fieldNameList)
  }

  /**
   * # 请直接调用静态方法获取
   * ! 内部使用的保留方法
   * @deprecated
   */
  getSearchFieldConfigList(fieldNameList: string[] = []): AirSearchFieldConfig[] {
    const configList = getSearchConfigList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber || 1)
    const queryParams: AirSearchFieldConfig[] = []
    for (const config of configList) {
      queryParams.push(config)
    }
    return queryParams
  }
}
