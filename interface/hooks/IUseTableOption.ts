import { AirEntity } from '../../base/AirEntity'
import { ITableHookOption } from './ITableHookOption'
import { AirEnum } from '../../base/AirEnum'

/**
 * # `TableList` 的 `Hook` 可选配置
 * @author Hamm.cn
 */
export interface IUseTableOption<E extends AirEntity> extends ITableHookOption<E> {
  /**
   * ### 显示禁用
   */
  showDisable?: boolean

  /**
   * ### 显示启用
   */
  showEnable?: boolean

  /**
   * ## 隐藏删除
   */
  hideDelete?: boolean

  /**
   * ## 隐藏编辑
   */
  hideEdit?: boolean

  /**
   * ### 操作按钮
   */
  actions?: AirEnum[]

  // eslint-disable-next-line no-unused-vars
  onActionEvent?: (action: AirEnum, row: E) => void

  // eslint-disable-next-line no-unused-vars
  actionFilter?: (actions: AirEnum[], row: E) => AirEnum[]
}
