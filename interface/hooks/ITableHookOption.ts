import { Component } from 'vue'
import { AirEntity } from '../../base/AirEntity'
import { AirRequestPage } from '../../model/AirRequestPage'

/**
 * # 表格相关的根级配置项
 * @author Hamm.cn
 */
export interface ITableHookOption<E extends AirEntity> {
  /**
   * ## 不分页
   * 默认请求分页接口 如配置了 `treeList` 则此项自动失效
   */
  unPaginate?: boolean,

  /**
   * ## 请求专用的 `treeList` 接口
   */
  treeList?: boolean,

  /**
   * ## 详情的视图 `Vue` 文件
   */
  detailView?: Component

  /**
   * ## 新增和编辑视图的 `Vue` 文件
   */
  editView?: Component

  /**
   * ## 请求的URL
   *
   * 如不传入，则默认为 `Service` 的 `urlForGetXXX`
   */
  apiUrl?: string

  /**
   * ## 搜索前的拦截方法
   * 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */
  // eslint-disable-next-line no-unused-vars
  beforeSearch?: (requestData: AirRequestPage<E>) => AirRequestPage<E> | void
}
