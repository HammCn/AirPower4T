/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirFieldConfig } from '../config/AirFieldConfig'
import { IJson } from '../interface/IJson'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirClassTransformer } from './AirClassTransformer'

/**
 * # 装饰器助手类
 * @author Hamm.cn
 */
export class AirDecorator {
  /**
   * # 反射添加属性
   * @param target 目标类
   * @param key 配置key
   * @param value 配置值
   */
  private static setProperty(target: any, key: string, value: any) {
    Reflect.defineProperty(target, key, {
      enumerable: false,
      value,
      writable: false,
      configurable: true,
    })
  }

  /**
   * # 设置一个类配置项
   * @param target 目标实体类
   * @param classConfigKey 配置项索引键值
   * @param classConfig 配置的参数
   */
  static setClassConfig(target: any, classConfigKey: string, classConfig: any) {
    this.setProperty(target.prototype, classConfigKey, classConfig)
  }

  /**
   * # 递归获取指定类的配置项
   * @param target 目标类
   * @param classConfigKey 配置项的Key
   * @param defaultValue (可选)类装饰器请传入配置项实例
   * @param isObject (可选)是否是对象配置
   */
  static getClassConfig(target: any, classConfigKey: string, defaultValue: any = undefined, isObject = false): any {
    let classConfig = Reflect.get(target, classConfigKey)
    if (!isObject) {
      // 普通配置
      if (classConfig === undefined) {
        const superClass = Reflect.getPrototypeOf(target)
        if (!superClass || superClass.constructor.name === 'AirModel') {
          return undefined
        }
        return this.getClassConfig(superClass, classConfigKey)
      }
      return classConfig
    }

    classConfig = classConfig || {}
    // 对象配置
    const superClass = Reflect.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return defaultValue
    }

    return { ...this.getClassConfig(superClass, classConfigKey, defaultValue, isObject), ...classConfig }
  }

  /**
   * # 设置一个字段配置项
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey 配置项索引键值
   * @param fieldConfig 配置的参数
   * @param fieldListKey (可选)类配置项列表索引值
   */
  static setFieldConfig(target: any, key: string, fieldConfigKey: string, fieldConfig: any, fieldListKey?: string) {
    if (fieldListKey) {
      this.addFieldDecoratorKey(target, key, fieldListKey)
    }
    this.setProperty(target, `${fieldConfigKey}[${key}]`, fieldConfig)
  }

  /**
   * # 设置一个字段的包含装饰器索引
   * @param target 目标类
   * @param key 字段
   * @param fieldListKey 类配置项列表索引值
   */
  private static addFieldDecoratorKey(target: any, key: string, fieldListKey: string) {
    const list: string[] = Reflect.get(target, fieldListKey) || []
    list.push(key)
    this.setProperty(target, fieldListKey, list)
  }

  /**
   * # 获取类指定字段的指定类型的配置
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey FieldConfigKey
   * @param isObject (可选)是否对象配置
   */
  static getFieldConfig(target: any, key: string, fieldConfigKey: string, isObject = false): any {
    if (typeof target !== 'object') {
      target = target.prototype
    }
    let fieldConfig = Reflect.get(target, `${fieldConfigKey}[${key}]`)
    if (!isObject) {
      // 普通配置
      if (fieldConfig !== undefined) {
        return fieldConfig
      }
      // 没有查询到配置
      const superClass = Reflect.getPrototypeOf(target)
      if (!superClass || superClass.constructor.name === 'AirModel') {
        return undefined
      }
      return this.getFieldConfig(superClass, key, fieldConfigKey)
    }

    // 对象配置
    fieldConfig = fieldConfig || {}
    // 没有查询到配置
    const superClass = Reflect.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return {}
    }
    return { ...this.getFieldConfig(superClass, key, fieldConfigKey, true), ...fieldConfig }
  }

  /**
   * # 获取类标记了装饰器的字段列表
   * @param target 目标类
   * @param fieldConfigKey FieldConfigKey
   * @param list (递归参数)无需传入
   */
  static getFieldList(target: any, fieldConfigKey: string, list: string[] = []): string[] {
    const fieldList: string[] = Reflect.get(target, fieldConfigKey) || []
    fieldList.forEach((item) => list.includes(item) || list.push(item))
    const superClass = Reflect.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return list
    }
    return this.getFieldList(superClass, fieldConfigKey, list)
  }

  /**
   * # 获取目标类指定字段列表的配置项列表
   * @param target 目标类
   * @param fieldListKey FieldListKey
   * @param fieldConfigKey FieldConfigKey
   * @param keyList 指定的字段数组
   * @param FieldConfigClass 指定的返回类
   */
  static getFieldConfigList<T extends AirFieldConfig>(target: any, fieldListKey: string, fieldConfigKey: string, keyList: string[], FieldConfigClass: ClassConstructor<T>) {
    const fieldConfigList: T[] = []
    if (keyList.length === 0) {
      keyList = this.getFieldList(target, fieldListKey)
    }
    for (const fieldName of keyList) {
      const config = this.getFieldConfig(target, fieldName, fieldConfigKey)
      if (config) {
        const defaultConfig = new FieldConfigClass()
        const result: IJson = {}
        Object.keys({
          ...defaultConfig,
          config,
        })
          .forEach((configKey) => {
            if (configKey !== 'key') {
              if (this.getFieldConfigValue(target, fieldConfigKey, config.key, configKey) === null || this.getFieldConfigValue(target, fieldConfigKey, config.key, configKey) === undefined) {
                result[configKey] = (defaultConfig as IJson)[configKey]
              } else {
                result[configKey] = this.getFieldConfigValue(target, fieldConfigKey, config.key, configKey)
              }
            }
          })
        result.key = config.key
        result.label = config.label
        fieldConfigList.push(result as T)
      }
    }
    return fieldConfigList
  }

  /**
   * # 获取目标类上指定字段的某个配置的值
   * @param target 目标类
   * @param fieldConfigKey FieldConfigKey
   * @param key 字段
   * @param configKey 配置Key
   */
  static getFieldConfigValue(target: any, fieldConfigKey: string, key: string, configKey: string): any {
    const fieldConfig = AirClassTransformer.copyJson(Reflect.get(target, `${fieldConfigKey}[${key}]`))
    if (fieldConfig && fieldConfig[configKey] !== undefined) {
      return fieldConfig[configKey]
    }
    const superClass = Object.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return undefined
    }
    return this.getFieldConfigValue(superClass, fieldConfigKey, key, configKey)
  }
}
