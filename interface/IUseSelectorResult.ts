/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirRequest } from '../model/AirRequest'
import { AirPage } from '../model/AirPage'
import { AirSort } from '../model/AirSort'

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
  onSelect: (list: E[]) => void,

  /**
   * # 已选择的数组
   */
  selected: Ref<E[]>,

  /**
   * # 搜索事件
   */
  onSearch: (request: AirRequest<E>) => void,

  /**
   * # 分页变更事件
   */
  onPageChanged: (page: AirPage) => void,

  /**
   * # 排序变更事件
   */
  onSortChanged: (sort: AirSort) => void,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   */
  onGetList: (list: E[]) => void,

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
