/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 表格字段的注解
 * @author Hamm
 */
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirDecorator } from '../helper/AirDecorator'
import { ITableFieldConfig } from '../interface/ITableFieldConfig'
import { getFieldName } from './Custom'

/**
 * # 表格字段key
 */
const FIELD_CONFIG_KEY = 'Table'

/**
 * # 表格字段列表key
 */
const FIELD_LIST_KEY = 'TableList'

/**
 * # 为属性标记是表格字段
 * @param fieldConfig [可选]表格列的配置
 */
export function TableField(fieldConfig: ITableFieldConfig = {}): Function {
  return (target: any, key: string) => {
    fieldConfig.key = key
    return AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, fieldConfig, FIELD_LIST_KEY)
  }
}

/**
 * # 获取对象的属性表格的配置
 * @param target 目标对象
 * @param key 属性名
 */
export function getTableConfig(target: any, key: string): AirTableFieldConfig | null {
  return AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
}

/**
 * # 获取标记了表格配置的字段列表
 * @param target 目标对象
 */
export function getTableFieldList(target: any): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * # 获取字段标记的表格字段配置列表
 * @param keyList 字段列表
 */
export function getTableConfigList(target: any, keyList: string[]) {
  return AirDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, AirTableFieldConfig).sort((a, b) => b.orderNumber - a.orderNumber).map((item) => {
    item.label = item.label || getFieldName(target, item.key)
    return item
  })
}
