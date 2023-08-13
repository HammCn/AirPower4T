/* eslint-disable @typescript-eslint/ban-types */
import { AirEntity } from '../base/AirEntity'
import { IUseTableResult } from './IUseTableResult'

/**
 * # 树表格的Hook标准返回
 */
export interface IUseTableTreeResult<E extends AirEntity> extends IUseTableResult<E> {
  /**
   * # 表格行的添加按钮点击事件
   */
  onAddRow: Function
}
