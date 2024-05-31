import {
  Ref, computed, ref, watch,
} from 'vue'
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
import { AirI18n } from '../helper/AirI18n'

/**
 * # 引入Editor的Hook
 * @param props defineProps的返回值
 * @param entityClass Editor使用的实体类
 * @param serviceClass Editor使用的Service
 * @param option (可选)更多的配置
 * @author Hamm
 */
export function useAirEditor<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseEditorOption<E> = {}): IUseEditorResult<E, S> {
  /**
   * # 详情Hook返回对象
   */
  const result = useAirDetail(props, entityClass, serviceClass, option)

  /**
   * # 对话框显示的标题
   */
  const title = computed(() => ((result.formData.value.id ? (AirI18n.get().Edit || '编辑') : (AirI18n.get().Add || '添加'))))

  /**
   * # 自动生成的验证规则
   */
  const rules = result.service.createValidator(props.param, option.customRules || {})

  /**
   * # 表单实例
   */
  const formRef = ref<AirFormInstance>() as Ref<AirFormInstance>

  /**
   * # 表单提交事件
   */
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
      const id = await result.service.save(postData, option.successMessage || (postData.id ? (AirI18n.get().EditSuccess || '编辑成功') : (AirI18n.get().AddSuccess || '添加成功')))
      props.onConfirm(id)
    } catch (e: unknown) {
      if ((e as IJson).code === AirConfig.continueCode) {
        if (option.successAndContinue) {
          option.successAndContinue(AirClassTransformer.parse((e as IJson).data, entityClass))
        }
      }
    }
  }

  watch(result.formData, () => {
    formRef.value?.validate()
  }, {
    deep: true,
    immediate: true,
  })

  return Object.assign(result, {
    title,
    formRef,
    rules,
    onSubmit,
  }) as IUseEditorResult<E, S>
}
