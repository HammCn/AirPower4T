/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirPage } from '../model/AirPage'
import { AirSort } from '../model/AirSort'
import { AirRequestPage } from '../model/AirRequestPage'

/**
 * # 表格的Hook标准返回
 */
export interface IUseTableResult<E extends AirEntity> {
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
   * # 选中的数据列表
   */
  selectList: Ref<E[]>,

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
   * # 编辑事件
   *
   * @param row 选择的行
   */
  onEdit: (row: E) => void,

  /**
   * # 删除事件
   *
   * @param row 选择的行
   */
  onDelete: (row: E) => void,

  /**
   * # 添加事件
   */
  onAdd: () => void,

  /**
   * # 排序变更事件
   *
   * @param sort 排序对象
   */
  onSortChanged: (sort: AirSort) => void,

  /**
   * # 多选事件
   *
   * @param list 选择的行列表
   */
  onSelected: (list: E[]) => void,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   *
   * @param request 请求对象
   */
  onGetList: (request: AirRequestPage<E>) => void,
}
