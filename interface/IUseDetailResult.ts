import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'

/**
 * # 详情的Hook标准返回
 */
export interface IUseDetailResult<E extends AirEntity> {
  /**
   * # 详情显示的标题
   */
  title: Ref<string>,

  /**
   * # 详情数据
   */
  formData: Ref<E>,

  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,
}
