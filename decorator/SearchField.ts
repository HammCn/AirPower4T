/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 搜索字段的注解
 * @author Hamm
 */
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { getFieldName } from './Custom'
import { IJson } from '../interface/IJson'

/**
 *  # 搜索字段key
 */
const FIELD_CONFIG_KEY = '__search_field_'

/**
 * # 搜索字段列表key
 */
const FIELD_CONFIG_LIST_KEY = '__search_field_list__'

/**
 * # 标记该字段可用于搜索
 * @param fieldConfig [可选]搜索配置项
 */
export const SearchField = (fieldConfig?: ISearchFieldConfig) => (target: any, key: string) => {
  if (!fieldConfig) {
    fieldConfig = new AirSearchFieldConfig()
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
 * # 获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSearchConfig(target: any, fieldKey: string): AirSearchFieldConfig | null {
  let fieldConfig = target[FIELD_CONFIG_KEY + fieldKey]
  if (fieldConfig === undefined) {
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === 'AirModel') {
      return null
    }
    fieldConfig = getSearchConfig(superClass, fieldKey)
  }
  if (!fieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }
  if (!fieldConfig.label || fieldConfig.label === fieldConfig.key) {
    fieldConfig.label = getFieldName(target, fieldKey)
  }
  Object.keys(new AirSearchFieldConfig()).forEach((key) => {
    fieldConfig[key] = getFieldConfigValue(target, fieldKey, key)
  })

  return Object.assign(new AirSearchFieldConfig(), fieldConfig)
}
/**
 * # 获取标记了搜索配置的字段列表
 * @param target 目标对象
 */
export function getSearchFieldList(target: any): string[] {
  let list: string[] = target[FIELD_CONFIG_LIST_KEY] || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== 'AirModel') {
    list = list.concat(getSearchFieldList(superClass))
  }
  return list
}
/**
 * # 获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param fieldNameList 选择字段列表
 */
export function getSearchConfigList(target: any, fieldNameList: string[]) {
  const fieldConfigList: AirSearchFieldConfig[] = []
  const keyList = []
  if (fieldNameList.length === 0) {
    fieldNameList = getSearchFieldList(target)
  }
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) < 0) {
      const config = getSearchConfig(target, fieldName)
      if (config) {
        keyList.push(config.key)
        const defaultConfig = new AirSearchFieldConfig()
        const result: IJson = {}
        Object.keys({ ...defaultConfig, ...config }).forEach((key) => {
          result[key] = (config as IJson)[key] || (defaultConfig as IJson)[key]
        })
        fieldConfigList.push(result as AirSearchFieldConfig)
      }
    }
  }
  return fieldConfigList
}
