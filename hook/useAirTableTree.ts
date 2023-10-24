import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirDialog } from '../helper/AirDialog'
import { ITree } from '../interface/ITree'
import { IUseTableTreeOption } from '../interface/IUseTableTreeOption'
import { IUseTableTreeResult } from '../interface/IUseTableTreeResult'
import { ClassConstructor } from '../type/ClassConstructor'
import { useAirTable } from './useAirTable'

/**
 * # 引入表格树使用的Hook
 * @param entityClass 实体类
 * @param serviceClass 表格使用的Service类
 * @param option [可选] 更多配置
 * @param treeList 💡 [可选] 请求专用的`getTreeList`接口
 */
export function useAirTableTree<E extends ITree>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseTableTreeOption<E> = {}, treeList = false): IUseTableTreeResult<E> {
  const result = useAirTable(entityClass, serviceClass, option, treeList, false)
  async function onAddRow(row: E) {
    if (option.editView) {
      let param = AirClassTransformer.newInstance(entityClass)
      param.parentId = row.id
      if (option.beforeAddRow) {
        const result = option.beforeAddRow(param, row)
        if (result !== undefined) {
          param = result
        }
      }
      await AirDialog.show(option.editView, param)
      result.onGetList(result.request.value)
      return
    }
    AirNotification.warning('请为 useAirTableList 的 option 传入 editor')
  }
  return Object.assign(result, {
    onAddRow,
  }) as IUseTableTreeResult<E>
}
