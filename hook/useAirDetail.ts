import { Ref, ref } from 'vue'
import { IUseDetailOption } from '../interface/hooks/IUseDetailOption'
import { IUseDetailResult } from '../interface/hooks/IUseDetailResult'
import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirI18n } from '../helper/AirI18n'
import { ClassConstructor } from '../type/AirType'

/**
 * # 引入详情的`Hook`
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的 `Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useAirDetail<E extends AirEntity, S extends AirAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseDetailOption<E>): IUseDetailResult<E, S> {
  /**
   * ### 传入的 `Service` 对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = '加载中'

  /**
   * ### 表单对象
   */
  const formData: Ref<E> = ref(AirClassTransformer.newInstance(entityClass)) as Ref<E>

  /**
   * ### 显示的对话框标题
   */
  const title = ref(AirI18n.get().Detail || '详情')

  /**
   * ### 查询详情方法
   */
  async function getDetail() {
    uni.stopPullDownRefresh()
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

  formData.value.id = option.id

  return {
    title,
    formData,
    service,
    getDetail,
  }
}
