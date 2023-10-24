import { AirEntity } from '../base/AirEntity'
import { AirDialog } from '../helper/AirDialog'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { IUseTableOption } from '../interface/IUseTableOption'
import { AirNotification } from '../feedback/AirNotification'
import { IUseTableResult } from '../interface/IUseTableResult'
import { airTableHook } from './airTableHook'

/**
 * # 引入表格使用的Hook
 * @param entityClass 实体类
 * @param serviceClass 表格使用的Service类
 * @param option [可选] 更多配置
 */
export function useAirTable<E extends AirEntity, S extends AirAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseTableOption<E> = {}): IUseTableResult<E, S> {
  const result = airTableHook(entityClass, serviceClass, option)
  async function onEdit(row: E) {
    if (option.editView) {
      await AirDialog.show(option.editView, row)
      result.onReloadData()
      return
    }
    AirNotification.warning('请为 useAirTableList 的 option 传入 editor')
  }

  async function onDelete(data: E) {
    await result.service.delete(data.id, `删除${result.entity.getClassName()}成功`)
    result.onReloadData()
  }

  return Object.assign(result, {
    onEdit, onDelete,
  }) as IUseTableResult<E, S>
}
