/**
 * # 实体的配置项注解
 * @author Hamm.cn
 */
import { AirDecorator } from '../helper/AirDecorator'
import { IEntityConfig } from '../interface/decorators/IEntityConfig'
import { AirDecoratorTarget } from '../type/AirType'

/**
 * ## 实体配置 `Key`
 */
const ENTITY_CONFIG_KEY = 'EntityConfig'

/**
 * ## 为实体标记一个配置
 * @param config 配置
 */
export function EntityConfig(config: IEntityConfig = {}) {
  return (target: AirDecoratorTarget) => AirDecorator.setClassConfig(target, ENTITY_CONFIG_KEY, config)
}

/**
 * ## 获取类的配置
 * @param target 目标类
 */
export function getEntityConfig(target: AirDecoratorTarget): IEntityConfig {
  return AirDecorator.getClassConfig(target, ENTITY_CONFIG_KEY, {}, true)
}
