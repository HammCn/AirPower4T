import { AirColor } from '../enum/AirColor'

/**
 * # 一些定义的类型
 * @author Hamm.cn
 */

/**
 * ### 😡 慎用 Any
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AirAny = any

/**
 * ### 💰 金额的舍弃方向类型
 */
export type AirMoneyDirection = 'up' | 'down'

/**
 * ### 枚举 `Key` 的类型
 */
export type AirEnumKey = string | number | boolean

/**
 * ### 颜色值
 */
export type AirColorString = AirColor | string

/**
 * ### 装饰器目标类
 */
export type AirDecoratorTarget = AirAny

/**
 * ### 装饰器存储的数据类型
 */
export type AirDecoratorData = AirAny

/**
 * ### 类包装
 * @author Hamm.cn
 */
export type ClassConstructor<T = AirAny> = {
  // eslint-disable-next-line no-unused-vars
  new(...args: AirAny[]): T
}
