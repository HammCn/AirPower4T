import { Ref, computed, ref } from 'vue'
import { IUseDetailOption } from '../interface/IUseDetailOption'
import { IUseDetailResult } from '../interface/IUseDetailResult'
import { AirEntity } from '../base/AirEntity'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'

/**
 * # 引入详情的Hook
 * @param props defineProps的返回值
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的Service
 * @param option [可选]更多的配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAirDetail<E extends AirEntity>(props: any, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseDetailOption<E> = {}): IUseDetailResult<E> {
  const isLoading = ref(false)

  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  const formData: Ref<E> = ref(props.param ? props.param.copy() : AirClassTransformer.newInstance(entityClass))

  async function getDetail() {
    if (props.param.id) {
      formData.value = await service.getDetail(props.param.id)

      if (option.afterGetDetail) {
        const result = option.afterGetDetail(formData.value)
        if (result !== undefined) {
          formData.value = result
        }
      }
    }
  }

  getDetail()

  const title = computed(() => `${formData.value.getClassName()}详情`)

  return {
    title, formData, isLoading,
  } as IUseDetailResult<E>
}
