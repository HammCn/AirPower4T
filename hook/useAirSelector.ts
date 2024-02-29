import { computed } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { IUseSelectorOption } from '../interface/IUseSelectorOption'
import { IUseSelectorResult } from '../interface/IUseSelectorResult'
import { IJson } from '../interface/IJson'
import { airTableHook } from './airTableHook'

/**
 * # 引入Selector使用的Hook
 * @param props defineProps的返回值
 * @param entityClass 实体类
 * @param serviceClass Selector使用的Service类
 * @param option (可选) 更多配置
 * @author Hamm
 */
export function useAirSelector<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseSelectorOption<E> = {}): IUseSelectorResult<E, S> {
  /**
   * # 表格Hook返回对象
   */
  const result = airTableHook(entityClass, serviceClass, option)

  /**
   * # 选择器对话框的标题
   */
  const title = computed(() => `请选择${result.entity.getClassName()}`)

  result.selectList.value = props.selectList

  return Object.assign(result, {
    title,
  }) as IUseSelectorResult<E, S>
}
