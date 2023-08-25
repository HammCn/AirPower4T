import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'

/**
 * # 详情的Hook标准返回
 */
export interface IUseDetailResult<E extends AirEntity> {
  /**
   * # 对话框显示的标题
   */
  title: Ref<string>,

  /**
   * # 表单或详情数据
   */
  formData: Ref<E>,

  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,

  /**
   * # 当前Hook使用的Service实例
   */
  service: AirAbstractEntityService<E>
}
