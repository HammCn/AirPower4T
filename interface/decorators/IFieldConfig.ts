import { AirEnum } from '../../base/AirEnum'
import { AirAny, ClassConstructor } from '../../type/AirType'
import { AirDictionaryArray } from '../../model/extend/AirDictionaryArray'
import { IField } from './IField'

export interface IFieldConfig<E extends AirEnum<AirAny> = AirEnum<AirAny>> extends IField {
  /**
   * ### 配置字典
   */
  dictionary?: ClassConstructor<E> | AirDictionaryArray

  /**
   * ### 是否忽略类上的前缀
   */
  ignorePrefix?: boolean

  /**
   * ### 转换别名
   */
  alias?: string

  /**
   * ### 是否是数组
   */
  array?: boolean

  /**
   * ### 强制类型转换的目标类
   */
  type?: ClassConstructor
}
