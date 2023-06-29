/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * # 自定义类和属性名注解
 * @author Hamm
 */
import { IRecord } from '../interface/IRecord'
import { AirRecordArray } from '../model/extend/AirRecordArray'
import { ClassConstructor } from '../type/ClassConstructor'

const ENUM_RECORD_PREFIX = '__enum_record_'

/**
 * # 标记属性的枚举字典
 * @param clazz 类型
 */
export function EnumRecord(record: AirRecordArray<IRecord>) {
  return (target: any, key: string) => {
    Object.defineProperty(target, ENUM_RECORD_PREFIX + key, {
      enumerable: false,
      value: AirRecordArray.create(record),
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取属性枚举字典
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getEnumRecord(target: any, fieldKey: string): AirRecordArray<IRecord> | undefined {
  const config = target[ENUM_RECORD_PREFIX + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getEnumRecord(superClass, fieldKey)
}

const TYPE_PREFIX = '__class_'

/**
 * # 标记属性强制转换类
 * @param clazz 类型
 */
export function Type(clazz: any) {
  return (target: any, key: string) => {
    Object.defineProperty(target, TYPE_PREFIX + key, {
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
  const config = target[TYPE_PREFIX + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getType(superClass, fieldKey)
}

const TO_JSON_FUNCTION = '__to_json_function_'

/**
 * # 自定义转换到JSON的方法
 * @param func 方法
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function ToJson(func: Function) {
  return (target: any, key: string) => {
    Object.defineProperty(target, TO_JSON_FUNCTION + key, {
      enumerable: false,
      value: func,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取自定义转换到JSON的方法
 * @param target 目标类
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getToJson(target: any, fieldKey: string): Function | undefined {
  const config = target[TO_JSON_FUNCTION + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getToJson(superClass, fieldKey)
}

const TO_MODEL_FUNCTION = '__to_model_function_'

/**
 * # 自定义转换到Model的方法
 * @param func 方法
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function ToModel(func: Function) {
  return (target: any, key: string) => {
    Object.defineProperty(target, TO_MODEL_FUNCTION + key, {
      enumerable: false,
      value: func,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取自定义转换到Model的方法
 * @param target 目标类
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getToModel(target: any, fieldKey: string): Function | undefined {
  const config = target[TO_MODEL_FUNCTION + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getToModel(superClass, fieldKey)
}

const DEFAULT_VALUE_PREFIX = '__default_value_'

/**
 * # 设置默认值
 * @param target 目标类
 * @param key 目标属性
 * @param value 默认值
 */
function setDefaultValue(target: any, key: string, value: any) {
  Object.defineProperty(target, DEFAULT_VALUE_PREFIX + key, {
    enumerable: false,
    value,
    writable: false,
    configurable: true,
  })
}

/**
 * # 标记属性的默认值
 * ---
 * ### 💡 如标记了 ```@IsArray()``` 则默认值为 ```[]```, 但仍可以通过此装饰器覆盖
 *
 * @param value 默认值
 */
export function Default(value: any) {
  return (target: any, key: string) => {
    setDefaultValue(target, key, value)
  }
}

/**
 * # 获取类的属性默认值
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getDefault(target: any, fieldKey: string): any {
  const config = target[DEFAULT_VALUE_PREFIX + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getDefault(superClass, fieldKey)
}

const IS_ARRAY_PREFIX = '__is_array_'

/**
 * # 标记属性是数组
 * @param clazz 类型
 */
export function IsArray() {
  return (target: any, key: string) => {
    setDefaultValue(target, key, [])
    Object.defineProperty(target, IS_ARRAY_PREFIX + key, {
      enumerable: false,
      value: true,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取属性是否数组
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getIsArray(target: any, fieldKey: string): boolean {
  const config = target[IS_ARRAY_PREFIX + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return false
  }
  return getIsArray(superClass, fieldKey)
}

const CLASS_NAME_KEY = '__class_name__'

/**
 * # 为类标记可读名称
 * @param className 类的可读名称
 */
export function ClassName(className: string) {
  return (target: any) => {
    Object.defineProperty(target.prototype, CLASS_NAME_KEY, {
      enumerable: false,
      value: className,
      writable: false,
      configurable: false,
    })
    return target
  }
}

/**
 * # 获取类的可读名称
 * @param target 目标类
 */
export function getClassName(target: any): string {
  const className = target[CLASS_NAME_KEY]
  if (className) {
    return className
  }

  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return ''
  }
  return getClassName(superClass)
}

const FIELD_NAME_PREFIX = '__field_name_'

/**
 * # 为属性标记可读名称
 * @param fieldName 属性的可读名称
 */
export function FieldName(fieldName: string) {
  return (target: any, key: string) => {
    Object.defineProperty(target, FIELD_NAME_PREFIX + key, {
      enumerable: false,
      value: fieldName,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取属性可读名称
 * @param target 目标对象
 * @param fieldKey 属性名
 */
export function getFieldName(target: any, fieldKey: string): string {
  const fieldName = target[FIELD_NAME_PREFIX + fieldKey]
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return fieldKey
  }
  return getFieldName(superClass, fieldKey)
}

const FIELD_IGNORE_PREFIX = '__field_ignore_prefix_'

/**
 * # 标记属性忽略类的别名前缀
 */
export function IgnorePrefix() {
  return (target: any, key: string) => {
    Object.defineProperty(target, FIELD_IGNORE_PREFIX + key, {
      enumerable: false,
      value: true,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取属性是否忽略别名前缀
 * @param target 目标类
 * @param fieldKey 属性名称
 */
export function getIgnorePrefix(target: any, fieldKey: string): boolean {
  const config = target[FIELD_IGNORE_PREFIX + fieldKey]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return false
  }
  return getIgnorePrefix(superClass, fieldKey)
}

const CLASS_FIELD_ALIAS_PREFIX_KEY = '__class_field_alias_prefix__'

/**
 * # 标记属性别名前缀
 * @param prefix 类的属性别名前缀
 */
export function FieldPrefix(prefix: string) {
  return (target: any) => {
    Object.defineProperty(target.prototype, CLASS_FIELD_ALIAS_PREFIX_KEY, {
      enumerable: false,
      value: prefix,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取属性别名前缀
 * @param target 目标类
 */
export function getFieldPrefix(target: any): string {
  const config = target[CLASS_FIELD_ALIAS_PREFIX_KEY]
  if (config !== undefined) {
    return config
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return ''
  }
  return getFieldPrefix(superClass)
}

const ALIAS_PREFIX = '__alias_'

/**
 * # 为标记属性的转换别名
 * @param alias 属性的转换别名
 */
export function Alias(alias: string) {
  return (target: any, key: string) => {
    Object.defineProperty(target, ALIAS_PREFIX + key, {
      enumerable: false,
      value: getFieldPrefix(target) + alias,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取对象的属性转换别名
 * @param target 目标对象
 * @param fieldKey 属性名
 */
export function getAlias(target: any, fieldKey: string): string {
  const fieldName = target[ALIAS_PREFIX + fieldKey]
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return fieldKey
  }
  return getAlias(superClass, fieldKey)
}
