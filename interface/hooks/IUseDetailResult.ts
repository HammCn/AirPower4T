import { Ref } from 'vue'
import { AirEntity } from '../../base/AirEntity'
import { AirAbstractEntityService } from '../../base/AirAbstractEntityService'

/**
 * # 详情的 `Hook` 标准返回
 * @author Hamm.cn
 */
export interface IUseDetailResult<E extends AirEntity, S extends AirAbstractEntityService<E>> {
  /**
   * ## 对话框显示的标题
   */
  title: Ref<string>,

  /**
   * ## 表单或详情数据
   */
  formData: Ref<E>,

  /**
   * ## 当前绑定的 `Loading` 状态
   * 请随意 `v-loading` 到你需要的地方
   */
  isLoading: Ref<boolean>,

  /**
   * ## 当前 `Hook` 使用的 `Service` 实例
   */
  service: S

  /**
   * ## 查询详情
   */
  getDetail: () => void,
}
