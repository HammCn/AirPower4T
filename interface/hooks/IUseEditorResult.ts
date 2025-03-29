import type { Ref } from 'vue'
import type { AirAbstractEntityService } from '../../base/AirAbstractEntityService'
import type { AirEntity } from '../../base/AirEntity'
import type { AirFormInstance } from '../../type/AirType'
import type { IValidateRule } from '../IValidateRule'
import type { IUseDetailResult } from './IUseDetailResult'

/**
 * # `Editor` 的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IUseEditorResult<E extends AirEntity, S extends AirAbstractEntityService<E>>
  extends IUseDetailResult<E, S> {
  /**
   * ### 表单的 `Ref` 对象
   * 你可以绑定到组件中, 它将自动为你验证
   * - `ADialog` 的 `:form-ref`
   * - `el-form` 的 `ref`
   */
  formRef: Ref<AirFormInstance>

  /**
   * ### 表单的验证规则
   * 你可以绑定到 `el-form` 的 `:rules` 上
   */
  rules: IValidateRule<E>

  /**
   * ### 表单提交的方法
   * 你可以使用 `beforeSubmit` 方法来拦截请求的数据
   */
  onSubmit: () => void
}
