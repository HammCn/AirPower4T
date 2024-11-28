import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirDialog } from '../helper/AirDialog'
import { ITree } from '../interface/ITree'
import { IUseTableTreeOption } from '../interface/hooks/IUseTableTreeOption'
import { IUseTableTreeResult } from '../interface/hooks/IUseTableTreeResult'
import { ClassConstructor } from '../type/AirType'
import { useAirTable } from './useAirTable'

/**
 * # 引入表格树使用的`Hook`
 * @param entityClass 实体类
 * @param serviceClass 表格使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useAirTableTree<E extends ITree, S extends AirAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseTableTreeOption<E> = {}): IUseTableTreeResult<E, S> {
  // 设置不分页
  if (option.unPaginate === undefined) {
    option.unPaginate = true
  }

  /**
   * ## 表格`Hook`返回对象
   */
  const result = useAirTable(entityClass, serviceClass, option)

  /**
   * ## 树表格添加子项事件
   * @param row 行数据
   */
  async function onAddRow(row: E) {
    if (!option.editView) {
      AirNotification.warning('请为 useAirTableList 的 option 传入 editor')
      return
    }
    try {
      let param = AirClassTransformer.newInstance(entityClass)
      param.parentId = row.id
      if (option.beforeAddRow) {
        const result = option.beforeAddRow(param, row)
        if (result !== undefined) {
          param = result
        }
      }
      await AirDialog.show(option.editView, param)
    } finally {
      result.onReloadData()
    }
  }

  return Object.assign(result, {
    onAddRow,
  })
}
