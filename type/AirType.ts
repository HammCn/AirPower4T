import { ElForm, ElTable, ElTree } from 'element-plus'

import type Node from 'element-plus/es/components/tree/src/model/node'
import { AirColor } from '../enum/AirColor'
import { AirCode } from '../enum/AirCode'

/**
 * # 一些定义的类型
 * @author Hamm.cn
 */

/**
 * # el-tree的实例 ref对象
 */
export type AirTreeInstance = InstanceType<typeof ElTree>;

/**
 * # el-form的实例 ref对象
 */
export type AirFormInstance = InstanceType<typeof ElForm>;

/**
 * # el-table的实例 ref对象
 */
export type AirTableInstance = InstanceType<typeof ElTable>;

/**
 * # tree-node的原始对象
 */
export type AirTreeNode = Node;

/**
 * # 💰 金额的舍弃方向类型
 */
export type AirMoneyDirection = 'up' | 'down'

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
