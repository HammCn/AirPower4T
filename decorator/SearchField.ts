/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 搜索字段的注解
 * @author Hamm
 */
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirModel } from '../base/AirModel'
import { getFieldName } from './Custom'

/**
 *  # 搜索字段key
 */
const searchFieldMetaKey = '__search_field_'

/**
 * # 搜索字段列表key
 */
const searchFieldListMetaKey = '__search_field_list__'

/**
 * # 标记该字段可用于搜索
 * @param searchFieldConfig [可选]搜索配置项
 */
export const SearchField = (searchFieldConfig?: ISearchFieldConfig) => (target: any, key: string) => {
  if (!searchFieldConfig) {
    searchFieldConfig = new AirSearchFieldConfig()
  }
  searchFieldConfig.key = key
  const list: string[] = target[searchFieldListMetaKey] || []
  list.push(key)

  Object.defineProperty(target, searchFieldListMetaKey, {
    enumerable: false,
    value: list,
    writable: false,
    configurable: false,
  })
  Object.defineProperty(target, `${searchFieldMetaKey + key}`, {
    enumerable: false,
    value: searchFieldConfig,
    writable: false,
    configurable: false,
  })
}

/**
 * # 获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param fieldKey 属性名
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSearchFieldConfig(target: any, fieldKey: string): AirSearchFieldConfig | null {
  let searchFieldConfig = target[searchFieldMetaKey + fieldKey]
  if (searchFieldConfig === undefined) {
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === AirModel.name) {
      return null
    }
    searchFieldConfig = getSearchFieldConfig(superClass, fieldKey)
  }
  if (!searchFieldConfig) {
    // 一直遍历到AirModel都没找到
    return null
  }
  if (!searchFieldConfig.label || searchFieldConfig.label === searchFieldConfig.key) {
    searchFieldConfig.label = getFieldName(target, fieldKey)
  }
  return Object.assign(new AirSearchFieldConfig(), searchFieldConfig)
}
/**
 * # 获取标记了搜索配置的字段列表
 * @param target 目标对象
 */
export function getCustomSearchFieldNameList(target: any): string[] {
  let list: string[] = target[searchFieldListMetaKey] || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== AirModel.name) {
    list = list.concat(getCustomSearchFieldNameList(superClass))
  }
  return list
}
/**
 * # 获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param fieldNameList 选择字段列表
 */
export function getCustomSearchFieldList(target: any, fieldNameList: string[]) {
  const searchFieldConfigList: AirSearchFieldConfig[] = []
  const keyList = []
  if (fieldNameList.length === 0) {
    fieldNameList = getCustomSearchFieldNameList(target)
  }
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) < 0) {
      const config = getSearchFieldConfig(target, fieldName)
      if (config) {
        keyList.push(config.key)
        searchFieldConfigList.push(config)
      }
    }
  }
  return searchFieldConfigList
}
