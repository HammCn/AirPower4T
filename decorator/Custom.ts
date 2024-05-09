/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * # 自定义类和属性名注解
 * @author Hamm
 */
import { AirDecorator } from '../helper/AirDecorator'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * # 字典配置Key
 */
const DICTIONARY_KEY = 'Dictionary'

/**
 * # 标记属性的枚举字典
 * @param dictionary 字典数组
 */
export function Dictionary(dictionary: AirDictionaryArray): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, DICTIONARY_KEY, dictionary)
}

/**
 * # 获取属性枚举字典
 * @param target 目标类
 * @param key 属性名
 */
export function getDictionary(target: any, key: string): AirDictionaryArray | undefined {
  const config = AirDecorator.getFieldConfig(target, key, DICTIONARY_KEY)
  if (config) {
    return AirDictionaryArray.create(config)
  }
  return undefined
}

/**
 * # 强制类型配置Key
 */
const TYPE_KEY = 'Type'

/**
 * # 标记为数组Key
 */
const IS_ARRAY_KEY = 'IsArray'

/**
 * # 标记属性强制转换类
 * @param Clazz 类型
 * @param isArray (可选)是否是数组
 */
export function Type(Clazz: ClassConstructor<any>, isArray = false): Function {
  return (target: any, key: string) => {
    AirDecorator.setFieldConfig(target, key, TYPE_KEY, Clazz)
    AirDecorator.setFieldConfig(target, key, IS_ARRAY_KEY, isArray)
  }
}

/**
 * # 标记是数组
 * 可在此配置，但更建议在Type中直接配置第二个参数
 */
export function List(): Function {
  return (target: any, key: string) => {
    AirDecorator.setFieldConfig(target, key, IS_ARRAY_KEY, true)
  }
}

/**
 * # 请使用 @Array
 * @deprecated
 */
export function IsArray(): Function {
  return List()
}

/**
 * # 获取属性强制转换类
 * @param target 目标类
 * @param key 属性名
 */
export function getType(target: any, key: string): ClassConstructor<unknown> | undefined {
  return AirDecorator.getFieldConfig(target, key, TYPE_KEY) || undefined
}

/**
 * # 获取属性是否数组
 * @param target 目标类
 * @param key 属性名
 */
export function getIsArray(target: any, key: string): boolean {
  return AirDecorator.getFieldConfig(target, key, IS_ARRAY_KEY)
}

/**
 * # 自定义到JSON转换Key
 */
const TO_JSON_KEY = 'ToJson'

/**
 * # 自定义转换到JSON的方法
 * @param func 方法
 */
export function ToJson(func: Function): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, TO_JSON_KEY, func)
}

/**
 * # 获取自定义转换到JSON的方法
 * @param target 目标类
 * @param key 属性名
 */
export function getToJson(target: any, key: string): Function | undefined {
  return AirDecorator.getFieldConfig(target, key, TO_JSON_KEY)
}

/**
 * # 自定义到模型转换Key
 */
const TO_MODEL_KEY = 'ToModel'

/**
 * # 自定义转换到Model的方法
 * @param func 方法
 */
export function ToModel(func: Function): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, TO_MODEL_KEY, func)
}

/**
 * # 获取自定义转换到Model的方法
 * @param target 目标类
 * @param key 属性名
 */
export function getToModel(target: any, key: string): Function | undefined {
  return AirDecorator.getFieldConfig(target, key, TO_MODEL_KEY)
}

/**
 * # 默认值Key
 */
const DEFAULT_KEY = 'Default'

/**
 * # 标记JSON转换到模型时属性的默认值
 * ---
 * ### 💡 如标记了 ```@Type(?, true)``` 则默认值为 ```[]```, 但仍可以通过此装饰器覆盖
 *
 * @param value 默认值
 */
export function Default(value: any): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, DEFAULT_KEY, value)
}

/**
 * # 获取类的属性默认值
 * @param target 目标类
 * @param key 属性名
 */
export function getDefault(target: any, key: string): any {
  return AirDecorator.getFieldConfig(target, key, DEFAULT_KEY)
}

/**
 * # 类名称Key
 */
const CLASS_NAME_KEY = 'ClassName'

/**
 * # 为类标记可读名称
 * @param name 类的可读名称
 */
export function Model(name: string): Function {
  return (target: any) => AirDecorator.setClassConfig(target, CLASS_NAME_KEY, name)
}

/**
 * # 请使用 @Model
 * @deprecated
 */
export function ClassName(className: string): Function {
  return Model(className)
}

/**
 * # 获取类的可读名称
 * @param target 目标类
 */
export function getModelName(target: any): string {
  return AirDecorator.getClassConfig(target, CLASS_NAME_KEY)
}

/**
 * # 请使用 getModelName()
 * @deprecated
 */
export function getClassName(target: any): string {
  return getModelName(target)
}

/**
 * # 属性名Key
 */
const FIELD_NAME_KEY = 'FieldName'

/**
 * # 为属性标记可读名称
 * @param name 属性的可读名称
 */
export function Field(name: string): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_NAME_KEY, name)
}

/**
 * # 请使用 @Field
 * @deprecated
 */
export function FieldName(fieldName: string): Function {
  return Field(fieldName)
}

/**
 * # 获取属性可读名称
 * @param target 目标对象
 * @param key 属性名
 */
export function getFieldName(target: any, key: string): string {
  return AirDecorator.getFieldConfig(target, key, FIELD_NAME_KEY) || key
}

/**
 * # 忽略字段前缀Key
 */
const FIELD_IGNORE_KEY = 'IgnorePrefix'

/**
 * # 标记属性忽略类的别名前缀
 */
export function NoPrefix(): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_IGNORE_KEY, true)
}

/**
 * # 请使用 @NoPrefix
 * @deprecated
 */
export function IgnorePrefix(): Function {
  return NoPrefix()
}

/**
 * # 获取属性是否忽略别名前缀
 * @param target 目标类
 * @param key 属性名称
 */
export function getNoPrefix(target: any, key: string): boolean {
  return AirDecorator.getFieldConfig(target, key, FIELD_IGNORE_KEY) || false
}

/**
 * # 请使用 getNoPrefix()
 * @deprecated
 */
export function getIgnorePrefix(target: any, key: string): boolean {
  return getNoPrefix(target, key)
}

/**
 * # 字段前缀Key
 */
const FIELD_PREFIX_KEY = 'FieldPrefix'

/**
 * # 标记属性别名前缀
 * @param prefix 类的属性别名前缀
 */
export function FieldPrefix(prefix: string) {
  return (target: any) => AirDecorator.setClassConfig(target, FIELD_PREFIX_KEY, prefix)
}

/**
 * # 获取属性别名前缀
 * @param target 目标类
 */
export function getFieldPrefix(target: any): string {
  return AirDecorator.getClassConfig(target, FIELD_PREFIX_KEY) || ''
}

/**
 * # 别名Key
 */
const ALIAS_KEY = 'Alias'

/**
 * # 为标记属性的转换别名
 * @param alias 属性的转换别名
 */
export function Alias(alias: string) {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, ALIAS_KEY, getFieldPrefix(target) + alias)
}

/**
 * # 获取对象的属性转换别名
 * @param target 目标对象
 * @param key 属性名
 */
export function getAlias(target: any, key: string): string {
  return AirDecorator.getFieldConfig(target, key, ALIAS_KEY) || ''
}
