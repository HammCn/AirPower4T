/* eslint-disable @typescript-eslint/ban-ts-comment */
import { computed, ref } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirResponsePage } from '../model/AirResponsePage'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirSort } from '../model/AirSort'
import { AirPage } from '../model/AirPage'
import { IUseSelectorOption } from '../interface/IUseSelectorOption'

/**
 * # 引入Selector使用的Hook
 * @param props defineProps的返回值
 * @param entityClass 实体类
 * @param serviceClass Selector使用的Service类
 * @param option [可选] 更多配置
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAirSelector<E extends AirEntity>(props: any, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<AirAbstractEntityService<E>>, option: IUseSelectorOption = {}) {
  const isLoading = ref(false)

  const selected = ref(props.selectList)

  const request = ref(new AirRequestPage<E>(entityClass))

  const response = ref(new AirResponsePage<E>())

  const list = ref([] as E[])

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
      // @ts-ignore
      response.value = await service.getPage(req)
      // @ts-ignore
      list.value = response.value
    } else {
      // @ts-ignore
      list.value = await service.getList(req)
    }
  }

  async function onSearch(req: AirRequestPage<E>) {
    // @ts-ignore
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
    /**
     * # Selector的标题
     */
    title,
    /**
     * # 多选选择事件
     */
    onSelect,
    /**
     * # 已选择的数组
     */
    selected,
    /**
     * # 搜索事件
     */
    onSearch,

    /**
     * # 分页变更事件
     */
    onPageChanged,

    /**
     * # 排序变更事件
     */
    onSortChanged,

    /**
     * # 推荐使用 onSearch
     * @deprecated
     */
    onGetList,

    /**
     * # 当前绑定的Loading状态
     * ---
     * 💡 请随意 ```v-loading``` 到你需要的地方
     */
    isLoading,

    /**
     * # 响应数据
     */
    response,

    /**
     * # 请求数据
     */
    request,

    /**
     * # 返回的单页数据列表
     */
    list,
  }
}
