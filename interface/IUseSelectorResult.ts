/* eslint-disable @typescript-eslint/ban-types */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirRequest } from '../model/AirRequest'

/**
 * # 选择器Hook的标准返回
 */
export interface IUseSelectorResult<E extends AirEntity> {

  /**
   * # Selector的标题
   */
  title: Ref<string>,

  /**
   * # 多选选择事件
   */
  onSelect: Function,

  /**
   * # 已选择的数组
   */
  selected: Ref<E[]>,

  /**
   * # 搜索事件
   */
  onSearch: Function,

  /**
   * # 分页变更事件
   */
  onPageChanged: Function,

  /**
   * # 排序变更事件
   */
  onSortChanged: Function,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   */
  onGetList: Function,

  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,

  /**
   * # 响应数据
   */
  response: Ref<AirResponsePage<E>>,

  /**
   * # 请求数据
   */
  request: Ref<AirRequest<E>>,

  /**
   * # 返回的单页数据列表
   */
  list: Ref<E[]>,
}
