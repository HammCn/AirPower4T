/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirPage } from '../model/AirPage'
import { AirSort } from '../model/AirSort'
import { AirRequestPage } from '../model/AirRequestPage'

/**
 * # 选择器Hook的标准返回
 */
export interface IUseSelectorResult<E extends AirEntity> {

  /**
   * # Selector的标题
   */
  title: Ref<string>,

  /**
   * # 已选择的数组
   */
  selected: Ref<E[]>,

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
  request: Ref<AirRequestPage<E>>,

  /**
   * # 返回的单页数据列表
   */
  list: Ref<E[]>,

  /**
   * # 多选选择事件
   *
   * @param list 选择的行数组
   */
  onSelect: (list: E[]) => void,

  /**
   * # 搜索事件
   *
   * @param request 请求对象
   */
  onSearch: (request: AirRequestPage<E>) => void,

  /**
   * # 分页变更事件
   *
   * @param page 分页对象
   */
  onPageChanged: (page: AirPage) => void,

  /**
   * # 排序变更事件
   *
   * @param sort 排序对象
   */
  onSortChanged: (sort: AirSort) => void,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   *
   * @param request 请求对象
   */
  onGetList: (request: AirRequestPage<E>) => void,
}
