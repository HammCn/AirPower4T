/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 搜索配置的注解
 * @author Hamm
 */
import { AirEntity } from '../base/AirEntity'
import { AirEntityConfig } from '../config/AirEntityConfig'
import { IEntityConfig } from '../interface/IEntityConfig'

/**
 * # 搜索配置key
 */
const ENTITY_CONFIG_KEY = '__entity_config__'

/**
 * # 为类标记一个配置
 * @param config [可选]类的配置
 */
export function EntityConfig(config?: IEntityConfig) {
  return (target: typeof AirEntity) => {
    if (!config) {
      config = new AirEntityConfig()
    }

    Object.defineProperty(target.prototype, ENTITY_CONFIG_KEY, {
      enumerable: false,
      value: config,
      writable: false,
      configurable: false,
    })
  }
}

/**
 * # 递归获取配置的值
 * @param target 目标类
 * @param key 配置key
 */
function getEntityConfigValue(target: any, key: string) {
  const entityConfig = target[ENTITY_CONFIG_KEY]
  if (entityConfig && entityConfig[key] !== undefined) {
    return entityConfig[key]
  }
  const superClass = Object.getPrototypeOf(target)
  if (!superClass || superClass.constructor.name === 'AirModel') {
    return undefined
  }
  return getEntityConfigValue(superClass, key)
}

/**
 * # 获取类的配置
 * @param target 目标类
 */
export function getEntityConfig(target: any): AirEntityConfig {
  const entityConfig = target[ENTITY_CONFIG_KEY]
  if (!entityConfig) {
    const superClass = Object.getPrototypeOf(target)
    if (!superClass || superClass.constructor.name === 'AirModel') {
      return {} as AirEntityConfig
    }
    return getEntityConfig(superClass)
  }
  const keys = Object.keys(new AirEntityConfig())
  for (const key of keys) {
    if ((entityConfig as any)[key] !== undefined) {
      // eslint-disable-next-line no-continue
      continue
    }
    (entityConfig as any)[key] = getEntityConfigValue(target, key)
  }
  return entityConfig
}
