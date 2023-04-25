<template>
  <div
    class="air-table-container"
    :style="{ height: (autoHeight ? 'auto' : '0px') }"
  >
    <div class="air-table-tool-bar">
      <slot name="addButton" />
    </div>
    <el-table
      v-if="allFieldList"
      :id="tableId"
      ref="airTableRef"
      class="air-table"
      :row-key="(row: any) => row.id"
      :lazy="lazy"
      :load="load"
      :default-expand-all="defaultExpandAll"
      :tree-props="treeProps"
      :data="dataList"
      height="100%"
      @select="selectChanged"
      @select-all="selectChanged"
      @sort-change="sortChanged"
    >
      <el-table-column
        v-if="!hideSelect"
        type="selection"
        width="40"
        fixed="left"
        :reserve-selection="true"
      />
      <el-table-column
        v-if="!hideIndex"
        type="index"
        label="序号"
        fixed="left"
        width="60"
      />
      <!-- 文本数据渲染 -->
      <template
        v-for="item in allFieldList"
        :key="item.key"
      >
        <el-table-column
          v-if="isSelected(item)"
          :prop="item.key"
          :label="item.label"
          :width="item.width || 'auto'"
          :min-width="item.minWidth || 'auto'"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :align="item.align"
        >
          <template #default="scope">
            <!-- 支持自定义插槽 -->
            <slot
              :name="item.key"
              :data="(scope as any).row"
              :index="(scope as any).$index"
            >
              <!-- 自动读取枚举 -->
              <div
                v-if="item.enumRecord"
                class="status"
              >
                <!-- 显示状态灯 -->
                <span
                  v-if="item.showStatus"
                  class="light"
                  :style="{
                    backgroundColor:
                      item.enumRecord.getColor((scope as any).row[item.key], AirColor.NORMAL)
                  }"
                />
                {{ item.enumRecord.getLabel((scope as any).row[item.key], item.emptyValue) }}
              </div>
              <!-- 自动时间日期格式化 -->
              <template v-else-if="item.dateTimeFormatter">
                <ADateTime
                  :time="(scope as any).row[item.key]"
                  :formatter="item.dateTimeFormatter"
                  :is-friendly="item.isFriendlyDateTime"
                />
              </template>
              <!-- 图片字段 -->
              <template v-else-if="item.isImage">
                <el-image
                  style="background-color:#f3f6f9"
                  :style="{ width: item.imageWidth + 'px', height: item.imageHeight + 'px' }"
                  lazy
                  :src="AirFileHelper.getStaticFileUrl((scope as any).row[item.key])"
                  :preview-src-list="[AirFileHelper.getStaticFileUrl((scope as any).row[item.key])]"
                  :z-index="999999"
                  preview-teleported
                  fit="contain"
                >
                  <template #error>
                    <div class="image-error">
                      暂无
                    </div>
                  </template>
                </el-image>
              </template>
              <!-- 读取挂载数据 -->
              <template v-else-if="item.payloadField">
                <template v-if="item.isCopyField">
                  <el-popover
                    :width="400"
                    trigger="click"
                    :content="(scope as any).row[item.key] || item.emptyValue"
                  >
                    <template #reference>
                      <div
                        class="air-table-column"
                        :class="item.nowrap ? 'nowrap' : ''"
                      >
                        <ACopy :content="getPayloadRowData((scope as any).row, item)">
                          {{ getPayloadRowData((scope as any).row, item) }}
                        </ACopy>
                      </div>
                    </template>
                  </el-popover>
                </template>
                <template v-else>
                  <el-popover
                    :disabled="!item.nowrap"
                    :width="400"
                    trigger="click"
                    :content="getPayloadRowData((scope as any).row, item) || item.emptyValue"
                  >
                    <template #reference>
                      <div
                        class="air-table-column"
                        :class="item.nowrap ? 'nowrap' : ''"
                      >
                        {{ getPayloadRowData((scope as any).row, item) }}
                      </div>
                    </template>
                  </el-popover>
                </template>
              </template>
              <!-- 通用字段 -->
              <template v-else>
                <template v-if="item.isCopyField">
                  <div
                    class="air-table-column"
                    :class="item.nowrap ? 'nowrap' : ''"
                  >
                    <ACopy :content="(scope as any).row[item.key]">
                      {{
                        (scope as any).row[item.key] || item.emptyValue
                      }}
                    </ACopy>
                  </div>
                </template>
                <template v-else>
                  <el-popover
                    :disabled="!item.nowrap"
                    :width="400"
                    trigger="click"
                    :content="(scope as any).row[item.key] || item.emptyValue"
                  >
                    <template #reference>
                      <div
                        class="air-table-column"
                        :class="item.nowrap ? 'nowrap' : ''"
                      >
                        {{ (scope as any).row[item.key] || item.emptyValue }}
                      </div>
                    </template>
                  </el-popover>
                </template>
              </template>
              <span
                v-if="item.suffixText"
                style="color:#aaa"
              >{{ item.suffixText }}</span>
            </slot>
          </template>
        </el-table-column>
      </template>
      <!-- 如果没有隐藏操作列 或者字段选择器启用 -->
      <el-table-column
        v-if="!hideCtrl || isFieldSelectorEnabled"
        fixed="right"
        align="right"
        :width="ctrlWidth || 'auto'
        "
      >
        <template #header>
          <div class="custom-header">
            <span
              v-if="!hideCtrl"
              class="custom-header-title"
            >操作</span>
            <template v-if="isFieldSelectorEnabled">
              <el-tooltip
                effect="customized"
                content="配置列字段"
                placement="top"
              >
                <el-icon
                  class="air-field-select-icon"
                  @click="isFieldSelectorShow = true"
                >
                  <Setting />
                </el-icon>
              </el-tooltip>
            </template>
          </div>
        </template>
        <template #default="scope">
          <div class="ctrlRow">
            <!-- 自定义操作列前置插槽 -->
            <slot
              name="customRow"
              :data="(scope as any).row"
              :index="(scope as any).$index"
            />
            <template v-if="!hideCtrl">
              <AButton
                v-if="showAdd"
                icon-button
                type="ADD"
                :disabled="isAddDisabled((scope as any).row)"
                :tooltip="isAddDisabled((scope as any).row) ? '禁止添加' : '添加'"
                :permission="addPermission || AirPermissionHelper.getPermissionFlag(entity, AirPermissionAction.ADD_CHILD)"
                @click="handleAdd((scope as any).row)"
              />
              <AButton
                v-if="!hideEdit"
                icon-button
                type="EDIT"
                :disabled="isEditDisabled((scope as any).row)"
                :tooltip="isEditDisabled((scope as any).row) ? '禁止编辑' : '编辑'"
                :permission="editPermission || AirPermissionHelper.getPermissionFlag(entity, AirPermissionAction.EDIT)"
                @click="handleEdit((scope as any).row)"
              />
              <AButton
                v-if="showDetail"
                icon-button
                type="DETAIL"
                :disabled="isDetailDisabled((scope as any).row)"
                :tooltip="isDetailDisabled((scope as any).row) ? '禁止查看详情' : '查看详情'"
                :permission="detailPermission || AirPermissionHelper.getPermissionFlag(entity, AirPermissionAction.DETAIL)"
                @click="handleDetail((scope as any).row)"
              />
              <AButton
                v-if="!hideDelete"
                icon-button
                type="DELETE"
                danger
                :disabled="isDeleteDisabled((scope as any).row)"
                :tooltip="isDeleteDisabled((scope as any).row) ? '禁止删除' : '删除'"
                :permission="deletePermission || AirPermissionHelper.getPermissionFlag(entity, AirPermissionAction.DELETE)"
                @click="handleDelete((scope as any).row)"
              />
            </template>
            <!-- 自定义操作列后置插槽 -->
            <slot
              name="endRow"
              :data="(scope as any).row"
              :index="(scope as any).$index"
            />
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <img src="../assets/img/empty.svg">
        <div>{{ emptyText || entityConfig.tableEmptyText || '暂无数据' }}</div>
      </template>
    </el-table>
    <div class="air-field-selector">
      <div
        v-if="isFieldSelectorShow"
        class="air-field-selector-bg"
        @click.self="isFieldSelectorShow = false"
      />
      <transition name="search">
        <div
          v-if="isFieldSelectorShow"
          class="air-field-selector-dialog"
        >
          <div class="air-field-selector-title">
            请选择需要显示的字段
          </div>
          <div class="air-field-selector-list">
            <el-check-tag
              v-for="item in allFieldList"
              :key="item.key"
              :disabled="item.forceShow"
              :checked="!!selectedFieldList.find(i => i === item.key)"
              @change="fieldSelectChanged($event, item)"
            >
              {{ item.label }}
            </el-check-tag>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, PropType, watch, nextTick, computed,
} from 'vue'
import { ClassConstructor } from 'class-transformer'
import { getClassName } from '../decorator/CustomName'
import { getEntityConfig } from '../decorator/EntityConfig'
import { AirSortType } from '../enum/AirSortType'
import { AirConfirm } from '../feedback/AirConfirm'
import { ITreeProps } from '../interface/ITreeProps'
import { AirEntityConfig } from '../config/AirEntityConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirTableInstance } from '../type/AirType'
import { AirColor } from '../enum/AirColor'
import { AirFileHelper } from '../helper/AirFileHelper'
import { AirSort } from '../dto/AirSort'
import { ADateTime, ACopy, AButton } from '.'
import { AirConfig } from '../AirConfig'
import { AirPermissionAction } from '../enum/AirPermissionAction'
import { AirPermissionHelper } from '../helper/AirPermissionHelper'
import { AirEntity } from '../dto/AirEntity'

