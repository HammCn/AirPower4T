/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { ITableHookResult } from './ITableHookResult'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'

/**
 * # 选择器Hook的标准返回
 * @author Hamm.cn
 */
export interface IUseSelectorResult<E extends AirEntity, S extends AirAbstractEntityService<E>> extends ITableHookResult<E, S> {

  /**
   * # Selector的标题
   */
  title: Ref<string>,
}
