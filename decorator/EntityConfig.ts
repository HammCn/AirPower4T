/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 搜索配置的注解
 * @author Hamm
 */
import { AirEntityConfig } from '../config/AirEntityConfig'
import { IEntityConfig } from '../interface/IEntityConfig'

/**
 * # 搜索配置key
 */
const entityConfigMetaKey = Symbol('entityConfig')

/**
 * # 为类标记一个配置
 * @param config [可选]类的配置
 */
export function EntityConfig(config?: IEntityConfig) {
  return (target: any) => {
    if (!config) {
      config = new AirEntityConfig()
    }

    Object.defineProperty(target, entityConfigMetaKey, {
      enumerable: false,
      value: config,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 获取类的配置
 * @param target 目标类
 */
export function getEntityConfig(target: any): AirEntityConfig {
  return Object.assign(new AirEntityConfig(), target[entityConfigMetaKey])
}