const props = defineProps({
  /**
   * # 行尾编辑按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```editPermission``` 配置
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾详情按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```detailPermission``` 配置
   */
  detailPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾删除按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```deletePermission``` 配置
   */
  deletePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾添加按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```addChildPermission``` 配置
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 表格显示的数据数组
   */
  dataList: {
    type: Array as PropType<AirEntity[]>,
    default: () => [],
  },

  /**
   * # 默认选中的数据数组
   */
  selectList: {
    type: Array as PropType<AirEntity[]>,
    default: () => [],
  },

  /**
   * # 显示字段列表
   * 如传入 则优先使用
   */
  fieldList: {
    type: Array as PropType<AirTableFieldConfig[]>,
    default: () => [],
  },

  /**
   * # 默认表格空文案
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```tableEmptyText``` 配置
   */
  emptyText: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否隐藏编辑按钮
   */
  hideEdit: {
    type: Boolean,
    default: false,
  },

  /**
   * # 控制是否禁用行内编辑按钮的回调方法
   */
  disableEdit: {
    type: Function,
    default: null,
  },

  /**
   * # 控制是否禁用行内添加按钮的回调方法
   */
  disableAdd: {
    type: Function,
    default: null,
  },

  /**
   * # 控制是否禁用行内详情按钮的回调方法
   */
  disableDetail: {
    type: Function,
    default: null,
  },

  /**
   * # 控制是否禁用行内删除按钮的回调方法
   */
  disableDelete: {
    type: Function,
    default: null,
  },

  /**
   * # 是否隐藏删除按钮
   */
  hideDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏多选框
   */
  hideSelect: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏序号
   */
  hideIndex: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏字段选择
   * 如 ```EntityConfig``` 的 ```hideFieldSelector``` 设置为 ```true```, 则此项失效
   */
  hideFieldSelector: {
    type: Boolean,
    default: false,
  },

  /**
   * # 操作区宽度
   */
  ctrlWidth: {
    type: Number,
    default: 0,
  },

  /**
   * # 自动撑起高度
   * 默认fix滚动
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否隐藏操作按钮
   */
  hideCtrl: Boolean,

  /**
   * # 是否显示详情按钮
   */
  showDetail: Boolean,

  /**
   * # 是否显示添加按钮
   */
  showAdd: Boolean,

  /**
   * # 是否自定义删除事件
   */
  customDelete: Boolean,

  /**
   * # 是否懒加载
   */
  lazy: Boolean,

  /**
   * # 删除确认框提示标题
   */
  deleteTitle: {
    type: String,
    default: '',
  },

  /**
   * # 删除确认框提示内容
   */
  deleteContent: {
    type: String,
    default: '',
  },

  /**
   * # 表格绑定的数据实体
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<AirEntity>>,
    default: AirEntity,
  },

  /**
   * # 树结构的标准配置
   */
  treeProps: {
    type: Object as PropType<ITreeProps>,
    default: () => ({
    }),
  },

  /**
   * # 懒加载的方法注入
   */
  load: {
    type: Function,
    default: null,
  },

  /**
   * # 是否展开树的所有项目
   */
  defaultExpandAll: {
    type: Boolean,
    default: true,
  },
})

