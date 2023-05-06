/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor, instanceToPlain } from 'class-transformer'
import { getClassName, getFieldName, getDescription } from '../decorator/CustomName'
import { getCustomFormFieldList, getFormFieldConfig } from '../decorator/FormField'
import { getCustomSearchFieldList } from '../decorator/SearchField'
import { getCustomTableFieldList } from '../decorator/TableField'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'

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
   * # 将普通JSON对象合并到实体上
   *
   * 💡 请通过 ```AirClassTransformer.parse()``` 转换原始JSON对象
   *
   * @param obj 普通JSON对象
   */
  copy(obj: Record<string, any>): this {
    return Object.assign(this, obj)
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
   * # 获取类的可阅读名字
   * 可使用 @ClassName 装饰器修饰 如无修饰 则直接返回类名
   */
  getCustomClassName(): string {
    return getClassName(this.constructor) || this.constructor.name
  }

  /**
   * # 获取属性的可阅读名字
   * @param fieldKey 属性名
   * 可使用 @FieldName 装饰器修饰 如无修饰 则直接返回属性名
   */
  getCustomFieldName(fieldKey: string): string {
    return getFieldName(this, fieldKey)
  }

  /**
   * # 获取属性的描述
   * @param fieldKey 属性名
   * 可使用 @Description 装饰器修饰 如无修饰 则直接返回空字符串
   */
  getCustomDescription(fieldKey: string): string {
    return getDescription(this, fieldKey)
  }

  /**
   *
   * # 😋获取表单配置的Label
   *
   * 依次读取 ```表单配置的label``` > ```@FieldName``` > ```fieldKey```
   * @param fieldKey 字段名
   */
  getFormFieldLabel(fieldKey: string): string {
    return this.getCustomFormFieldConfig(fieldKey)?.label || this.getCustomFieldName(fieldKey)
  }

  /**
   * # 直接转为普通JSON对象
   * 此方法不会按别名转换,如需别名转换 请调用
   * @see toSourceObject()
   */
  toObject(): Record<string, any> {
    return JSON.parse(JSON.stringify(this))
  }

  /**
   * # 将模型对象转为JSON字符串
   * 此方法不会按别名转换,如需别名转换 请调用
   * @see toSourceString()
   */
  toString(): string {
    return JSON.stringify(this)
  }

  /**
   * # 按别名转换为普通的JSON对象
   */
  toSourceObject(): Record<string, any> {
    return instanceToPlain(this)
  }

  /**
   * # 按别名转换为原始JSON字符串
   */
  toSourceString(): string {
    return JSON.stringify(instanceToPlain(this))
  }

  /**
   * # 获取表格字段的配置列表
   * @param fieldNameList 字段列表
   */
  getTableFieldConfigList(...fieldNameList: string[]): AirTableFieldConfig[] {
    const configList = getCustomTableFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber)
    return configList
  }

  /**
   * # 获取表单字段的配置列表
   * @param fieldNameList 字段列表
   */
  getFormFieldConfigList(...fieldNameList: string[]): AirFormFieldConfig[] {
    const configList = getCustomFormFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber)
    return configList
  }

  /**
   * # 获取搜索字段的配置列表
   * 如不传入参数 则默认取所有标记了注解的字段
   * @param fieldNameList [可选]字段列表
   */
  getSearchFieldConfigList(...fieldNameList: string[]): AirSearchFieldConfig[] {
    const configList = getCustomSearchFieldList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber || 1)
    const queryParams: AirSearchFieldConfig[] = []
    for (const config of configList) {
      queryParams.push(config)
    }
    return queryParams
  }

  /**
   * # 获取属性的表单配置
   * @param fieldKey 属性名
   */
  getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return getFormFieldConfig(this, fieldKey)
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
}
