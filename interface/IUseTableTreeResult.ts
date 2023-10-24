/* eslint-disable no-unused-vars */
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirEntity } from '../base/AirEntity'
import { IUseTableResult } from './IUseTableResult'

/**
 * # 树表格的Hook标准返回
 * @author Hamm
 */
export interface IUseTableTreeResult<E extends AirEntity, S extends AirAbstractEntityService<E>> extends IUseTableResult<E, S> {
  /**
   * # 表格行的添加按钮点击事件
   */
  onAddRow: (row: E) => void
}
