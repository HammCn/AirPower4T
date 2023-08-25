import { Ref, computed, ref } from 'vue'
import { AirFormInstance } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirEntity } from '../base/AirEntity'
import { IUseEditorOption } from '../interface/IUseEditorOption'
import { IUseEditorResult } from '../interface/IUseEditorResult'
import { useAirDetail } from './useAirDetail'

/**
 * # 引入Editor的Hook
 * @param props defineProps的返回值
 * @param entityClass Editor使用的实体类
 * @param serviceClass Editor使用的Service
 * @param option [可选]更多的配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAirEditor<E extends AirEntity>(props: any, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseEditorOption<E> = {}): IUseEditorResult<E> {
  const result = useAirDetail(props, entityClass, serviceClass, option)

  const rules = result.service.createValidator(props.param, option.customRules || {})

  const formRef = ref<AirFormInstance>() as Ref<AirFormInstance>

  async function onSubmit() {
    let postData = AirClassTransformer.copy(result.formData.value, entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result !== undefined) {
        postData = result
      }
    }
    await result.service.save(postData, option.successMessage || (postData.id ? `修改${result.formData.value.getClassName()}成功` : `添加${result.formData.value.getClassName()}成功`))
    props.onConfirm()
  }

  const title = computed(() => ((result.formData.value.id ? '修改' : '新增') + result.formData.value.getClassName()))

  return Object.assign(result, {
    title, formRef, rules, onSubmit,
  }) as IUseEditorResult<E>
}
