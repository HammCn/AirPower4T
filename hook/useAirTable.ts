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
import { IUseTableOption } from '../interface/IUseTableOption'
import { AirNotification } from '../feedback/AirNotification'
import { IUseTableResult } from '../interface/IUseTableResult'

/**
 * # 引入表格使用的Hook
 * @param entityClass 实体类
 * @param serviceClass 表格使用的Service类
 * @param option [可选] 更多配置
 * @param treeList 💡 [可选] 请求专用的`getTreeList`接口
 * @param paginate [可选] 分页加载 默认true
 */
export function useAirTable<E extends AirEntity>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseTableOption<E> = {}, treeList = false, paginate = true): IUseTableResult<E> {
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
    if (treeList) {
      list.value = await service.getTreeList(req)
    } else if (paginate) {
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

  async function onEdit(row: E) {
    if (option.editView) {
      await AirDialog.show(option.editView, row)
      onGetList()
      return
    }
    AirNotification.warning('请为 useAirTableList 的 option 传入 editView')
  }

  async function onDelete(data: E) {
    await service.delete(data.id, `删除${entity.getClassName()}成功`)
    onGetList()
  }

  async function onAdd() {
    if (option.editView) {
      await AirDialog.show(option.editView)
      onGetList()
      return
    }
    AirNotification.warning('请为 useAirTableList 的 option 传入 editView')
  }

  async function onDetail(data: E) {
    if (option.detailView) {
      await AirDialog.show(option.detailView, data)
      onGetList()
      return
    }
    AirNotification.warning('请为 useAirTableList 的 option 传入 detailView')
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
    isLoading, response, request, list, selectList, onSearch, onPageChanged, onEdit, onDelete, onAdd, onSortChanged, onSelected, onGetList, onDetail,
  } as IUseTableResult<E>
}
