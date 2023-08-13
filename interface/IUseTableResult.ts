/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirRequest } from '../model/AirRequest'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirPage } from '../model/AirPage'
import { AirSort } from '../model/AirSort'

/**
 * # 表格的Hook标准返回
 */
export interface IUseTableResult<E extends AirEntity> {
  /**
   * # 搜索事件
   */
  onSearch: (request: AirRequest<E>) => void,

  /**
   * # 分页变更事件
   */
  onPageChanged: (page: AirPage) => void,

  /**
   * # 编辑事件
   */
  onEdit: (row: E) => void,

  /**
   * # 删除事件
   */
  onDelete: (row: E) => void,

  /**
   * # 添加事件
   */
  onAdd: () => void,

  /**
   * # 排序变更事件
   */
  onSortChanged: (sort: AirSort) => void,

  /**
   * # 多选事件
   */
  onSelected: (list: E[]) => void,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   */
  onGetList: (request: AirRequest<E>) => void,

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

  /**
   * # 选中的数据列表
   */
  selectList: Ref<E[]>,
}
