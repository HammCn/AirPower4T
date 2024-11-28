import { ElForm, ElTable, ElTree } from 'element-plus'

import type Node from 'element-plus/es/components/tree/src/model/node'
import { AirColor } from '../enum/AirColor'
import { AirCode } from '../enum/AirCode'

/**
 * # 一些定义的类型
 * @author Hamm.cn
 */

/**
 * ## 😡 慎用 Any
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AirAny = any

/**
 * ## `el-tree` 的实例
 */
export type AirTreeInstance = InstanceType<typeof ElTree>;

/**
 * ## `el-form` 的实例
 */
export type AirFormInstance = InstanceType<typeof ElForm>;

/**
 * ## `el-table` 的实例
 */
export type AirTableInstance = InstanceType<typeof ElTable>;

/**
 * ## `tree-node` 的实例
 */
export type AirTreeNode = Node;

/**
 * ## 💰 金额的舍弃方向类型
 */
export type AirMoneyDirection = 'up' | 'down'

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

/**
 * ## 表格对齐方式
 */
export type AirTableAlign = 'left' | 'center' | 'right'

/**
 * ## 表格固定位置
 */
export type AirTableFixed = 'left' | 'right'

/**
 * ## 表格是否可排序(排序方式)
 */
export type AirSortable = boolean | 'custom'

/**
 * ## 装饰器目标类
 */
export type AirDecoratorTarget = AirAny

/**
 * ## 装饰器存储的数据类型
 */
export type AirDecoratorData = AirAny

/**
 * ## 验证器回调函数类型
 */
// eslint-disable-next-line no-unused-vars
export type AirValidatorCallback = (error?: string) => void

/**
 * ## 验证器规则类型
 */
export type AirValidatorRule = AirAny

/**
 * ## 验证器数据类型
 */
export type AirValidatorType = 'string' | 'number' | 'date' | 'array'

/**
 * ## 验证器触发类型
 */
export type AirValidatorTrigger = 'blur' | 'change'

/**
 * ##  图标类型字符串类型
 */
export type AirIconType =
  'DELETE_LIST'
  | 'DELETE'
  | 'EDIT'
  | 'DETAIL'
  | 'ADD'
  | 'FINISH'
  | 'SEARCH'
  | 'SETTING'
  | 'PUBLISH'
  | 'SAVE'
  | 'EXPORT'
  | 'IMPORT'
  | 'MORE'
  | 'LOCK'
  | 'UPLOAD'
  | 'LOGOUT'
  | 'DOWNLOAD'
  | 'CHECKIN'
  | 'SELECT'
  | 'MOVE_UP'
  | 'MOVE_DOWN'
  | 'CONFIRM'
  | 'CHECKBOX'
  | 'CLOCK'
  | 'MONITOR'
  | 'COMPARE'
  | 'CLOSE'

/**
 * ## 类包装
 * @author Hamm.cn
 */
export type ClassConstructor<T = AirAny> = {
  // eslint-disable-next-line no-unused-vars
  new(...args: AirAny[]): T;
}
