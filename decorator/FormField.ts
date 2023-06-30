/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 表单字段的注解
 * @author Hamm
 */
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { IJson } from '../interface/IJson'
import { getFieldName } from './Custom'

/**
 * # 表单字段key
 */
const FIELD_CONFIG_KEY = '__form_field_'

/**
 * # 表单字段列表key
 */
const FIELD_CONFIG_LIST_KEY = '__form_field_list__'

/**
 * # 标记该字段可用于表单配置
 * @param fieldConfig [可选]配置项
 */
export const FormField = (fieldConfig?: IFormFieldConfig) => (target: any, key: string) => {
  if (!fieldConfig) {
    fieldConfig = new AirFormFieldConfig()
  }
  fieldConfig.key = key
  const list: string[] = target[FIELD_CONFIG_LIST_KEY] || []
  list.push(key)

  Object.defineProperty(target, FIELD_CONFIG_LIST_KEY, {
    enumerable: false,
    value: list,
    writable: false,
    configurable: false,
  })
  Object.defineProperty(target, `${FIELD_CONFIG_KEY + key}`, {
    enumerable: false,
    value: fieldConfig,
    writable: false,
    configurable: false,
  })
}

/**
 * # 递归获取配置项的值
 * @param target 目标类
 * @param fieldKey 字段
 * @param configKey 配置key
 */
function getFieldConfigValue(target: any, fieldKey: string, configKey: string) {
  const fieldConfig = target[FIELD_CONFIG_KEY + fieldKey]
  if (fieldConfig && fieldConfig[configKey] !== undefined) {
    return fieldConfig[configKey]
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getFieldConfigValue(superClass, fieldKey, configKey)
}

/**
 * # 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormConfig(target: any, fieldKey: string): AirFormFieldConfig | null {
  let fieldConfig = target[FIELD_CONFIG_KEY + fieldKey]

  if (fieldConfig === undefined) {
    // 没有查询到配置
    const superClass = Object.getPrototypeOf(target)
    if (superClass.name === 'AirModel') {
      return null
    }
    fieldConfig = getFormConfig(superClass, fieldKey)
  }
  if (!fieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }
  if (!fieldConfig.label || fieldConfig.label === fieldConfig.key) {
    fieldConfig.label = getFieldName(target, fieldKey)
  }

  Object.keys(new AirFormFieldConfig()).forEach((key) => {
    fieldConfig[key] = getFieldConfigValue(target, fieldKey, key)
  })
  return Object.assign(new AirFormFieldConfig(), fieldConfig)
}

/**
 * # 获取标记了表单配置的字段列表
 * @param target 目标对象
 */
export function getFormFieldList(target: any): string[] {
  let list: string[] = target[FIELD_CONFIG_LIST_KEY] || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== 'AirModel') {
    list = list.concat(getFormFieldList(superClass))
  }
  return list
}

/**
 * # 获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param fieldNameList 选择字段列表
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFormConfigList(target: any, fieldNameList: string[]) {
  if (fieldNameList.length === 0) {
    fieldNameList = getFormFieldList(target)
  }
  const keyList = []
  const fieldConfigList: AirFormFieldConfig[] = []
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) < 0) {
      const config = getFormConfig(target, fieldName)
      if (config) {
        keyList.push(config.key)
        const defaultConfig = new AirFormFieldConfig()
        const result: IJson = {}
        Object.keys({ ...defaultConfig, ...config }).forEach((key) => {
          result[key] = (config as IJson)[key] || (defaultConfig as IJson)[key]
        })
        fieldConfigList.push(result as AirFormFieldConfig)
      }
    }
  }
  return fieldConfigList.sort((a, b) => b.orderNumber - a.orderNumber)
}
