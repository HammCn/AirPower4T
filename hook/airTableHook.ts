import { Ref, ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirSort } from '../model/AirSort'
import { AirPage } from '../model/AirPage'
import { ITableHookOption } from '../interface/hooks/ITableHookOption'
import { ITableHookResult } from '../interface/hooks/ITableHookResult'
import { ClassConstructor } from '../type/AirType'

/**
 * # 表格基础`Hook`
 * @param entityClass 实体类
 * @param serviceClass 表格使用的 `Service` 类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function airTableHook<E extends AirEntity, S extends AirAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: ITableHookOption<E> = {}): ITableHookResult<E, S> {
  /**
   * ### 请求对象
   */
  const request = ref(new AirRequestPage<E>(entityClass)) as Ref<AirRequestPage<E>>

  let isLoading = false

  if (option.defaultFilter) {
    // 如果提供了默认筛选器 则使用它
    request.value.filter = option.defaultFilter
  }

  /**
   * ### 响应对象
   */
  const response = ref(new AirResponsePage<E>()) as Ref<AirResponsePage<E>>

  /**
   * ### 表格行数据数组
   */
  const list = ref<E[]>([]) as Ref<E[]>

  /**
   * ### 传入的实体对象
   */
  const entity = AirClassTransformer.newInstance(entityClass)

  /**
   * ### 传入的 `Service` 对象
   */
  const service = AirClassTransformer.newInstance(serviceClass)

  /**
   * ### 查询列表事件
   */
  async function onGetList() {
    let req = request.value
    if (option.beforeSearch) {
      const result = option.beforeSearch(req)
      if (result) {
        req = result
      }
    }
    if (isLoading) {
      return
    }
    isLoading = true
    uni.stopPullDownRefresh()
    if (request.value.page.pageNum === 1) {
      list.value = []
    }
    if (option.treeList) {
      const temp = await service.getTreeList(req, option.apiUrl).finally(() => {
        isLoading = false
      })
      list.value = list.value.concat(temp)
    } else if (!option.unPaginate) {
      response.value = await service.getPage(req, option.apiUrl).finally(() => {
        isLoading = false
      })
      list.value = list.value.concat(response.value.list)
    } else {
      const temp = await service.getList(req, option.apiUrl).finally(() => {
        isLoading = false
      })
      list.value = list.value.concat(temp)
    }
  }

  /**
   * ### 搜索事件
   * @param req 请求对象
   */
  async function onSearch(req: AirRequestPage<E>) {
    request.value = req
    onGetList()
  }

  /**
   * ### 重新加载数据事件
   * 会自动返回第一页
   */
  async function onReloadData() {
    if (!request.value.page) {
      request.value.page = new AirPage()
    }
    request.value.page.pageNum = 1
    onSearch(request.value)
  }

  /**
   * ### 排序变更事件
   * @param sort 排序对象
   */
  async function onSortChanged(sort?: AirSort) {
    request.value.sort = sort
    request.value.page = new AirPage()
    onGetList()
  }

  /**
   * ### 分页变更事件
   * @param page 分页对象
   */
  async function onPageChanged(page: AirPage) {
    request.value.page = page
    onGetList()
  }

  /**
   * ### 加载更多事件
   */
  async function onLoadMore() {
    if (isLoading) {
      // 加载中
      return
    }
    request.value.page.pageNum += 1
    onGetList()
  }

  onGetList()

  return {
    entity,
    service,
    response,
    request,
    list,
    onSearch,
    onPageChanged,
    onSortChanged,
    onGetList,
    onReloadData,
    onLoadMore,
  }
}
