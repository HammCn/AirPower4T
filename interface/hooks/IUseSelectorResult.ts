import { AirEntity } from '../../base/AirEntity'
import { ITableHookResult } from './ITableHookResult'
import { AirAbstractEntityService } from '../../base/AirAbstractEntityService'

/**
 * # 选择器 `Hook` 的标准返回
 * @author Hamm.cn
 */
export type IUseSelectorResult<E extends AirEntity, S extends AirAbstractEntityService<E>> = ITableHookResult<E, S>
