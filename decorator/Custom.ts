/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * # 自定义类和属性名注解
 * @author Hamm
 */
import { AirDecorator } from '../helper/AirDecorator'
import { IDictionary } from '../interface/IDictionary'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { ClassConstructor } from '../type/ClassConstructor'

const DICTIONARY_KEY = 'Dictionary'

/**
 * # 标记属性的枚举字典
 * @param clazz 类型
 */
export function Dictionary(dictionary: AirDictionaryArray<IDictionary>): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, DICTIONARY_KEY, dictionary)
}

/**
 * # 获取属性枚举字典
 * @param target 目标类
 * @param key 属性名
 */
export function getDictionary(target: any, key: string): AirDictionaryArray<IDictionary> | undefined {
  const config = AirDecorator.getFieldConfig(target, key, DICTIONARY_KEY)
  if (config) {
    return AirDictionaryArray.create(config)
  }
  return undefined
}

const TYPE_KEY = 'Type'

/**
 * # 标记属性强制转换类
 * @param clazz 类型
 */
export function Type(clazz: any): Function {
  return (target: any, key: string) => {
    Object.defineProperty(target, `${TYPE_KEY}[${key}]`, {
      enumerable: false,
      value: clazz,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取属性强制转换类
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getType(target: any, fieldKey: string): ClassConstructor<unknown> | undefined {
  return AirDecorator.getFieldConfig(target, fieldKey, TYPE_KEY) || undefined
}

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
 * @param fieldKey 属性名
 */
export function getToModel(target: any, fieldKey: string): Function | undefined {
  return AirDecorator.getFieldConfig(target, fieldKey, TO_MODEL_KEY)
}

const DEFAULT_KEY = 'Default'

/**
 * # 标记属性的默认值
 * ---
 * ### 💡 如标记了 ```@IsArray()``` 则默认值为 ```[]```, 但仍可以通过此装饰器覆盖
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

const IS_ARRAY_KEY = 'IsArray'

/**
 * # 标记属性是数组
 * @param clazz 类型
 */
export function IsArray(): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, IS_ARRAY_KEY, true)
}

/**
 * # 获取属性是否数组
 * @param target 目标类
 * @param key 属性名
 */
export function getIsArray(target: any, key: string): boolean {
  return AirDecorator.getFieldConfig(target, key, IS_ARRAY_KEY)
}

const CLASS_NAME_KEY = 'ClassName'

/**
 * # 为类标记可读名称
 * @param className 类的可读名称
 */
export function ClassName(className: string): Function {
  return (target: any) => AirDecorator.setClassConfig(target, CLASS_NAME_KEY, className)
}

/**
 * # 获取类的可读名称
 * @param target 目标类
 */
export function getClassName(target: any): string {
  return AirDecorator.getClassConfig(target, CLASS_NAME_KEY)
}

const FIELD_NAME_KEY = 'FieldName'

/**
 * # 为属性标记可读名称
 * @param fieldName 属性的可读名称
 */
export function FieldName(fieldName: string): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_NAME_KEY, fieldName)
}

/**
 * # 获取属性可读名称
 * @param target 目标对象
 * @param key 属性名
 */
export function getFieldName(target: any, key: string): string {
  return AirDecorator.getFieldConfig(target, key, FIELD_NAME_KEY) || key
}

const FIELD_IGNORE_KEY = 'IgnorePrefix'

/**
 * # 标记属性忽略类的别名前缀
 */
export function IgnorePrefix(): Function {
  return (target: any, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_IGNORE_KEY, true)
}

/**
 * # 获取属性是否忽略别名前缀
 * @param target 目标类
 * @param fieldKey 属性名称
 */
export function getIgnorePrefix(target: any, fieldKey: string): boolean {
  return AirDecorator.getFieldConfig(target, fieldKey, FIELD_IGNORE_KEY) || false
}

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
