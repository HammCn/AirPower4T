import { AirCode } from "../enum/AirCode";
import { AirColor } from "../enum/AirColor";

/**
 * # 枚举Key的类型
 */
export type AirEnumKey = string | number | boolean;

/**
 * # 颜色值
 */
export type AirColorString = AirColor | string

/**
 * # 状态码
 */
export type AirCodeNumber = AirCode | number

/**
 * # 表格对齐方式
 */
export type AirTableAlign = 'left' | 'center' | 'right'

/**
 * # 表格固定位置
 */
export type AirTableFixed = 'left' | 'right'

/**
 * # 表格是否可排序(排序方式)
 */
export type AirSortable = boolean | 'custom'

/**
 * #  图标类型字符串类型
 */
export type AirIconType = 'DELETE_LIST' | 'DELETE' | 'EDIT' | 'DETAIL' | 'ADD' | 'FINISH' | 'SEARCH' | 'SETTING' | 'PUBLISH' | 'SAVE' | 'EXPORT' | 'IMPORT' | 'MORE' | 'LOCK' | 'UPLOAD' | 'LOGOUT' | 'DOWNLOAD' | 'CHECKIN' | 'SELECT' | 'MOVE_UP' | 'MOVE_DOWN' | 'CONFIRM' | 'CHECKBOX' | 'CLOCK' | 'MONITOR' | 'COMPARE' | 'CLOSE'
