/* eslint-disable @typescript-eslint/ban-types */
import { Ref } from 'vue'
import { AirFormInstance } from '../type/AirType'
import { IValidateRule } from './IValidateRule'
import { AirEntity } from '../base/AirEntity'

/**
 * # Editor的Hook标准返回
 */
export interface IUseEditorResult<E extends AirEntity> {
  /**
   * # Editor显示的标题
   */
  title: Ref<string>,

  /**
   * # 表单提交的方法
   * ---
   * 💡 你可以使用 ```beforeSubmit``` 方法来拦截请求的数据
   */
  onSubmit: Function,

  /**
   * # 表单的Ref对象
   * ---
   * 你可以绑定到组件中, 它将自动为你验证
   * - ```ADialog``` 的 ```:form-ref```
   * - ```el-form``` 的 ```ref```
   */
  formRef: Ref<AirFormInstance>,

  /**
   * # 表单的验证规则
   * ---
   * 💡 你可以绑定到 ```el-form``` 的 ```:rules``` 上
   */
  rules: IValidateRule,

  /**
   * # 表单数据
   */
  formData: Ref<E>,

  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,
}
