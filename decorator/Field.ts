import type { AirModel } from '../base/AirModel'
import type { IFieldConfig } from '../interface/decorators/IFieldConfig'
import type { IJson } from '../interface/IJson'
import type { AirAny, AirDecoratorTarget } from '../type/AirType'
import { AirDecorator } from '../helper/AirDecorator'

/**
 * ### 属性参数配置
 */
const FIELD_CONFIG_KEY = 'Field'

/**
 * ### 为属性标记配置
 * @param config 配置项
 */
export function Field(config: IFieldConfig = {}) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, config)
}

/**
 * ### 获取属性的配置
 * @returns 配置对象
 * @param target 目标类
 * @param key 属性名
 */
export function getFieldConfig(target: AirDecoratorTarget, key: string): IFieldConfig {
  return (AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true) || {}) as IFieldConfig
}

/**
 * ### 自定义到 `JSON` 转换 `Key`
 */
const TO_JSON_KEY = 'ToJson'

/**
 * ### 自定义转换到 `JSON` 的方法
 * @param func 方法
 */

export function ToJson<M extends AirModel>(func: (model: M) => AirAny) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, TO_JSON_KEY, func)
}

/**
 * ### 获取自定义转换到 `JSON` 的方法
 * @param target 目标类
 * @param key 属性名
 */

export function getToJson<M extends AirModel>(target: AirDecoratorTarget, key: string): (model: M) => AirAny {
  return AirDecorator.getFieldConfig(target, key, TO_JSON_KEY)
}

/**
 * ### 自定义到模型转换 `Key`
 */
const TO_MODEL_KEY = 'ToModel'

/**
 * ### 自定义转换到 `Model` 的方法
 * @param func 方法
 */

export function ToModel(func: (json: IJson) => AirAny) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, TO_MODEL_KEY, func)
}

/**
 * ### 获取自定义转换到 `Model` 的方法
 * @param target 目标类
 * @param key 属性名
 */

export function getToModel(target: AirDecoratorTarget, key: string): (json: IJson) => AirAny {
  return AirDecorator.getFieldConfig(target, key, TO_MODEL_KEY)
}
