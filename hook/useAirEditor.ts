import { Ref, computed, ref } from 'vue'
import { AirFormInstance } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirEntity } from '../base/AirEntity'
import { IUseEditorOption } from '../interface/IUseEditorOption'
import { IUseEditorResult } from '../interface/IUseEditorResult'
import { useAirDetail } from './useAirDetail'
import { IJson } from '../interface/IJson'
import { AirConfig } from '../config/AirConfig'

/**
 * # 引入Editor的Hook
 * @param props defineProps的返回值
 * @param entityClass Editor使用的实体类
 * @param serviceClass Editor使用的Service
 * @param option (可选)更多的配置
 * @author Hamm
 */
export function useAirEditor<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseEditorOption<E> = {}): IUseEditorResult<E, S> {
  const result = useAirDetail(props, entityClass, serviceClass, option)

  const rules = result.service.createValidator(props.param, option.customRules || {})

  const formRef = ref<AirFormInstance>() as Ref<AirFormInstance>

  async function onSubmit() {
    let postData = AirClassTransformer.copy(result.formData.value, entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result === null) {
        return
      }
      postData = result
    }
    try {
      const id = await result.service.save(postData, option.successMessage || (postData.id ? `修改${result.formData.value.getClassName()}成功` : `添加${result.formData.value.getClassName()}成功`))
      props.onConfirm(id)
    } catch (e: unknown) {
      if ((e as IJson).code === AirConfig.continueCode) {
        if (option.successAndContinue) {
          option.successAndContinue(AirClassTransformer.parse((e as IJson).data, entityClass))
        }
      }
    }
  }

  const title = computed(() => ((result.formData.value.id ? '编辑' : '新增') + result.formData.value.getClassName()))

  return Object.assign(result, {
    title, formRef, rules, onSubmit,
  }) as IUseEditorResult<E, S>
}
