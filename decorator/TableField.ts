/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 表格字段的注解
 * @author Hamm
 */
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { IJson } from '../interface/IJson'
import { ITableFieldConfig } from '../interface/ITableFieldConfig'
import { getFieldName } from './Custom'

/**
 * # 表格字段key
 */
const FIELD_CONFIG_KEY = '__table_field_'

/**
 * # 表格字段列表key
 */
const FIELD_CONFIG_LIST_KEY = '__table_field_list__'

/**
 * # 为属性标记是表格字段
 * @param fieldConfig [可选]表格列的配置
 */
export const TableField = (fieldConfig?: ITableFieldConfig) => (target: any, key: string) => {
  if (!fieldConfig) {
    fieldConfig = {}
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
 * # 获取对象的属性表格的配置
 * @param target 目标对象
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTableConfig(target: any, fieldKey: string): AirTableFieldConfig | null {
  let fieldConfig = target[FIELD_CONFIG_KEY + fieldKey]
  if (!fieldConfig) {
    // 没有查询到配置
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === 'AirModel') {
      return null
    }
    fieldConfig = getTableConfig(superClass, fieldKey)
  }
  if (!fieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }
  if (!fieldConfig.label || fieldConfig.label === fieldConfig.key) {
    fieldConfig.label = getFieldName(target, fieldKey)
  }
  Object.keys(new AirTableFieldConfig()).forEach((key) => {
    fieldConfig[key] = getFieldConfigValue(target, fieldKey, key)
  })

  return fieldConfig
}

/**
 * # 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList(target: any): string[] {
  let list: string[] = target[FIELD_CONFIG_LIST_KEY] || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== 'AirModel') {
    list = list.concat(getTableFieldList(superClass))
  }
  return list
}

/**
 * # 获取字段标记的表格字段配置列表
 * @param fieldNameList 字段列表
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTableConfigList(target: any, fieldNameList: string[]) {
  const fieldConfigList: AirTableFieldConfig[] = []
  const keyList = []
  if (fieldNameList.length === 0) {
    fieldNameList = getTableFieldList(target)
  }
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) < 0) {
      const config = getTableConfig(target, fieldName)
      if (config) {
        keyList.push(config.key)
        const defaultConfig = new AirTableFieldConfig()
        const result: IJson = {}
        Object.keys({ ...defaultConfig, ...config }).forEach((key) => {
          result[key] = (config as IJson)[key] || (defaultConfig as IJson)[key]
        })
        fieldConfigList.push(result as AirTableFieldConfig)
      }
    }
  }
  return fieldConfigList.sort((a, b) => b.orderNumber - a.orderNumber)
}
