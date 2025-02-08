import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { IUseSelectorOption } from '../interface/hooks/IUseSelectorOption'
import { IUseSelectorResult } from '../interface/hooks/IUseSelectorResult'
import { IJson } from '../interface/IJson'
import { airTableHook } from './airTableHook'
import { ClassConstructor } from '../type/AirType'

/**
 * # 引入`Selector`使用的`Hook`
 * @param props `defineProps`的返回值
 * @param entityClass 实体类
 * @param serviceClass `Selector`使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useAirSelector<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseSelectorOption<E> = {}): IUseSelectorResult<E, S> {
  /**
   * ### 表格`Hook`返回对象
   */
  return airTableHook(entityClass, serviceClass, option)
}
