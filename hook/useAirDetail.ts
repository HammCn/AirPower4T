import { Ref, computed, ref } from 'vue'
import { IUseDetailOption } from '../interface/IUseDetailOption'
import { IUseDetailResult } from '../interface/IUseDetailResult'
import { AirEntity } from '../base/AirEntity'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { IJson } from '../interface/IJson'

/**
 * # 引入详情的Hook
 * @param props defineProps的返回值
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的Service
 * @param option (可选)更多的配置
 * @author Hamm
 */
export function useAirDetail<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseDetailOption<E> = {}): IUseDetailResult<E, S> {
  /**
   * # 加载状态
   */
  const isLoading = ref(false)

  /**
   * # 传入的Service对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  /**
   * # 表单对象
   */
  const formData: Ref<E> = ref(props.param ? props.param.copy() : AirClassTransformer.newInstance(entityClass))

  /**
   * # 显示的对话框标题
   */
  const title = computed(() => `${formData.value.getClassName()}详情`)

  /**
   * # 查询详情方法
   */
  async function getDetail() {
    if (formData.value.id) {
      formData.value = await service.getDetail(formData.value.id)

      if (option.afterGetDetail) {
        const result = option.afterGetDetail(formData.value)
        if (result !== undefined) {
          formData.value = result
        }
      }
    }
  }

  getDetail()

  return {
    title,
    formData,
    isLoading,
    service,
    getDetail,
  } as IUseDetailResult<E, S>
}
