/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirFieldConfig } from '../config/AirFieldConfig'
import { IJson } from '../interface/IJson'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirClassTransformer } from './AirClassTransformer'

/**
 * # 装饰器助手类
 * @author Hamm
 */
export class AirDecorator {
  /**
   * # 设置一个类配置项 
   * @param classConfigKey 配置项索引键值
   * @param classConfig 配置的参数
   */
  static setClassConfig(target: any, classConfigKey: string, classConfig: any) {
    Reflect.defineProperty(target.prototype, classConfigKey, {
      enumerable: false,
      value: classConfig,
      writable: false,
      configurable: true,
    })
  }

  /**
   * # 递归获取配置的值
   * @param target 目标类
   * @param key 配置key
   * @param classConfigKey 配置项的Key
   */
  private static getClassConfigValue(target: any, key: string, classConfigKey: string): any {
    const entityConfig = Reflect.get(target, classConfigKey)
    if (entityConfig && entityConfig[key] !== undefined) {
      return entityConfig[key]
    }
    const superClass = Reflect.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return undefined
    }
    return this.getClassConfigValue(superClass, key, classConfigKey)
  }

  /**
   * # 递归获取指定类的配置项
   * @param target 目标类
   * @param classConfigKey 配置项的Key
   * @param defaultValue [可选]类装饰器请传入配置项实例
   */
  static getClassConfig(target: any, classConfigKey: string, defaultValue: any = undefined): any {
    const classConfig = Reflect.get(target, classConfigKey)
    if (!classConfig) {
      const superClass = Reflect.getPrototypeOf(target)
      if (!superClass || superClass.constructor.name === 'AirModel') {
        if (typeof defaultValue === 'object') {
          return {}
        }
        return undefined
      }
      return this.getClassConfig(superClass, classConfigKey)
    }
    if (typeof defaultValue === 'object') {
      const keys = Object.keys(defaultValue)
      for (const key of keys) {
        if ((classConfig as any)[key] !== undefined) {
          // eslint-disable-next-line no-continue
          continue
        }
        (classConfig as any)[key] = this.getClassConfigValue(target, key, classConfigKey)
      }
    }
    return classConfig
  }

  /**
   * # 设置一个字段配置项
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey 配置项索引键值
   * @param fieldConfig 配置的参数
   * @param fieldListKey [可选]类配置项列表索引值
   */
  static setFieldConfig(target: any, key: string, fieldConfigKey: string, fieldConfig: any, fieldListKey?: string) {
    if (fieldListKey) {
      this.setFieldDecoration(target, key, fieldListKey)
    }
    Reflect.defineProperty(target, `${`${fieldConfigKey}[${key}]`}`, {
      enumerable: false,
      value: fieldConfig,
      writable: false,
      configurable: true,
    })
  }

  /**
   *
   * @param target 目标类
   * @param key 字段
   * @param fieldListKey 类配置项列表索引值
   */
  private static setFieldDecoration(target: any, key: string, fieldListKey: string) {
    const list: string[] = Reflect.get(target, fieldListKey) || []
    list.push(key)
    Reflect.defineProperty(target, fieldListKey, {
      enumerable: false,
      value: list,
      writable: false,
      configurable: true,
    })
  }

  /**
   * # 获取类指定字段的指定类型的配置
   * @param target 目标类
   * @param key 字段
   * @param fieldConfigKey FieldConfigKey
   */
  static getFieldConfig(target: any, key: string, fieldConfigKey: string): any {
    let fieldConfig = Reflect.get(target, `${`${fieldConfigKey}[${key}]`}`)
    if (typeof fieldConfig === 'object') {
      fieldConfig = AirClassTransformer.copyJson(fieldConfig)
    }
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

  /**
   * # 获取类标记了装饰器的字段列表
   * @param target 目标类
   * @param fieldConfigKey FieldConfigKey
   * @param list [递归参数]无需传入
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
        Object.keys({ ...defaultConfig, config }).forEach((configKey) => {
          if (configKey !== 'key') {
            result[configKey] = this.getFieldConfigValue(target, fieldConfigKey, config.key, configKey) || (defaultConfig as IJson)[configKey]
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
    const fieldConfig = AirClassTransformer.copyJson(Reflect.get(target, `${`${fieldConfigKey}[${key}]`}`))
    if (fieldConfig && fieldConfig[configKey] !== undefined) {
      return fieldConfig[configKey]
    }
    const superClass = Object.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return undefined
    }
    return this.getFieldConfigValue(superClass, fieldConfig, key, configKey)
  }
}