/**
 * # 显示字段选择器
 */
const isFieldSelectorShow = ref(false)

/**
 * 选择的字段
 */
const selectedFieldList = ref([] as string[])

/**
 * 内部使用的配置
 */
let entityConfig: AirEntityConfig = new AirEntityConfig()

/**
 * 字段选择器是否启用
 */
const isFieldSelectorEnabled = computed(() => {
  if (entityConfig.hideFieldSelector) {
    // 全局标记了隐藏
    return false
  }
  // 读取传入配置是否隐藏
  return !props.hideFieldSelector
})

/**
 * 所有的字段
 */
const allFieldList = computed(() => {
  // 如果传入fieldList 优先使用fieldList
  if (props.fieldList.length > 0) {
    // 过滤没有隐藏且没有移除的列
    return props.fieldList.filter((item) => !item.removed)
  }
  return (props.entity.prototype as AirEntity)
    .getTableFieldConfigList()
    .filter((item) => !item.removed) || []
})

/**
 * 更新已选字段
 */
function updateSelectedFieldList() {
  selectedFieldList.value = []
  selectedFieldList.value = (allFieldList.value || []).filter(
    (item) => !item.removed && !item.hide,
  ).map((item) => item.key)

  const fieldListCache: string[] = JSON.parse(localStorage.getItem(`field_list_of_${AirConfig.appId}_${props.entity.name}`) || '[]')
  if (fieldListCache.length > 0) {
    selectedFieldList.value = fieldListCache
  }
}

