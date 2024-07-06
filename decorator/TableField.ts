/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * # 表格字段的注解
 * @author Hamm.cn
 */
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirDecorator } from '../helper/AirDecorator'
import { IJson } from '../interface/IJson'
import { ITableFieldConfig } from '../interface/decorators/ITableFieldConfig'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { getFieldName } from './Custom'

/**
 * ## 表格字段key
 */
const FIELD_CONFIG_KEY = 'Table'

/**
 * ## 表格字段列表key
 */
const FIELD_LIST_KEY = 'TableList'

/**
 * ## 为属性标记是表格字段
 * @param config (可选)表格列的配置
 */
export function Table(config: ITableFieldConfig = {}) {
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
 * ## 获取对象的属性表格的配置
 * @param target 目标对象
 * @param key 属性名
 */
export function getTableConfig(target: any, key: string): AirTableFieldConfig | null {
  return AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
}

/**
 * ## 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList(target: any): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ## 获取字段标记的表格字段配置列表
 * @param target 目标实体类
 * @param keyList 字段列表
 */
export function getTableConfigList(target: any, keyList: string[]) {
  return AirDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, AirTableFieldConfig)
    .sort((a, b) => b.orderNumber - a.orderNumber)
    .map((item) => {
      item.label = item.label || getFieldName(target, item.key)
      return item
    })
}
