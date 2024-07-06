/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../../base/AirEntity'
import { ITableHookResult } from './ITableHookResult'
import { AirAbstractEntityService } from '../../base/AirAbstractEntityService'

/**
 * # 选择器Hook的标准返回
 * @author Hamm.cn
 */
export interface IUseSelectorResult<E extends AirEntity, S extends AirAbstractEntityService<E>> extends ITableHookResult<E, S> {

  /**
   * ## Selector的标题
   */
  title: Ref<string>,

  /**
   * ## 是否禁用确认按钮
   * 多选时当没有选择任何数据时将禁用确认按钮
   */
  disableConfirm: boolean
}
