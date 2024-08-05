import { AirCode } from "../enum/AirCode";
import { AirColor } from "../enum/AirColor";

/**
 * ## 枚举 `Key` 的类型
 */
export type AirEnumKey = string | number | boolean;

/**
 * ## 颜色值
 */
export type AirColorString = AirColor | string

/**
 * ## 状态码
 */
export type AirCodeNumber = AirCode | number
