/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 自定义类和属性名注解
 * @author Hamm
 */
import { AirModel } from '../model/AirModel'

/**
 * # 自定义类名元数据key
 */
const customClassNameMetaKey = Symbol('customClassName')

/**
 * # 自定义属性名元数据key
 */
const customFieldNameMetaKey = Symbol('customFieldName')

/**
 * # 自定义描述元数据key
 */
const customFieldDescription = Symbol('customFieldDescription')

/**
 * # 为属性标记一个描述
 * @param description 属性的描述
 */
export function Description(description: string) {
  return (target: any, key: string) => {
    Reflect.defineMetadata(customFieldDescription, description, target, key)
  }
}

/**
  * # 获取对象的属性描述信息
  * @param target 目标对象
  * @param fieldKey 属性名
  */
export function getDescription<E extends AirModel>(target: E, fieldKey: string): string {
  let fieldName = Reflect.getOwnMetadata(customFieldDescription, target, fieldKey)
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === AirModel.name) {
    return ''
  }
  fieldName = getDescription(superClass, fieldKey)
  return fieldName
}

/**
 * # 为类标记一个可读名称
 * @param className 类的可读名称
 */
export function ClassName(className: string) {
  return (target: any) => {
    Reflect.defineMetadata(customClassNameMetaKey, className, target)
  }
}

/**
 * # 获取类的属性可读名称
 * @param target 目标类
 */
export function getClassName(target: any): string {
  return Reflect.getOwnMetadata(customClassNameMetaKey, target) || target.name
}

/**
 * # 为属性标记一个可读名称
 * @param fieldName 属性的可读名称
 */
export function FieldName(fieldName: string) {
  return (target: any, key: string) => {
    Reflect.defineMetadata(customFieldNameMetaKey, fieldName, target, key)
  }
}

/**
 * # 获取对象的属性可读名称
 * @param target 目标对象
 * @param fieldKey 属性名
 */
export function getFieldName<E extends AirModel>(target: E, fieldKey: string): string {
  let fieldName = Reflect.getOwnMetadata(customFieldNameMetaKey, target, fieldKey)
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
