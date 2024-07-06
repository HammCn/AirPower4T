/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * # 搜索字段的注解
 * @author Hamm.cn
 */
import { ISearchFieldConfig } from '../interface/decorators/ISearchFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { getFieldName } from './Custom'
import { AirDecorator } from '../helper/AirDecorator'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { IJson } from '../interface/IJson'

/**
 * ## 搜索字段key
 */
const FIELD_CONFIG_KEY = 'Search'

/**
 * ## 搜索字段列表key
 */
const FIELD_LIST_KEY = 'SearchList'

/**
 * ## 标记该字段可用于搜索
 * @param config (可选)搜索配置项
 */
export function Search(config: ISearchFieldConfig = {}) {
  if (config && config.dictionary && !(config.dictionary instanceof AirDictionaryArray)) {
    // 如果不是字典 转为字典
    config.dictionary = AirDictionaryArray.create((config.dictionary as IJson).toDictionary())
  }
  return (target: any, key: string) => {
    config.key = key
    return AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, config, FIELD_LIST_KEY)
  }
}

/**
 * ## 获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getSearchConfig(target: any, key: string): AirSearchFieldConfig | null {
  return AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
}

/**
 * ## 获取标记了搜索配置的字段列表
 * @param target 目标对象
 */
export function getSearchFieldList(target: any): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ## 获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getSearchConfigList(target: any, keyList: string[]) {
  return AirDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, AirSearchFieldConfig)
    .sort((a, b) => b.orderNumber - a.orderNumber)
    .map((item) => {
      item.label = item.label || getFieldName(target, item.key)
      return item
    })
}
