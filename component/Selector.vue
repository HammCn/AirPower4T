<template>
  <ADialog
    :width="width || '70%'"
    :height="height || '70%'"
    :hide-footer="!props.props.mult"
    :title="dialogTitle"
    is-selector
    :loading="isLoading"
    :disable-confirm="disableConfirm"
    @on-confirm="props.props.onConfirm(selectList.filter(item => !item.isDisabled))"
    @on-cancel="props.props.onCancel()"
  >
    <AToolBar
      :hide-add="!editor"
      :loading="isLoading"
      :entity="entity"
      :service="service"
      :search-params="searchs"
      :add-permission="addPermission"
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
      :data-list="response.list"
      :show-select="props.props.mult"
      :field-list="fields"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="entity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="props.props.mult"
      @on-select="onSelected"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="row"
      >
        <slot
          :name="name"
          :index="row.index"
          :data="row.data"
        />
      </template>
      <template
        v-if="!props.props.mult"
        #customRow="{ data }"
      >
        <AButton
          link-button
          :disabled="data.isDisabled"
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

<script lang="ts" setup generic="E extends AirEntity,S extends AirAbstractEntityService<E>,P extends AirEntity = E">
import { Component, computed } from 'vue'
import {
  AButton, ADialog, APage, ATable, AToolBar,
} from '.'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { useAirSelector } from '../hook/useAirSelector'
import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirDialog } from '../helper/AirDialog'
import { AirNotification } from '../feedback/AirNotification'
import { IUseSelectorOption } from '../interface/hooks/IUseSelectorOption'
import { AirRequestPage } from '../model/AirRequestPage'

const props = defineProps<{
  /**
   * ## 选择器使用的实体类
   */
  entity: ClassConstructor<E>,

  /**
   * ## 选择器使用的服务类
   */
  service: ClassConstructor<S>,

  /**
   * # 选择器的添加按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `addPermission` 配置
   */
  addPermission?: string

  /**
   * ## 选择器使用的字段列表
   */
  fieldList?: AirTableFieldConfig[],

  /**
   * ## Editor
   * 传入后方可开启选择器快捷添加功能
   */
  editor?: Component

  /**
   * ## 搜索使用的字段列表
   */
  searchParams?: AirSearchFieldConfig[],

  /**
   * ## 选择器宽度
   */
  width?: string,

  /**
   * ## 选择器的高度
   */
  height?: string,

  /**
   * ## 选择器标题
   */
  title?: string
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
   * ## 搜索前的拦截方法
   * 参数为发起请求的数据,请处理后返回
   *
   * @param requestData 请求对象
   */
  // eslint-disable-next-line no-unused-vars
  beforeSearch?:(requestData: AirRequestPage<E>) => AirRequestPage<E> | void

  /**
   * ## Props参数
   * ```typescript
   * const props = defineProps(airPropsSelector<?>())
   * ```
   * 使用上面的方式声明后传入
   */
  props: {
    /**
     * ## 查询参数
     */
    param: P

    /**
     * ## 是否多选
     */
    mult: boolean,

    /**
     * ## 已选中的列表
     */
    selectList: E[],

    // eslint-disable-next-line @typescript-eslint/ban-types
    onConfirm: Function

    // eslint-disable-next-line @typescript-eslint/ban-types
    onCancel: Function
  }
}>()

const { entity, service } = props

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

const {
  title, selectList, isLoading, response, disableConfirm,
  onSearch, onPageChanged, onSelected, onReloadData,
} = useAirSelector(props.props, entity, service, hookOptions)

const entityInstance = AirClassTransformer.parse({}, props.entity)

const dialogTitle = computed(() => {
  if (props.title) {
    return props.title
  }
  return title.value
})

const fields = computed(() => {
  if (props.fieldList) {
    return props.fieldList
  }
  return AirClassTransformer.parse({}, props.entity).getTableFieldConfigList()
})

const searchs = computed(() => {
  if (props.fieldList) {
    return props.searchParams
  }
  return entityInstance.getSearchFieldConfigList()
})

async function onAdd() {
  if (!props.editor) {
    AirNotification.error('请先配置编辑器')
    return
  }
  await AirDialog.show(props.editor)
  onReloadData()
}

</script>
<style scoped lang="scss"></style>
