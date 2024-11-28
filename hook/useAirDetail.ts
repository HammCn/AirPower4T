import { provide, Ref, ref } from 'vue'
import { IUseDetailOption } from '../interface/hooks/IUseDetailOption'
import { IUseDetailResult } from '../interface/hooks/IUseDetailResult'
import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { IJson } from '../interface/IJson'
import { AirI18n } from '../helper/AirI18n'
import { ClassConstructor } from '../type/AirType'

/**
 * # 引入详情的`Hook`
 * @param props `defineProps` 的返回值
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的 `Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useAirDetail<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseDetailOption<E> = {}): IUseDetailResult<E, S> {
  /**
   * ## 加载状态
   */
  const isLoading = ref(false)

  /**
   * ## 传入的 `Service` 对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  /**
   * ## 表单对象
   */
  const formData: Ref<E> = ref(props.param ? props.param.copy() : AirClassTransformer.newInstance(entityClass))

  /**
   * ## 显示的对话框标题
   */
  const title = ref(AirI18n.get().Detail || '详情')

  /**
   * ## 查询详情方法
   */
  async function getDetail() {
    if (formData.value.id) {
      formData.value = await service.getDetail(formData.value.id, option.apiUrl)

      if (option.afterGetDetail) {
        const result = option.afterGetDetail(formData.value)
        if (result !== undefined) {
          formData.value = result
        }
      }
    }
  }

  provide('entityClass', entityClass)
  provide('formData', formData)

  getDetail()

  return {
    title,
    formData,
    isLoading,
    service,
    getDetail,
  }
}
