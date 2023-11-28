/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 实体的配置项注解
 * @author Hamm
 */
import { AirDecorator } from '../helper/AirDecorator'
import { IEntityConfig } from '../interface/IEntityConfig'

/**
 * # 实体配置Key
 */
const ENTITY_CONFIG_KEY = 'EntityConfig'

/**
 * # 为实体标记一个配置
 * @param config (可选)配置
 */
export function EntityConfig(config: IEntityConfig = {}) {
  return (target: any) => AirDecorator.setClassConfig(target, ENTITY_CONFIG_KEY, config)
}

/**
 * # 获取类的配置
 * @param target 目标类
 */
export function getEntityConfig(target: any): IEntityConfig {
  return AirDecorator.getClassConfig(target, ENTITY_CONFIG_KEY, {}, true)
}
