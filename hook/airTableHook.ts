import { Ref, ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirDialog } from '../helper/AirDialog'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirResponsePage } from '../model/AirResponsePage'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirSort } from '../model/AirSort'
import { AirPage } from '../model/AirPage'
import { AirNotification } from '../feedback/AirNotification'
import { ITableHookOption } from '../interface/ITableHookOption'
import { ITableHookResult } from '../interface/ITableHookResult'

/**
 * # 表格基础Hook
 * @param entityClass 实体类
 * @param serviceClass 表格使用的Service类
 * @param option (可选) 更多配置
 * @author Hamm
 */
export function airTableHook<E extends AirEntity, S extends AirAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: ITableHookOption<E> = {}): ITableHookResult<E, S> {
  const isLoading = ref(false)

  const request = ref(new AirRequestPage<E>(entityClass)) as Ref<AirRequestPage<E>>

  const response = ref(new AirResponsePage<E>()) as Ref<AirResponsePage<E>>

  const list = ref([] as E[]) as Ref<E[]>

  const entity = AirClassTransformer.newInstance(entityClass)

  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  async function onGetList() {
    let req = request.value
    if (option.beforeSearch) {
      const result = option.beforeSearch(req)
      if (result !== undefined) {
        req = result
      }
    }
    if (option.treeList) {
      list.value = await service.getTreeList(req)
    } else if (!option.unPaginate) {
      response.value = await service.getPage(req)
      list.value = response.value.list
    } else {
      list.value = await service.getList(req)
    }
  }

  async function onSearch(req: AirRequestPage<E>) {
    request.value = req
    onGetList()
  }

  async function onReloadData() {
    request.value.page.pageNum = 1
    request.value.filter = AirClassTransformer.newInstance(entityClass)
    onSearch(request.value)
  }

  async function onAdd() {
    if (!option.editView) {
      AirNotification.warning('请为 useAirTableList 的 option 传入 editView')
      return
    }
    try {
      await AirDialog.show(option.editView)
    } finally {
      onReloadData()
    }
  }

  async function onDetail(data: E) {
    if (!option.detailView) {
      AirNotification.warning('请为 useAirTableList 的 option 传入 detailView')
      return
    }
    try {
      await AirDialog.show(option.detailView, data)
    } finally {
      onReloadData()
    }
  }

  async function onSortChanged(sort: AirSort) {
    request.value.sort = sort
    request.value.page = new AirPage()
    onGetList()
  }

  const selectList = ref([] as E[]) as Ref<E[]>

  async function onSelected(list: E[]) {
    selectList.value = list
  }

  async function onPageChanged(page: AirPage) {
    request.value.page = page
    onGetList()
  }

  onGetList()

  return {
    entity, service, isLoading, response, request, list, selectList, onSearch, onPageChanged, onAdd, onSortChanged, onSelected, onGetList, onDetail, onReloadData,
  } as ITableHookResult<E, S>
}
