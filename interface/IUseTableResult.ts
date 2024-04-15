/* eslint-disable no-unused-vars */
import { AirEntity } from '../base/AirEntity'
import { ITableHookResult } from './ITableHookResult'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'

/**
 * # 表格的Hook标准返回
 * @author Hamm
 */
export interface IUseTableResult<E extends AirEntity, S extends AirAbstractEntityService<E>> extends ITableHookResult<E, S> {
  /**
   * # 编辑事件
   *
   * @param row 选择的行
   */
  onEdit: (row: E) => void,

  /**
   * # 删除事件
   *
   * @param row 选择的行
   */
  onDelete: (row: E) => void,

  /**
   * # 禁用事件
   *
   * @param row 选择的行
   */
  onDisable: (row: E) => void,

  /**
   * # 启用事件
   *
   * @param row 选择的行
   */
  onEnable: (row: E) => void,
}
