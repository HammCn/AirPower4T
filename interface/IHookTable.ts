/* eslint-disable @typescript-eslint/ban-types */
import { Ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirRequest } from '../model/AirRequest'
import { AirResponsePage } from '../model/AirResponsePage'

/**
 * # 表格的Hook标准返回
 */
export interface IHookTable<E extends AirEntity> {
  /**
   * # 搜索事件
   */
  onSearch: Function,

  /**
   * # 分页变更事件
   */
  onPageChanged: Function,

  /**
   * # 编辑事件
   */
  onEdit: Function,

  /**
   * # 删除事件
   */
  onDelete: Function,

  /**
   * # 添加事件
   */
  onAdd: Function,

  /**
   * # 排序变更事件
   */
  onSortChanged: Function,

  /**
   * # 多选事件
   */
  onSelected: Function,

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

  /**
   * # 选中的数据列表
   */
  selectList: Ref<E[]>,
}

/**
 * # 树表格的Hook标准返回
 */
export interface IHookTableTree<E extends AirEntity> extends IHookTable<E> {
  /**
   * # 表格行的添加按钮点击事件
   */
  onAddRow: Function
}
