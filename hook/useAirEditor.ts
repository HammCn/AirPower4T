import {
  computed, Ref, ref, watch,
} from 'vue'
import { AirFormInstance, ClassConstructor } from '../type/AirType'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirEntity } from '../base/AirEntity'
import { IUseEditorOption } from '../interface/hooks/IUseEditorOption'
import { IUseEditorResult } from '../interface/hooks/IUseEditorResult'
import { useAirDetail } from './useAirDetail'
import { IJson } from '../interface/IJson'
import { AirConfig } from '../config/AirConfig'
import { AirI18n } from '../helper/AirI18n'
import { IValidateRule } from '../interface/IValidateRule'

/**
 * # 引入`Editor`的`Hook`
 * @param props `defineProps`的返回值
 * @param entityClass `Editor`使用的实体类
 * @param serviceClass `Editor`使用的`Service`
 * @param option `可选` 更多的配置
 * @author Hamm.cn
 */
export function useAirEditor<E extends AirEntity, S extends AirAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseEditorOption<E> = {}): IUseEditorResult<E, S> {
  /**
   * ## 详情`Hook`返回对象
   */
  const result = useAirDetail(props, entityClass, serviceClass, option)

  /**
   * ## 对话框显示的标题
   */
  const title = computed(() => ((result.formData.value.id ? (AirI18n.get().Edit || '编辑') : (AirI18n.get().Add || '添加'))))

  /**
   * ## 自动生成的验证规则
   */
  const rules: IValidateRule<E> = result.service.createValidator(props.param, option.customRules || {})

  /**
   * ## 表单实例
   */
  const formRef = ref<AirFormInstance>() as Ref<AirFormInstance>

  /**
   * ## 表单提交事件
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
      if (postData.id) {
        const id = await result.service.update(postData, option.successMessage || (AirI18n.get().EditSuccess || '编辑成功'), option.apiUrlUpdate)
        props.onConfirm(id)
        return
      }
      const id = await result.service.add(postData, option.successMessage || (AirI18n.get().AddSuccess || '添加成功'), option.apiUrlAdd)
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
  })
}
