/**
 * # 自定义类和属性名注解
 * @author Hamm.cn
 */
import { AirEnum } from '../base/AirEnum'
import { AirModel } from '../base/AirModel'
import { AirConstant } from '../config/AirConstant'
import { AirDecorator } from '../helper/AirDecorator'
import { IJson } from '../interface/IJson'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { AirAny, AirDecoratorTarget } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * ## 字典配置 `Key`
 */
const DICTIONARY_KEY = 'Dictionary'

/**
 * ## 标记属性的枚举字典
 * 如直接传入枚举类，该属性的类型则必须为对应枚举类`Key`的类型
 * @param dictionary 字典数组或枚举类
 */
export function Dictionary(dictionary: AirDictionaryArray | ClassConstructor<AirEnum>) {
  return (target: AirDecoratorTarget, key: string) => {
    AirDecorator.setFieldConfig(target, key, DICTIONARY_KEY, AirDecorator.getDictionary(dictionary))
  }
}

/**
 * ## 获取属性枚举字典
 * @param target 目标类
 * @param key 属性名
 */
export function getDictionary(target: AirDecoratorTarget, key: string): AirDictionaryArray | undefined {
  const config = AirDecorator.getFieldConfig(target, key, DICTIONARY_KEY)
  if (config) {
    return AirDictionaryArray.create(config)
  }
  return undefined
}

/**
 * ## 强制类型配置Key
 */
const TYPE_KEY = 'Type'

/**
 * ## 标记为数组Key
 */
const IS_ARRAY_KEY = 'IsArray'

/**
 * ## 标记属性强制转换类
 * @param Clazz 类型
 * @param isArray `可选` 是否是数组
 */
export function Type(Clazz: ClassConstructor, isArray = false) {
  return (target: AirDecoratorTarget, key: string) => {
    AirDecorator.setFieldConfig(target, key, TYPE_KEY, Clazz)
    AirDecorator.setFieldConfig(target, key, IS_ARRAY_KEY, isArray)
  }
}

/**
 * ## 标记是数组
 * 可在此配置，但更建议在 `@Type` 中直接配置第二个参数
 */
export function List() {
  return (target: AirDecoratorTarget, key: string) => {
    AirDecorator.setFieldConfig(target, key, IS_ARRAY_KEY, true)
  }
}

/**
 * ## 获取属性强制转换类
 * @param target 目标类
 * @param key 属性名
 */
export function getType(target: AirDecoratorTarget, key: string): ClassConstructor<unknown> | undefined {
  return AirDecorator.getFieldConfig(target, key, TYPE_KEY) || undefined
}

/**
 * ## 获取属性是否数组
 * @param target 目标类
 * @param key 属性名
 */
export function getIsArray(target: AirDecoratorTarget, key: string): boolean {
  return AirDecorator.getFieldConfig(target, key, IS_ARRAY_KEY)
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

/**
 * ## 默认值 `Key`
 */
const DEFAULT_KEY = 'Default'

/**
 * ## 标记 `JSON` 转换到模型时属性的默认值
 * 如标记了 `@Type(?, true)` 则默认值为 `[]`, 但仍可以通过此装饰器覆盖
 *
 * @param value 默认值
 */
export function Default(value: unknown) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, DEFAULT_KEY, value)
}

/**
 * ## 获取类的属性默认值
 * @param target 目标类
 * @param key 属性名
 */
export function getDefault(target: AirDecoratorTarget, key: string): AirAny {
  return AirDecorator.getFieldConfig(target, key, DEFAULT_KEY)
}

/**
 * ## 类名称 `Key`
 */
const CLASS_NAME_KEY = 'ClassName'

/**
 * ## 为类标记可读名称
 * @param name 类的可读名称
 */
export function Model(name: string) {
  return (target: AirDecoratorTarget) => AirDecorator.setClassConfig(target, CLASS_NAME_KEY, name)
}

/**
 * ## 获取类的可读名称
 * @param target 目标类
 */
export function getModelName(target: AirDecoratorTarget): string {
  return AirDecorator.getClassConfig(target, CLASS_NAME_KEY)
}

/**
 * ## 属性名 `Key`
 */
const FIELD_NAME_KEY = 'FieldName'

/**
 * ## 为属性标记可读名称
 * @param name 属性的可读名称
 */
export function Field(name: string) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_NAME_KEY, name)
}

/**
 * ## 获取属性可读名称
 * @param target 目标对象
 * @param key 属性名
 */
export function getFieldName(target: AirDecoratorTarget, key: string): string {
  return AirDecorator.getFieldConfig(target, key, FIELD_NAME_KEY) || key
}

/**
 * ## 忽略字段前缀 `Key`
 */
const FIELD_IGNORE_KEY = 'IgnorePrefix'

/**
 * ## 标记属性忽略类的别名前缀
 */
export function NoPrefix() {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, FIELD_IGNORE_KEY, true)
}

/**
 * ## 获取属性是否忽略别名前缀
 * @param target 目标类
 * @param key 属性名称
 */
export function getNoPrefix(target: AirDecoratorTarget, key: string): boolean {
  return AirDecorator.getFieldConfig(target, key, FIELD_IGNORE_KEY) || false
}

/**
 * ## 字段前缀 `Key`
 */
const FIELD_PREFIX_KEY = 'FieldPrefix'

/**
 * ## 标记属性别名前缀
 * @param prefix 类的属性别名前缀
 */
export function FieldPrefix(prefix: string) {
  return (target: AirDecoratorTarget) => AirDecorator.setClassConfig(target, FIELD_PREFIX_KEY, prefix)
}

/**
 * ## 获取属性别名前缀
 * @param target 目标类
 */
export function getFieldPrefix(target: AirDecoratorTarget): string {
  return AirDecorator.getClassConfig(target, FIELD_PREFIX_KEY) || AirConstant.EMPTY_STRING
}

/**
 * ## 别名 `Key`
 */
const ALIAS_KEY = 'Alias'

/**
 * ## 为标记属性的转换别名
 * @param alias 属性的转换别名
 */
export function Alias(alias: string) {
  return (target: AirDecoratorTarget, key: string) => AirDecorator.setFieldConfig(target, key, ALIAS_KEY, getFieldPrefix(target) + alias)
}

/**
 * ## 获取对象的属性转换别名
 * @param target 目标对象
 * @param key 属性名
 */
export function getAlias(target: AirDecoratorTarget, key: string): string {
  return AirDecorator.getFieldConfig(target, key, ALIAS_KEY) || AirConstant.EMPTY_STRING
}