/**
 * 字段选择变更事件
 * @param status 是否即将选择
 * @param config 配置
 */
function fieldSelectChanged(status: boolean, config: AirTableFieldConfig) {
  if (config.forceShow) {
    return
  }
  for (let i = 0; i < selectedFieldList.value.length; i += 1) {
    if (config.key === selectedFieldList.value[i]) {
      selectedFieldList.value.splice(i, 1)
      break
    }
  }
  if (status) {
    selectedFieldList.value.push(config.key)
  }

  localStorage.setItem(`field_list_of_${AirConfig.appId}_${props.entity.name}`, JSON.stringify(selectedFieldList.value))
}

// 初始化
function init() {
  entityConfig = getEntityConfig(props.entity)
  // 初始更新
  updateSelectedFieldList()
}

const isAddDisabled = (row: typeof props.entity) => (props.disableAdd
  ? props.disableAdd(row)
  : false)
const isDeleteDisabled = (row: typeof props.entity) => (props.disableDelete
  ? props.disableDelete(row)
  : false)
const isDetailDisabled = (row: typeof props.entity) => (props.disableDetail
  ? props.disableDetail(row)
  : false)
const isEditDisabled = (row: typeof props.entity) => (props.disableEdit
  ? props.disableEdit(row)
  : false)

// 监听传入字段列表变化
watch(() => props.fieldList, () => {
  updateSelectedFieldList()
})

/**
 * 字段是否选择
 */
function isSelected(item: AirTableFieldConfig) {
  if (!item.key) {
    return false
  }
  return selectedFieldList.value.indexOf(item.key) >= 0
}

/**
 * 获取指定字段的payload数据
 * @param row 行
 * @param config 配置信息
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPayloadRowData(row: any, config: AirTableFieldConfig) {
  if (config.key && config.payloadField && row[config.key]) {
    if (!config.payloadArray) {
      // 对象挂载
      return row[config.key][config.payloadField] || config.emptyValue
    }
    if (row[config.key] && row[config.key].length > 0) {
      // 对象数组挂载
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return row[config.key].map((i: any) => i[config.payloadField || '']).join(config.arraySplitor)
    }
  }
  return config.emptyValue
}

const emits = defineEmits(['onDetail', 'onDelete', 'onEdit', 'onSelect', 'onAdd', 'onSort'])

/**
 * 表格dom
 */
const airTableRef = ref<AirTableInstance>()

/**
 * Table的ID
 */
const tableId = `tb_${Math.floor(Math.random() * 1000)}`

/**
 * 回显选中
 */
function toggleSelection() {
  if (airTableRef.value) { airTableRef.value.clearSelection() }
  for (const row of props.dataList) {
    for (const selectedRow of props.selectList) {
      if (
        (selectedRow as AirEntity).id
        === (row as AirEntity).id && airTableRef.value
      ) {
        airTableRef.value.toggleRowSelection(row, true)
      }
    }
  }
}

/**
 * 监听传入数据变化
 */
watch(
  () => props.dataList,
  () => {
    nextTick(() => {
      toggleSelection()

      // 分页后滚动条置顶
      const table = document.querySelector(`#${tableId}`)
      const bodyWrapp = table?.querySelector('.el-scrollbar__wrap') as HTMLElement
      bodyWrapp.scrollTop = 0
    })
  },
)

/**
 * 监听选择的数组列表
 */
watch(
  () => props.selectList,
  () => {
    nextTick(() => {
      toggleSelection()
    })
  },
)

/**
 * 添加按钮点击事件
 * @param item 行数据
 */
function handleAdd(item: AirEntity) {
  emits('onAdd', item)
}

/**
 * 详情按钮点击事件
 * @param item 详情数据
 */
function handleDetail(item: AirEntity) {
  emits('onDetail', item)
}

/**
 * 编辑按钮点击事件
 * @param item 编辑的数据
 */
