/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * # 表单字段的注解
 * @author Hamm
 */
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirDecorator } from '../helper/AirDecorator'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { getFieldName } from './Custom'

/**
 * # 表单字段key
 */
const FIELD_CONFIG_KEY = 'Form'

/**
 * # 表单字段列表key
 */
const FIELD_LIST_KEY = 'FormList'

/**
 * # 标记该字段可用于表单配置
 * @param fieldConfig (可选)配置项
 */
export function FormField(fieldConfig: IFormFieldConfig = {}): Function {
  return (target: any, key: string) => {
    fieldConfig.key = key
    return AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, fieldConfig, FIELD_LIST_KEY)
  }
}

/**
 * # 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getFormConfig(target: any, key: string): AirFormFieldConfig | null {
  return AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
}

/**
 * # 获取标记了表单配置的字段列表
 * @param target 目标对象
 */
export function getFormFieldList(target: any): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * # 获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getFormConfigList(target: any, keyList: string[]) {
  return AirDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, AirFormFieldConfig).sort((a, b) => b.orderNumber - a.orderNumber).map((item) => {
    item.label = item.label || getFieldName(target, item.key)
    return item
  })
}
