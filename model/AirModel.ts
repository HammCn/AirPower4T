/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor, instanceToPlain } from 'class-transformer'
import { getClassName, getFieldName, getDescription } from '../decorator/CustomName'
import { getCustomFormFieldList, getFormFieldConfig } from '../decorator/FormField'
import { getCustomSearchFieldList } from '../decorator/SearchField'
import { getCustomTableFieldList } from '../decorator/TableField'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirClassTransformer } from '../helper/AirClassTransformer'

/**
 * # AirModel 模型基类
 * ---
 * ### 💡 模型基类包含了一些常用模型的操作
 *
 * @see ```withDefaultValue()```
 * @author Hamm
 */
export class AirModel {
  /**
   * # 用指定的数据对当前实例进行覆盖
   * ---
   * # 💡 相同字段才会覆盖上去
   * @param obj 覆盖对象
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recoverBy(obj: any): this {
    return Object.assign(this, obj)
  }

  /**
   * # 将当前实例复制到一个新实例上
   */
  copy(): this {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return AirClassTransformer.copy(this, (this as any).constructor)
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
        // eslint-disable-next-line
        (this as any)[field] = undefined
      }
    }
    return this
  }

  /**
   * # 按别名转换为普通的JSON对象
   */
  toJson(): Record<string, any> {
    return instanceToPlain(this)
  }

  /**
   * # 按别名转换为原始JSON字符串
   */
  toJsonString(): string {
    return JSON.stringify(instanceToPlain(this))
  }

  /**
   * # 为当前实体初始化默认值
   */
  withDefaultValue(): this {
    return this
  }

  /**
   * # 指定的实体是否是实体
   * @param clazz [可选]类名
   */
  isEntity(clazz?: ClassConstructor<AirModel>): boolean {
    if (!clazz) {
      return this.isEntity(this.constructor as ClassConstructor<AirModel>)
    }
    if (clazz.name === 'AirModel') {
      return false
    }
    if (clazz.name === 'AirEntity') {
      return true
    }
    const superClass = Object.getPrototypeOf(clazz)
    return this.isEntity(superClass)
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
   * # 将JSON原始对象强制转换到当前类的实体
   * @param json JSON原始对象
   */
  static fromJson<T extends AirModel>(this: new () => T, json: Record<string, any>): T {
    return AirClassTransformer.parse(json, this) as T
  }

  /**
   * # 将JSON原始对象数组强制转换到当前类的实体数组
   * @param json JSON原始对象
   */
  static fromJsonArray<T extends AirModel>(this: new () => T, jsonArray: Record<string, any>[]): T[] {
    return AirClassTransformer.parseArray(jsonArray, this) as T[]
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
   * # 获取属性的描述
   * @param fieldKey 属性名
   * 可使用 @Description 装饰器修饰 如无修饰 则直接返回空字符串
   */
  static getCustomDescription(fieldKey: string): string {
    return this.newInstance().getCustomDescription(fieldKey)
  }

  /**
   *
   * # 😋获取表单配置的Label
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
    return getClassName(this.constructor) || this.constructor.name
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
  getCustomDescription(fieldKey: string): string {
    return getDescription(this, fieldKey)
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
