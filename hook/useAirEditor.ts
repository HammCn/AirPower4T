import { Ref, computed, ref } from 'vue'
import { AirFormInstance } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirEntity } from '../base/AirEntity'
import { IUseEditorOption } from '../interface/IUseEditorOption'
import { IUseEditorResult } from '../interface/IUseEditorResult'

/**
 * # 引入Editor的Hook
 * @param props defineProps的返回值
 * @param entityClass Editor使用的实体类
 * @param serviceClass Editor使用的Service
 * @param option [可选]更多的配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAirEditor<E extends AirEntity>(props: any, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseEditorOption<E> = {}): IUseEditorResult<E> {
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

  const rules = service.createValidator(props.param, option.customRules || {})

  const formRef = ref<AirFormInstance>() as Ref<AirFormInstance>

  async function onSubmit() {
    let postData = AirClassTransformer.copy(formData.value, entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result !== undefined) {
        postData = result
      }
    }
    await service.save(postData, option.successMessage || (postData.id ? `修改${formData.value.getClassName()}成功` : `添加${formData.value.getClassName()}成功`))
    props.onConfirm()
  }

  getDetail()

  const title = computed(() => ((formData.value.id ? '修改' : '新增') + formData.value.getClassName()))

  return {
    title, formRef, rules, formData, isLoading, onSubmit,
  } as IUseEditorResult<E>
}
