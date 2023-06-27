/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import {
  getAlias, getClassName, getDefault, getFieldName, getFieldPrefix, getIgnorePrefix, getIsArray, getToJson, getToModel, getType,
} from '../decorator/Custom'
import { getFormFieldConfig, getCustomFormFieldList } from '../decorator/FormField'
import { getCustomSearchFieldList } from '../decorator/SearchField'
import { getCustomTableFieldList } from '../decorator/TableField'
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
    return AirModel.parse(new this.constructor(), this.toJson())
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
  static fromJson<T extends AirModel>(json: IJson = {}): T {
    return AirModel.parse(this.newInstance(), json)
  }

  /**
   * # 从JSON数组转换到当前类的对象数组
   * @param jsonArray JSON数组
   */
  static fromJsonArray<T extends AirModel>(jsonArray: IJson | IJson[] = []): T[] {
    const arr: T[] = []
    if (jsonArray instanceof Array) {
      for (let i = 0; i < jsonArray.length; i += 1) {
        arr.push(AirModel.parse(this.newInstance(), jsonArray[i]))
      }
    } else {
      arr.push(AirModel.parse(this.newInstance(), jsonArray))
    }
    return arr
  }

  /**
   * # 转换JSON为实体
   * @param instance 实体
   * @param json JSON
   */
  // eslint-disable-next-line
  static parse<T extends AirModel>(instance: T, json: IJson = {}): T {
    const keys = Object.keys(instance)
    for (const key of keys) {
      // 默认转换类为字符串
      const clazz = getType(instance, key)
      const payloadAlias = getAlias(instance, key)
      let data = json[(!getIgnorePrefix(instance, key) ? getFieldPrefix(instance) : '') + (payloadAlias || key)]
      if (data === undefined) {
        // 没有值尝试获取默认值
        data = getDefault(instance, key)
      }
      (instance as any)[key] = data

      if (getIsArray(instance, key)) {
        const arr: any = []
        if (typeof data === 'object' && data instanceof Array) {
          for (let i = 0; i < data.length; i += 1) {
            // 如果标记了类 需要递归处理
            if (clazz) {
              // eslint-disable-next-line new-cap
              arr[i] = this.parse(new clazz() as AirModel, data[i])
            }
          }
        }
        (instance as any)[key] = arr
      } else if (clazz) {
        switch (clazz.name) {
          case 'String':
            (instance as any)[key] = data ? data.toString() : getDefault(instance, key)
            break
          case 'Number':
            (instance as any)[key] = Number.isNaN(parseFloat(data)) ? getDefault(instance, key) : parseFloat(data)
            break
          case 'Boolean':
            (instance as any)[key] = !!data || getDefault(instance, key)
            break
          default:
            // eslint-disable-next-line new-cap
            (instance as any)[key] = this.parse(new clazz() as AirModel, data)
        }
      }

      const func = getToModel(instance, key)
      if (func === null) {
        // eslint-disable-next-line no-continue
        continue
      }
      try {
        (instance as any)[key] = func((json as any))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('ToModel Function Error')
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

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return getFormFieldConfig(this, fieldKey)
  }

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getFormFieldLabel(fieldKey: string): string {
    return this.getCustomFormFieldConfig(fieldKey)?.label || this.getCustomFieldName(fieldKey)
  }

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getTableFieldConfigList(fieldNameList: string[] = []): AirTableFieldConfig[] {
    const configList = getCustomTableFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber)
    return configList
  }

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getFormFieldConfigList(fieldNameList: string[] = []): AirFormFieldConfig[] {
    const configList = getCustomFormFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber)
    return configList
  }

  /**
   * # 请直接调用静态方法获取
   * @deprecated
   */
  getSearchFieldConfigList(fieldNameList: string[] = []): AirSearchFieldConfig[] {
    const configList = getCustomSearchFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber || 1)
    const queryParams: AirSearchFieldConfig[] = []
    for (const config of configList) {
      queryParams.push(config)
    }
    return queryParams
  }
}
