/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 自定义类和属性名注解
 * @author Hamm
 */

import { AirModel } from '../base/AirModel'
import { IRecord } from '../interface/IRecord'
import { ClassConstructor } from '../type/ClassConstructor'

const ENUM_RECORD_PREFIX = '__enum_record__'

/**
 * 标记属性的枚举字典
 * @param clazz 类型
 */
export function EnumRecord(record: IRecord[]) {
  return (target: any, key: string) => {
    Object.defineProperty(target, ENUM_RECORD_PREFIX + key, {
      enumerable: false,
      value: record,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * 获取类的属性枚举字典
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getEnumRecord(target: any, fieldKey: string): IRecord[] | null {
  return target[ENUM_RECORD_PREFIX + fieldKey] || null
}

const TYPE_PREFIX = '__class__'

/**
 * 标记属性的类型进行强制转换
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
 * 获取类的属性可读名称
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getType(target: any, fieldKey: string): ClassConstructor<unknown> | null {
  return target[TYPE_PREFIX + fieldKey] || null
}

const TO_JSON_FUNCTION = '__to_json_function__'

/**
 * 自定义转换到JSON的方法
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
 * 获取自定义转换到JSON的方法
 * @param target 目标类
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getToJson(target: any, fieldKey: string): Function | null {
  return target[TO_JSON_FUNCTION + fieldKey] || null
}

const TO_MODEL_FUNCTION = '__to_model_function__'

/**
 * 自定义转换到MODEL的方法
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
 * 获取自定义转换到MODEL的方法
 * @param target 目标类
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getToModel(target: any, fieldKey: string): Function | null {
  return target[TO_MODEL_FUNCTION + fieldKey] || null
}

const DEFAULT_VALUE_PREFIX = '__default__'

/**
 * 标记属性的默认值
 * @param value 默认值
 */
export function Default(value: any) {
  return (target: any, key: string) => {
    Object.defineProperty(target, DEFAULT_VALUE_PREFIX + key, {
      enumerable: false,
      value,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * 获取类的属性默认值
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getDefault(target: any, fieldKey: string): any {
  return target[DEFAULT_VALUE_PREFIX + fieldKey] || undefined
}

const IS_ARRAY_PREFIX = '__array__'

/**
 * 标记属性的类型是数组
 * @param clazz 类型
 */
export function IsArray() {
  return (target: any, key: string) => {
    Object.defineProperty(target, IS_ARRAY_PREFIX + key, {
      enumerable: false,
      value: true,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * 获取类的属性是否数组
 * @param target 目标类
 * @param fieldKey 属性名
 */
export function getIsArray(target: any, fieldKey: string): boolean {
  return !!target[IS_ARRAY_PREFIX + fieldKey] || false
}

const CLASS_NAME_PREFIX = '__class__name__'

/**
 * 为类标记一个可读名称
 * @param className 类的可读名称
 */
export function ClassName(className: string) {
  return (target: any) => {
    Object.defineProperty(target.prototype, CLASS_NAME_PREFIX, {
      enumerable: false,
      value: className,
      writable: false,
      configurable: false,
    })
    return target
  }
}

/**
 * 获取类的属性可读名称
 * @param target 目标类
 */
export function getClassName(target: any): string {
  return target[CLASS_NAME_PREFIX] || target.name
}

const FIELD_NAME_PREFIX = '__field_name_'

/**
 * 为属性标记一个可读名称
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
 * 获取对象的属性可读名称
 * @param target 目标对象
 * @param fieldKey 属性名
 */
export function getFieldName(target: any, fieldKey: string): string {
  let fieldName = target[FIELD_NAME_PREFIX + fieldKey]
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === AirModel.name) {
    return fieldKey
  }
  fieldName = getFieldName(superClass, fieldKey)
  return fieldName
}

const CLASS_FIELD_ALIAS_PREFIX = '__class_field_alias_prefix__'

/**
 * 为类标记一个属性别名前缀
 * @param className 类的属性别名前缀
 */
export function FieldPrefix(prefix: string) {
  return (target: any) => {
    Object.defineProperty(target.prototype, CLASS_FIELD_ALIAS_PREFIX, {
      enumerable: false,
      value: prefix,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * 获取类的属性别名前缀
 * @param target 目标类
 */
export function getFieldPrefix(target: any): string {
  return target[CLASS_FIELD_ALIAS_PREFIX] || ''
}

const ALIAS_PREFIX = '__alias_'

/**
 * 为属性标记一个转换别名
 * @param fieldName 属性的转换别名
 */
export function Alias(fieldName: string) {
  return (target: any, key: string) => {
    Object.defineProperty(target, ALIAS_PREFIX + key, {
      enumerable: false,
      value: getFieldPrefix(target) + fieldName,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * 获取对象的属性转换别名
 * @param target 目标对象
 * @param fieldKey 属性名
 */
export function getAlias(target: any, fieldKey: string): string {
  let fieldName = target[ALIAS_PREFIX + fieldKey]
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === AirModel.name) {
    return fieldKey
  }
  fieldName = getAlias(superClass, fieldKey)
  return fieldName
}
