import { Ref, computed, ref } from 'vue'
import { AirFormInstance } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirEntity } from '../base/AirEntity'
import { IUseEditorOption } from '../interface/IUseEditorOption'

/**
 * # 引入Editor的Hook
 * @param props defineProps的返回值
 * @param entityClass Editor使用的实体类
 * @param serviceClass Editor使用的Service
 * @param option [可选]更多的配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAirEditor<E extends AirEntity>(props: any, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseEditorOption = {}) {
  const isLoading = ref(false)

  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  const formData: Ref<E> = ref(props.param.copy())

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

  const formRef = ref<AirFormInstance>()

  async function onSubmit() {
    let postData = AirClassTransformer.copy(formData.value, entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result !== undefined) {
        postData = result
      }
    }
    await service.save(postData, postData.id ? `修改${formData.value.getClassName()}成功` : `添加${formData.value.getClassName()}成功`)
    props.onConfirm()
  }

  getDetail()

  const title = computed(() => ((formData.value.id ? '修改' : '新增') + formData.value.getClassName()))

  return {
    /**
     * # Editor显示的标题
     */
    title,

    /**
     * # 表单提交的方法
     * ---
     * 💡 你可以使用 ```beforeSubmit``` 方法来拦截请求的数据
     */
    onSubmit,

    /**
     * # 表单的Ref对象
     * ---
     * 你可以绑定到组件中, 它将自动为你验证
     * - ```ADialog``` 的 ```:form-ref```
     * - ```el-form``` 的 ```ref```
     */
    formRef,

    /**
     * # 表单的验证规则
     * ---
     * 💡 你可以绑定到 ```el-form``` 的 ```:rules``` 上
     */
    rules,

    /**
     * # 表单数据
     */
    formData,

    /**
     * # 当前绑定的Loading状态
     * ---
     * 💡 请随意 ```v-loading``` 到你需要的地方
     */
    isLoading,
  }
}