function handleEdit(item: AirEntity) {
  emits('onEdit', item)
}

/**
 * 单个删除 单个删除
 * @param item
 */
async function handleDelete(item: AirEntity) {
  if (props.customDelete) {
    emits('onDelete', item)
    return
  }
  try {
    let title = '删除提醒'
    let content = '是否确认删除当前选中的数据？'
    // 如果实体传入 则尝试自动获取

    const entityName = getClassName(props.entity)
    title = `删除${entityName}提醒`
    content = `是否确认删除当前选中的${entityName}？`

    // 如果传入配置项 则覆盖实体标注的内容
    if (props.deleteTitle) {
      title = props.deleteTitle
    }
    if (props.deleteContent) {
      content = props.deleteContent
    }
    await new AirConfirm()
      .setTitle(title)
      .setContent(content)
      .setConfirmText('确定')
      .setCancelText('取消')
      .warning()
    emits('onDelete', item)
  } catch (e) {
    // 取消删除
  }
}

/**
 * 选中事件
 * @param list 选中的列表
 */
function selectChanged(list: AirEntity[]) {
  // 保持其他页码数据的选中状态，因为list只会返回当前页选中数据
  const otherPage = (props.selectList || []).filter(
    (item) => props.dataList?.findIndex(
      (data) => data.id === item.id,
    ) === -1,
  )
  const selectAll = list.concat(otherPage)
  emits('onSelect', selectAll)
}

/**
 * 排序事件
 * @param data
 */
function sortChanged(data: { prop: string; order: string }) {
  if (data.prop) {
    const sort = new AirSort()
    sort.field = data.prop
    sort.direction = data.order === 'descending' ? AirSortType.DESC : AirSortType.ASC
    emits('onSort', sort)
  } else {
    emits('onSort', undefined)
  }
}

init()
</script>

<style lang="scss">
.ctrlRow {
  display: flex;

  .el-link.is-underline:hover:after {
    border-bottom: none;
  }

  .el-link {
    font-size: 16px;
    padding: 0 5px;
  }

  .el-link:not(.el-link--danger) {
    --el-link-text-color: var(--label-color);
  }
}

.ctrlRow+.el-button {
  margin-left: 12px;
}

.air-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
  position: relative;

  .air-field-selector {
    z-index: 100;

    .el-check-tag {
      font-weight: normal !important;
      user-select: none;
      font-size: 13px;
      margin-right: 5px;
      margin-bottom: 5px;
      padding: 4px 10px;
    }

    &-bg {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.1);
    }

    &-dialog {
      box-shadow: 0px 0px 20px rgb(0 0 0 / 30%);
      position: absolute;
      right: 30px;
      top: 30px;
      background-color: white;
      width: 350px;
      z-index: 101;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .air-field-selector-title {
        margin-bottom: 10px;
        border-bottom: 1px solid var(--el-color-primary-light-9);
        padding: 8px 16px;
        font-size: 15px;
      }

      .air-field-selector-list {
        padding: 5px 15px 15px 15px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        overflow-y: auto;
        flex: 1;
        height: 0;
        align-content: flex-start;
      }
    }
  }

  .image-error {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    background-color: #f3f6f9;
    color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.air-table-tool-bar>* {
  margin-bottom: 10px;
}

.air-table {
  flex: 1;
  height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  thead .cell {
    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;
    text-overflow: ellipsis;
  }

  td .cell {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .air-table-column.nowrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    cursor: pointer;
    user-select: none;
  }

  .air-table-column.nowrap * {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    cursor: pointer;
    user-select: none;
    display: inherit;
  }

  .el-table__placeholder {
    display: none;
  }

  .el-table__indent {
    margin-right: 5px;
  }

  .el-table__empty-text {
    line-height: 40px;
  }

  .el-table__header-wrapper {
    background-color: var(--el-color-primary-light-9);
    border-radius: 5px;

    th {
      background-color: var(--el-color-primary-light-9) !important;
    }
  }

  .el-table__body-wrapper {
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;

    .el-scrollbar__view {
      height: 100%;
    }
  }

  .custom-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .custom-header-title {
      flex: 1;
      text-align: left;
      margin-left: 3px;
    }

    .air-field-select-icon {
      font-size: 16px;
      transition: all 0.3s;
      cursor: pointer;
      overflow: hidden;
      position: relative;
    }

    .el-icon:hover {
      color: var(--primary-color);
    }
  }

  .status {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .light {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    display: inline-block;
    margin-right: 4px;
    margin-top: -1px;
  }

  .row-delete {
    color: var(--el-color-error);
  }

}
</style>
