import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
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
   * ### 表格`Hook`返回对象
   */
  const result = useAirTable(entityClass, serviceClass, option)

  return Object.assign(result)
}
