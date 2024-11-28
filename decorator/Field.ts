import { AirModel } from '../base/AirModel'
import { AirDecorator } from '../helper/AirDecorator'
import { IFieldConfig } from '../interface/decorators/IFieldConfig'
import { IJson } from '../interface/IJson'
import { AirDecoratorTarget } from '../type/AirType'

/**
 * ## 属性参数配置
 */
const FIELD_CONFIG_KEY = 'Field'

/**
 * ## 为属性标记配置
 * @param config 配置项
 */
export function Field<P extends IFieldConfig = IFieldConfig>(config: P = {} as P) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, config)
}

/**
 * ## 获取属性的配置
 * @returns 配置对象
 * @param target 目标类
 * @param key 属性名
 */
export function getFieldConfig<P extends IFieldConfig = IFieldConfig>(target: AirDecoratorTarget, key: string): P {
  return (AirDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true) || {}) as P
}

/**
 * ## 自定义到 `JSON` 转换 `Key`
 */
const TO_JSON_KEY = 'ToJson'

/**
 * ## 自定义转换到 `JSON` 的方法
 * @param func 方法
 */
// eslint-disable-next-line no-unused-vars
export function ToJson<M extends AirModel>(func: (model: M) => IJson) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, TO_JSON_KEY, func)
}

/**
 * ## 获取自定义转换到 `JSON` 的方法
 * @param target 目标类
 * @param key 属性名
 */
// eslint-disable-next-line no-unused-vars
export function getToJson<M extends AirModel>(target: AirDecoratorTarget, key: string): (model: M) => IJson | undefined {
  return AirDecorator.getFieldConfig(target, key, TO_JSON_KEY)
}

/**
 * ## 自定义到模型转换 `Key`
 */
const TO_MODEL_KEY = 'ToModel'

/**
 * ## 自定义转换到 `Model` 的方法
 * @param func 方法
 */
// eslint-disable-next-line no-unused-vars
export function ToModel<M extends AirModel>(func: (json: IJson) => M) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, TO_MODEL_KEY, func)
}

/**
 * ## 获取自定义转换到 `Model` 的方法
 * @param target 目标类
 * @param key 属性名
 */
// eslint-disable-next-line no-unused-vars
export function getToModel<M extends AirModel>(target: AirDecoratorTarget, key: string): (json: IJson) => M | undefined {
  return AirDecorator.getFieldConfig(target, key, TO_MODEL_KEY)
}
