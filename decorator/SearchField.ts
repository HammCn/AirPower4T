/**
 * # 搜索字段的注解
 * @author Hamm.cn
 */
import { ISearchFieldConfig } from '../interface/decorators/ISearchFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirDecorator } from '../helper/AirDecorator'
import { AirDecoratorTarget } from '../type/AirType'
import { getFieldConfig } from './Field'

/**
 * ## 搜索字段 `key`
 */
const FIELD_CONFIG_KEY = 'Search'

/**
 * ## 搜索字段列表 `key`
 */
const FIELD_LIST_KEY = 'SearchList'

/**
 * ## 标记该字段可用于搜索
 * @param config 搜索配置项
 */
export function Search(config: ISearchFieldConfig = {}) {
  config.dictionary = AirDecorator.getDictionary(config.dictionary)
  return (target: AirDecoratorTarget, key: string) => {
    config.key = key
    return AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, config, FIELD_LIST_KEY)
  }
}

/**
 * ## 获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getSearchConfig(target: AirDecoratorTarget, key: string): AirSearchFieldConfig | null {
  const formConfig = AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
  if (!formConfig.dictionary) {
    const props = getFieldConfig(target, key)
    formConfig.dictionary = AirDecorator.getDictionary(props.dictionary)
  }
  return formConfig
}

/**
 * ## 获取标记了搜索配置的字段列表
 * @param target 目标对象
 */
export function getSearchFieldList(target: AirDecoratorTarget): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ## 获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getSearchConfigList(target: AirDecoratorTarget, keyList: string[]): AirSearchFieldConfig[] {
  return AirDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, AirSearchFieldConfig)
    .sort((a, b) => b.orderNumber - a.orderNumber)
    .map((item) => {
      const props = getFieldConfig(target, item.key)
      item.label = item.label || props.label || item.key
      if (!item.dictionary) {
        item.dictionary = AirDecorator.getDictionary(props.dictionary)
      }
      return item
    })
}
