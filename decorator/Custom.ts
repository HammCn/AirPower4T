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
export function Type<T extends AirModel>(clazz: ClassConstructor<T>) {
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
    Object.defineProperty(target, CLASS_NAME_PREFIX, {
      enumerable: false,
      value: className,
      writable: false,
      configurable: false,
    })
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

const ALIAS_PREFIX = '__alias_'

/**
 * 为属性标记一个转换别名
 * @param fieldName 属性的转换别名
 */
export function Alias(fieldName: string) {
  return (target: any, key: string) => {
    Object.defineProperty(target, ALIAS_PREFIX + key, {
      enumerable: false,
      value: fieldName,
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
    return ''
  }
  fieldName = getAlias(superClass, fieldKey)
  return fieldName
}
