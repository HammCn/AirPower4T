import type { AirAbstractEntityService } from '../../base/AirAbstractEntityService'
import type { AirEntity } from '../../base/AirEntity'
import type { ITableHookResult } from './ITableHookResult'

/**
 * # 表格的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IUseTableResult<E extends AirEntity, S extends AirAbstractEntityService<E>>
  extends ITableHookResult<E, S> {
  /**
   * ### 编辑事件
   *
   * @param row 选择的行
   */
  onEdit: (row: E) => void

  /**
   * ### 删除事件
   *
   * @param row 选择的行
   */
  onDelete: (row: E) => void

  /**
   * ### 禁用事件
   *
   * @param row 选择的行
   */
  onDisable: (row: E) => void

  /**
   * ### 启用事件
   *
   * @param row 选择的行
   */
  onEnable: (row: E) => void
}
