/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 表单字段的注解
 * @author Hamm
 */
import { AirModel } from '../base/AirModel'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { getFieldName } from './Custom'

/**
 * # 表单字段key
 */
const formFieldMetaKey = '__form_field_'

/**
 * # 表单字段列表key
 */
const formFieldListMetaKey = '__form_field_list__'

/**
 * # 标记该字段可用于表单配置
 * @param formFieldConfig [可选]配置项
 */
export const FormField = (formFieldConfig?: IFormFieldConfig) => (target: any, key: string) => {
  if (!formFieldConfig) {
    formFieldConfig = new AirFormFieldConfig()
  }
  formFieldConfig.key = key
  const list: string[] = target[formFieldListMetaKey] || []
  list.push(key)

  Object.defineProperty(target, formFieldListMetaKey, {
    enumerable: false,
    value: list,
    writable: false,
    configurable: false,
  })
  Object.defineProperty(target, `${formFieldMetaKey + key}`, {
    enumerable: false,
    value: formFieldConfig,
    writable: false,
    configurable: false,
  })
}

/**
 * # 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormFieldConfig(target: any, fieldKey: string): AirFormFieldConfig | null {
  let formFieldConfig = target[formFieldMetaKey + fieldKey]

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
export function getCustomFormFieldNameList(target: any): string[] {
  let list: string[] = target[formFieldListMetaKey] || []
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