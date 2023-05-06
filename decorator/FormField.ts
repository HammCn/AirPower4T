/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 表单字段的注解
 * @author Hamm
 */
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { AirModel } from '../model/AirModel'
import { getFieldName } from './CustomName'

/**
 * # 表单字段key
 */
const formFieldMetaKey = Symbol('formFieldConfig')

/**
 * # 表单字段列表key
 */
const formFieldListMetaKey = Symbol('formFieldConfigList')

/**
 * # 标记该字段可用于表单配置
 * @param formFieldConfig [可选]配置项
 */
export const FormField = <E extends AirModel>(formFieldConfig?: IFormFieldConfig) => (target: E, key: string) => {
  if (!formFieldConfig) {
    formFieldConfig = new AirFormFieldConfig()
  }
  formFieldConfig.key = key
  const list = Reflect.getOwnMetadata(formFieldListMetaKey, target) || []
  list.push(key)
  Reflect.defineMetadata(formFieldListMetaKey, list, target)
  Reflect.defineMetadata(formFieldMetaKey, formFieldConfig, target, key)
}

/**
 * # 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormFieldConfig(target: any, fieldKey: string): AirFormFieldConfig | null {
  let formFieldConfig = Reflect.getMetadata(formFieldMetaKey, target, fieldKey)

  if (formFieldConfig === undefined) {
    // 没有查询到配置
    const superClass = Object.getPrototypeOf(target)
    if (superClass.name === AirModel.name) {
      return null
    }
    formFieldConfig = getFormFieldConfig(superClass, fieldKey)
  }
  if (!formFieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }
  if (!formFieldConfig.label || formFieldConfig.label === formFieldConfig.key) {
    formFieldConfig.label = getFieldName(target, fieldKey)
  }
  return Object.assign(new AirFormFieldConfig(), formFieldConfig)
}

/**
 * # 获取标记了表单配置的字段列表
 * @param target 目标对象
 */
export function getCustomFormFieldNameList<E extends AirModel>(target: E): string[] {
  let list: string[] = Reflect.getOwnMetadata(formFieldListMetaKey, target) || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== AirModel.name) {
    list = list.concat(getCustomFormFieldNameList(superClass))
  }
  return list
}

/**
 * # 获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param fieldNameList 选择字段列表
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCustomFormFieldList(target: any, fieldNameList: string[]) {
  if (fieldNameList.length === 0) {
    fieldNameList = getCustomFormFieldNameList(target)
  }
  const keyList = []
  const list: AirFormFieldConfig[] = []
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) < 0) {
      const config = getFormFieldConfig(target, fieldName)
      if (config) {
        keyList.push(config.key)
        list.push(config)
      }
    }
  }
  return list
}
