import { Ref, computed, ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirResponsePage } from '../model/AirResponsePage'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirSort } from '../model/AirSort'
import { AirPage } from '../model/AirPage'
import { IUseSelectorOption } from '../interface/IUseSelectorOption'
import { IUseSelectorResult } from '../interface/IUseSelectorResult'

/**
 * # 引入Selector使用的Hook
 * @param props defineProps的返回值
 * @param entityClass 实体类
 * @param serviceClass Selector使用的Service类
 * @param option [可选] 更多配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAirSelector<E extends AirEntity>(props: any, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseSelectorOption<E> = {}): IUseSelectorResult<E> {
  const isLoading = ref(false)

  const selected = ref(props.selectList)

  const request = ref(new AirRequestPage<E>(entityClass)) as Ref<AirRequestPage<E>>

  const response = ref(new AirResponsePage<E>()) as Ref<AirResponsePage<E>>

  const list = ref([] as E[]) as Ref<E[]>

  const entity = AirClassTransformer.newInstance(entityClass)
  const service = AirClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  function onSelect(list: E[]) {
    selected.value = list
  }

  async function onGetList() {
    let req = request.value
    if (option.beforeSearch) {
      const result = option.beforeSearch(req)
      if (result !== undefined) {
        req = result
      }
    }
    if (!option.unPaginate) {
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

  async function onSortChanged(sort: AirSort) {
    request.value.sort = sort
    request.value.page = new AirPage()
    onGetList()
  }

  async function onPageChanged(page: AirPage) {
    request.value.page = page
    onGetList()
  }

  onGetList()

  const title = computed(() => `请选择${entity.getClassName()}`)

  return {
    title, onSelect, selected, onSearch, onPageChanged, onSortChanged, onGetList, isLoading, response, request, list,
  } as IUseSelectorResult<E>
}
