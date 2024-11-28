/**
 * # 表单字段的注解
 * @author Hamm.cn
 */
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirDecorator } from '../helper/AirDecorator'
import { IFormFieldConfig } from '../interface/decorators/IFormFieldConfig'
import { AirDecoratorTarget } from '../type/AirType'
import { getFieldConfig } from './Field'

/**
 * ## 表单字段 `key`
 */
const FIELD_CONFIG_KEY = 'Form'

/**
 * ## 表单字段列表 `key`
 */
const FIELD_LIST_KEY = 'FormList'

/**
 * ## 标记该字段可用于表单配置
 * @param config 配置项
 */
export function Form(config: IFormFieldConfig = {}) {
  config.dictionary = AirDecorator.getDictionary(config.dictionary)
  return (target: AirDecoratorTarget, key: string) => {
    config.key = key
    return AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, config, FIELD_LIST_KEY)
  }
}

/**
 * ## 获取对象某个字段标记的表单配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getFormConfig(target: AirDecoratorTarget, key: string): AirFormFieldConfig | null {
  const formConfig = AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true)
  if (!formConfig.dictionary) {
    const props = getFieldConfig(target, key)
    formConfig.dictionary = AirDecorator.getDictionary(props.dictionary)
  }
  return formConfig
}

/**
 * ## 获取标记了表单配置的字段列表
 * @param target 目标对象
 */
export function getFormFieldList(target: AirDecoratorTarget): string[] {
  return AirDecorator.getFieldList(target, FIELD_LIST_KEY)
}

/**
 * ## 获取指定类的表单字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getFormConfigList(target: AirDecoratorTarget, keyList: string[]): AirFormFieldConfig[] {
  return AirDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, AirFormFieldConfig)
    .filter((item) => !item.hide)
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
