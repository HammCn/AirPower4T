import type { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import type { AirEntity } from '../base/AirEntity'
import type { IUseSelectorOption } from '../interface/hooks/IUseSelectorOption'
import type { IUseSelectorResult } from '../interface/hooks/IUseSelectorResult'
import type { IJson } from '../interface/IJson'
import type { ClassConstructor } from '../type/AirType'
import { computed, ref } from 'vue'
import { AirI18n } from '../helper/AirI18n'
import { airTableHook } from './airTableHook'

/**
 * # 引入`Selector`使用的`Hook`
 * @param props `defineProps`的返回值
 * @param entityClass 实体类
 * @param serviceClass `Selector`使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useAirSelector<E extends AirEntity, S extends AirAbstractEntityService<E>>(
  props: IJson,
  entityClass: ClassConstructor<E>,
  serviceClass: ClassConstructor<S>,
  option: IUseSelectorOption<E> = {},
): IUseSelectorResult<E, S> {
  /**
   * ### 表格`Hook`返回对象
   */
  const result = airTableHook(entityClass, serviceClass, option)

  /**
   * ### 选择器对话框的标题
   */
  const title = ref(AirI18n.get().SelectPlease || '请选择')

  result.selectList.value = props.selectList

  const disableConfirm = computed(() => props.isMultiple && result.selectList.value.length === 0)

  return Object.assign(result, {
    title,
    disableConfirm,
  })
}
