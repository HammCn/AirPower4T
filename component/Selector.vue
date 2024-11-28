<template>
  <ADialog
    :disable-confirm="disableConfirm"
    :height="height || '70%'"
    :hide-footer="!props.props.isMultiple"
    :loading="isLoading"
    :title="dialogTitle"
    :width="width || '70%'"
    is-selector
    @on-confirm="props.props.onConfirm(selectList.filter(item => !item.isDisabled))"
    @on-cancel="props.props.onCancel()"
  >
    <AToolBar
      :add-permission="addPermission"
      :default-filter="props.props.param"
      :entity="entity"
      :hide-add="!editor"
      :loading="isLoading"
      :search-params="searchParamList"
      :service="service"
      @on-search="onSearch"
      @on-add="onAdd"
    >
      <template #beforeSearch>
        <slot name="beforeSearch" />
      </template>
      <template #afterSearch>
        <slot name="afterSearch" />
      </template>
    </AToolBar>
    <ATable
      :ctrl-width="80"
      :data-list="(unPaginate || treeList) ? list : response.list"
      :entity="entity"
      :field-list="fields"
      :hide-ctrl="props.props.isMultiple"
      :select-list="selectList"
      :show-select="props.props.isMultiple"
      hide-delete
      hide-edit
      hide-field-selector
      @on-select="onSelected"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="row"
      >
        <slot
          :data="row.data"
          :index="row.index"
          :name="name"
        />
      </template>
      <template
        v-if="!props.props.isMultiple"
        #customRow="{ data }"
      >
        <AButton
          :disabled="data.isDisabled"
          link-button
          tooltip="选择"
          @click="props.props.onConfirm(data)"
        >
          选择
        </AButton>
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<script generic="E extends AirEntity,S extends AirAbstractEntityService<E>" lang="ts" setup>
import { Component, computed } from 'vue'
import {
  AButton, ADialog, APage, ATable, AToolBar,
} from '.'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { useAirSelector } from '../hook/useAirSelector'
import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirDialog } from '../helper/AirDialog'
import { AirNotification } from '../feedback/AirNotification'
import { IUseSelectorOption } from '../interface/hooks/IUseSelectorOption'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirAny, ClassConstructor } from '../type/AirType'

const props = defineProps<{
  /**
   * # 选择器使用的实体类
   */
  entity: ClassConstructor<E>,

  /**
   * # 选择器使用的服务类
   */
  service: ClassConstructor<S>,

  /**
   * # 选择器的添加按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `addPermission` 配置
   */
  addPermission?: string

  /**
   * # 选择器使用的字段列表
   */
  fieldList?: AirTableFieldConfig[],

  /**
   * # `Editor`
   * 传入后方可开启选择器快捷添加功能
   */
  editor?: Component

  /**
   * # 搜索使用的字段列表
   */
  searchParams?: AirSearchFieldConfig[],

  /**
   * # 选择器宽度
   */
  width?: string,

  /**
   * # 选择器的高度
   */
  height?: string,

  /**
   * # 选择器标题
   */
  title?: string

  /**
   * # 不分页
   * 默认请求分页接口 如配置了 `treeList` 则此项自动失效
   */
  unPaginate?: boolean,

  /**
   * # 请求专用的 `treeList` 接口
   */
  treeList?: boolean,

  /**
   * # 搜索前的拦截方法
   * 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */
  // eslint-disable-next-line no-unused-vars
  beforeSearch?:(requestData: AirRequestPage<E>) => AirRequestPage<E> | void

  /**
   * # Props参数
   * ```typescript
   * const props = defineProps(airPropsSelector<?>())
   * ```
   * 使用上面的方式声明后传入
   */
  props: {
    /**
     * # 查询参数
     */
    param: AirAny

    /**
     * # 是否多选
     */
    isMultiple: boolean,

    /**
     * # 已选中的列表
     */
    selectList: E[],

    /**
     * # 确认按钮的回调事件
     * @param data [可选] 回调的数据
     */
    // eslint-disable-next-line no-unused-vars
    onConfirm: (data?: E | E[]) => void

    /**
     * # 取消按钮的回调事件
     */
    onCancel: () => void
  }
}>()
const {
  entity,
  service,
} = props

const hookOptions: IUseSelectorOption<E> = {}
if (props.beforeSearch) {
  hookOptions.beforeSearch = props.beforeSearch
}
if (props.unPaginate) {
  hookOptions.unPaginate = props.unPaginate
}
if (props.treeList) {
  hookOptions.treeList = props.treeList
}
if (props.props.param) {
  hookOptions.defaultFilter = props.props.param
}

const {
  title,
  selectList,
  isLoading,
  response,
  list,
  disableConfirm,
  onSearch,
  onPageChanged,
  onSelected,
  onReloadData,
} = useAirSelector(props.props, entity, service, hookOptions)

const entityInstance = AirClassTransformer.parse({}, props.entity)

/**
 * # 弹窗标题
 */
const dialogTitle = computed(() => {
  if (props.title) {
    return props.title
  }
  return title.value
})

/**
 * # 列定义
 */
const fields = computed(() => {
  if (props.fieldList) {
    return props.fieldList
  }
  return AirClassTransformer.parse({}, props.entity)
    .getTableFieldConfigList()
})

/**
 * # 搜索参数
 */
const searchParamList = computed(() => {
  if (props.fieldList) {
    return props.searchParams
  }
  return entityInstance.getSearchFieldConfigList()
})

/**
 * # 弹出编辑器
 */
async function onAdd() {
  if (!props.editor) {
    AirNotification.error('请先配置编辑器')
    return
  }
  await AirDialog.show(props.editor)
  onReloadData()
}

</script>
<style lang="scss" scoped></style>
