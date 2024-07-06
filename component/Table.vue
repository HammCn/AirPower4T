<template>
  <div
    :style="{ height: (autoHeight ? 'auto' : '0px') }"
    class="air-table-container"
  >
    <div class="air-table-tool-bar">
      <slot name="addButton" />
    </div>
    <el-table
      v-if="allFieldList"
      :id="tableId"
      ref="airTableRef"
      :data="dataList"
      :default-expand-all="defaultExpandAll"
      :lazy="lazy"
      :load="load"
      :row-key="(row: E) => row.id"
      :tree-props="treeProps"
      class="air-table"
      flexible
      height="100%"
      @select="handleSelectChanged"
      @select-all="handleSelectChanged"
      @sort-change="handleSortChanged"
    >
      <el-table-column
        v-if="showSelect"
        :reserve-selection="true"
        :selectable="isSelectable"
        fixed="left"
        type="selection"
        width="40"
      />
      <el-table-column
        v-if="!AirConfig.hideTableIndex && !hideIndex"
        :label="AirI18n.get().ID || '序号'"
        fixed="left"
        type="index"
        width="60"
      />
      <!-- 文本数据渲染 -->
      <template
        v-for="item in allFieldList"
        :key="item.key"
      >
        <el-table-column
          v-if="isFieldSelected(item)"
          :align="item.align"
          :fixed="item.fixed"
          :label="item.label"
          :min-width="item.minWidth || 'auto'"
          :prop="item.key"
          :sortable="item.sortable"
          :width="item.width || 'auto'"
        >
          <template #default="scope">
            <!-- 支持自定义插槽 -->
            <slot
              v-if="scope.$index>=0"
              :data="getRowEntity(scope)"
              :index="scope.$index"
              :name="item.key"
            >
              <span
                v-if="item.prefixText"
                style="color:#aaa;margin-right: 3px;"
              >{{ item.prefixText }}</span>
              <!-- 自动读取枚举 -->
              <div
                v-if="item.dictionary || getDictionary(entityInstance, item.key)"
                class="status"
              >
                <!-- 显示状态灯 -->
                <span
                  v-if="item.showColor"
                  :style="{
                    backgroundColor:
                      (item.dictionary || getDictionary(entityInstance, item.key) || new AirDictionaryArray())
                        .getColor(getRowEntityField(scope, item.key), AirColor.NORMAL)
                  }"
                  class="light"
                />
                {{
                  (
                    item.dictionary ||
                    getDictionary(entityInstance, item.key) ||
                    new AirDictionaryArray()
                  )

                    .getLabel(getRowEntityField(scope, item.key), item.emptyValue)
                }}
              </div>
              <!-- 是手机字段 -->
              <template v-else-if="item.phone">
                <APhone :phone="getStringValue(getRowEntityField(scope, item.key))" />
              </template>
              <!-- 是金额字段 -->
              <template v-else-if="item.money">
                <AMoney
                  :direction="item.moneyDirection"
                  :money="getRowEntityField(scope, item.key)"
                  :precision="item.moneyPrecision"
                />
              </template>
              <!-- 自动时间日期格式化 -->
              <template v-else-if="item.dateTimeFormatter">
                <ADateTime
                  :formatter="item.dateTimeFormatter"
                  :is-friendly="item.friendlyDateTime"
                  :time="getRowEntityField(scope, item.key)"
                />
              </template>
              <!-- 图片字段 -->
              <template v-else-if="item.image">
                <el-image
                  :preview-src-list="[AirFile.getStaticFileUrl(getRowEntityField(scope, item.key))]"
                  :src="AirFile.getStaticFileUrl(getRowEntityField(scope, item.key))"
                  :style="{ width: item.imageWidth + 'px', height: item.imageHeight + 'px', borderRadius: item.imageRadius }"
                  :z-index="999999"
                  fit="contain"
                  lazy
                  preview-teleported
                  style="background-color:#f3f6f9"
                >
                  <template #error>
                    <div class="image-error">
                      {{ AirI18n.get().Nothing || '暂无' }}
                    </div>
                  </template>
                </el-image>
              </template>
              <!-- 读取挂载数据 -->
              <template v-else-if="item.payloadField">
                <template v-if="item.copyField">
                  <div
                    :class="item.nowrap ? 'nowrap' : ''"
                    class="air-table-column"
                  >
                    <ACopy :content="getPayloadRowData(getRowEntity(scope), item)">
                      {{ getPayloadRowData(getRowEntity(scope), item) }}
                    </ACopy>
                  </div>
                </template>
                <template v-else>
                  <div
                    :class="item.nowrap ? 'nowrap' : ''"
                    class="air-table-column"
                  >
                    {{ getPayloadRowData(getRowEntity(scope), item) }}
                  </div>
                </template>
              </template>
              <!-- 通用字段 -->
              <template v-else>
                <template v-if="item.copyField">
                  <div
                    :class="item.nowrap ? 'nowrap' : ''"
                    class="air-table-column"
                  >
                    <ACopy :content="getStringValue(getRowEntityField(scope, item.key))">
                      {{
                        getStringValue(getRowEntityField(scope, item.key)) ?? item.emptyValue
                      }}
                    </ACopy>
                  </div>
                </template>
                <template v-else>
                  <div
                    :class="item.nowrap ? 'nowrap' : ''"
                    class="air-table-column"
                  >
                    {{
                      getStringValue(getRowEntityField(scope, item.key)) ?? item.emptyValue
                    }}
                  </div>
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
        :width="ctrlWidth || 'auto'"
        align="right"
        fixed="right"
      >
        <template #header>
          <div class="custom-header">
            <span
              v-if="!hideCtrl"
              class="custom-header-title"
            />
            <template v-if="isFieldSelectorEnabled">
              <el-icon
                v-tip="AirI18n.get().ConfigureTableColumns || '配置表格列'"
                class="air-field-select-icon"
                @click="isFieldSelectorShow = true"
              >
                <Setting />
              </el-icon>
            </template>
          </div>
        </template>
        <template #default="scope">
          <div class="ctrlRow">
            <!-- 自定义操作列前置插槽 -->
            <slot
              :data="getRowEntity(scope)"
              :index="scope.$index as number"
              name="customRow"
            />
            <template v-if="!hideCtrl">
              <AButton
                v-if="showAdd"
                :disabled="isAddDisabled(getRowEntity(scope))"
                :icon-button="!linkButton"
                :link-button="linkButton"
                :permission="addPermission || AirPermission.getPermission(entity, AirPermissionAction.ADD_CHILD)"
                :tooltip="AirI18n.get().AddSubItem || '添加子项'"
                type="ADD"
                @click="handleAdd(getRowEntity(scope))"
              >
                {{ AirI18n.get().Add || '添加' }}
              </AButton>
              <AButton
                v-if="isEditShowInline"
                :disabled="isEditDisabled(getRowEntity(scope))"
                :icon-button="!linkButton"
                :link-button="linkButton"
                :permission="editPermission || AirPermission.getPermission(entity, AirPermissionAction.EDIT)"
                :tooltip="AirI18n.get().Edit || '编辑'"
                type="EDIT"
                @click="handleEdit(getRowEntity(scope))"
              >
                {{ AirI18n.get().Edit || '编辑' }}
              </AButton>
              <AButton
                v-if="isDetailShowInline"
                :disabled="isDetailDisabled(getRowEntity(scope))"
                :icon-button="!linkButton"
                :link-button="linkButton"
                :permission="detailPermission || AirPermission.getPermission(entity, AirPermissionAction.DETAIL)"
                :tooltip="AirI18n.get().Detail || '详情'"
                type="DETAIL"
                @click="handleDetail(getRowEntity(scope))"
              >
                {{ AirI18n.get().Detail || '详情' }}
              </AButton>
              <template
                v-if="isEnableAndDisableShowInline && (AirConfig.tableShowEnableAndDisable || props.showEnableAndDisable)"
              >
                <AButton
                  v-if="getRowEntity(scope).isDisabled"
                  :disabled="isDisableChangeStatus(getRowEntity(scope))"
                  :icon-button="!linkButton"
                  :link-button="linkButton"
                  :permission="enablePermission || AirPermission.getPermission(entity, AirPermissionAction.ENABLE)"
                  :tooltip="AirI18n.get().Enable || '启用'"
                  type="CLOSE"
                  @click="handleEnable(getRowEntity(scope))"
                >
                  {{ AirI18n.get().Enable || '启用' }}
                </AButton>
                <AButton
                  v-else
                  :disabled="isDisableChangeStatus(getRowEntity(scope))"
                  :icon-button="!linkButton"
                  :link-button="linkButton"
                  :permission="disablePermission || AirPermission.getPermission(entity, AirPermissionAction.DISABLE)"
                  :tooltip="AirI18n.get().Disable || '禁用'"
                  type="CLOSE"
                  @click="handleDisable(getRowEntity(scope))"
                >
                  {{ AirI18n.get().Edit || '禁用' }}
                </AButton>
              </template>
              <AButton
                v-if="isDeleteShowInline"
                :danger="isForceDelete"
                :disabled="isDeleteDisabled(getRowEntity(scope))"
                :icon-button="!linkButton"
                :link-button="linkButton"
                :permission="deletePermission || AirPermission.getPermission(entity, AirPermissionAction.DELETE)"
                :tooltip="AirI18n.get().Delete || '删除'"
                type="DELETE"
                @click="handleDelete(getRowEntity(scope))"
              >
                {{ AirI18n.get().Delete || '删除' }}
              </AButton>
            </template>
            <!-- 自定义操作列后置插槽 -->
            <slot
              :data="getRowEntity(scope)"
              :index="scope.$index"
              name="endRow"
            />
            <el-dropdown
              v-if="showMoreButton"
              popper-class="air-table-more-button"
            >
              <span class="el-dropdown-link">
                <AButton link-button>[更多]</AButton>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <slot
                    :data="getRowEntity(scope)"
                    :index="scope.$index"
                    name="moreButtons"
                  />
                  <AButton
                    v-if="!hideEdit && editInMore"
                    :disabled="isEditDisabled(getRowEntity(scope))"
                    :icon-button="!linkButton"
                    :link-button="linkButton"
                    :permission="editPermission || AirPermission.getPermission(entity, AirPermissionAction.EDIT)"
                    :tooltip="AirI18n.get().Edit || '编辑'"
                    type="EDIT"
                    @click="handleEdit(getRowEntity(scope))"
                  >
                    {{ AirI18n.get().Edit || '编辑' }}
                  </AButton>
                  <AButton
                    v-if="showDetail && detailInMore"
                    :disabled="isDetailDisabled(getRowEntity(scope))"
                    :icon-button="!linkButton"
                    :link-button="linkButton"
                    :permission="detailPermission || AirPermission.getPermission(entity, AirPermissionAction.DETAIL)"
                    :tooltip="AirI18n.get().Detail || '详情'"
                    type="DETAIL"
                    @click="handleDetail(getRowEntity(scope))"
                  >
                    {{ AirI18n.get().Detail || '详情' }}
                  </AButton>
                  <template
                    v-if="enableAndDisableInMore && (AirConfig.tableShowEnableAndDisable || props.showEnableAndDisable)"
                  >
                    <AButton
                      v-if="getRowEntity(scope).isDisabled"
                      :disabled="isDisableChangeStatus(getRowEntity(scope))"
                      :icon-button="!linkButton"
                      :link-button="linkButton"
                      :permission="enablePermission || AirPermission.getPermission(entity, AirPermissionAction.ENABLE)"
                      :tooltip="AirI18n.get().Enable || '启用'"
                      type="CLOSE"
                      @click="handleEnable(getRowEntity(scope))"
                    >
                      {{ AirI18n.get().Enable || '启用' }}
                    </AButton>
                    <AButton
                      v-else
                      :disabled="isDisableChangeStatus(getRowEntity(scope))"
                      :icon-button="!linkButton"
                      :link-button="linkButton"
                      :permission="disablePermission || AirPermission.getPermission(entity, AirPermissionAction.DISABLE)"
                      :tooltip="AirI18n.get().Disable || '禁用'"
                      type="CLOSE"
                      @click="handleDisable(getRowEntity(scope))"
                    >
                      {{ AirI18n.get().Edit || '禁用' }}
                    </AButton>
                  </template>
                  <AButton
                    v-if="!hideDelete && deleteInMore"
                    :danger="isForceDelete"
                    :disabled="isDeleteDisabled(getRowEntity(scope))"
                    :icon-button="!linkButton"
                    :link-button="linkButton"
                    :permission="deletePermission || AirPermission.getPermission(entity, AirPermissionAction.DELETE)"
                    :tooltip="AirI18n.get().Delete || '删除'"
                    type="DELETE"
                    @click="handleDelete(getRowEntity(scope))"
                  >
                    {{ AirI18n.get().Delete || '删除' }}
                  </AButton>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <img
          alt=""
          src="../assets/img/empty.svg"
          style="width: 80px;"
        >
        <div>{{ emptyText || entityConfig.tableEmptyText || AirI18n.get().NoData || '暂无数据' }}</div>
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
            {{ AirI18n.get().SelectTableColumnsToShow || '选择要显示的列' }}
          </div>
          <div class="air-field-selector-list">
            <el-check-tag
              v-for="item in allFieldList"
              :key="item.key"
              :checked="!!selectedFieldList.find(i => i === item.key)"
              :class="item.forceShow ? 'disabled' : ''"
              :disabled="item.forceShow"
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

<script lang="ts" setup generic="E extends AirEntity">
import {
  computed, ComputedRef, nextTick, PropType, ref, watch,
} from 'vue'

import { Setting } from '@element-plus/icons-vue'
import { getEntityConfig } from '../decorator/EntityConfig'
import { AirSortType } from '../enum/AirSortType'
import { AirConfirm } from '../feedback/AirConfirm'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { AirTableInstance } from '../type/AirType'
import { AirColor } from '../enum/AirColor'
import { AirFile } from '../helper/AirFile'
import { AirSort } from '../model/AirSort'
import {
  AButton, ACopy, ADateTime, AMoney, APhone,
} from '.'
import { AirConfig } from '../config/AirConfig'
import { AirPermissionAction } from '../enum/AirPermissionAction'
import { AirPermission } from '../helper/AirPermission'
import { AirEntity } from '../base/AirEntity'
import { ITree } from '../interface/ITree'
import { AirStore } from '../store/AirStore'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { getDictionary } from '../decorator/Custom'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { AirI18n } from '../helper/AirI18n'
import { IJson } from '../interface/IJson'
import { AirCrypto } from '../helper/AirCrypto'
import { ITreeProps } from '../interface/props/ITreeProps'
import { ClassConstructor } from '../type/ClassConstructor'

const emits = defineEmits<{
  onDetail: [row: E],
  onDelete: [row: E]
  onEdit: [row: E]
  onSelect: [list: E[]]
  onAdd: [row: E]
  onSort: [sort?: AirSort]
  onDisable: [row: E]
  onEnable: [row: E]
}>()
const props = defineProps({
  /**
   * # 表格使用链接按钮
   */
  linkButton: {
    type: Boolean,
    default: AirConfig.tableLinkButton,
  },

  /**
   * # 行尾编辑按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```editPermission``` 配置
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾禁用按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```disablePermission``` 配置
   */
  disablePermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 行尾启用按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```enablePermission``` 配置
   */
  enablePermission: {
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
    type: Array<E>,
    required: true,
  },

  /**
   * # 默认选中的数据数组
   */
  selectList: {
    type: Array<E>,
    default: () => [],
  },

  /**
   * # 显示字段列表
   * 如传入 则优先使用
   */
  fieldList: {
    type: Array<AirTableFieldConfig>,
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
    // eslint-disable-next-line no-unused-vars
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否禁用行内添加按钮的回调方法
   */
  disableAdd: {
    // eslint-disable-next-line no-unused-vars
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否允许操作禁用启用
   */
  disableChangeStatus: {
    // eslint-disable-next-line no-unused-vars
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否禁用行内详情按钮的回调方法
   */
  disableDetail: {
    // eslint-disable-next-line no-unused-vars
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 控制是否禁用行内删除按钮的回调方法
   */
  disableDelete: {
    // eslint-disable-next-line no-unused-vars
    type: Function as PropType<(row: E) => boolean>,
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
   * # 控制是否禁用多选按钮的回调方法
   */
  selectable: {
    // eslint-disable-next-line no-unused-vars
    type: Function as PropType<(row: E) => boolean>,
    default: null,
  },

  /**
   * # 是否显示多选框
   * ---
   * 💡 可触发 ```@on-select(selectList)``` 事件, 可配置 ```:select-list``` 默认选中
   */
  showSelect: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示禁用启用
   */
  showEnableAndDisable: {
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
   * # 表格字段缓存Key
   */
  fieldCacheKey: {
    type: String,
    default: AirCrypto.base64Encode(window.location.pathname),
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
    // eslint-disable-next-line vue/require-valid-default-prop
    default: 'auto',
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
  hideCtrl: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示详情按钮
   */
  showDetail: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示添加按钮
   */
  showAdd: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否自定义删除事件
   */
  customDelete: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否显示更多的下拉按钮
   */
  showMoreButton: {
    type: Boolean,
    default: false,
  },

  /**
   * # 在更多里显示删除
   * ---
   * 💡 仅在 `showMoreButton=true` 时有效，且 `deleteInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  deleteInMore: {
    type: Boolean,
    default: true,
  },

  /**
   * # 在更多里显示编辑
   * ---
   * 💡 仅在 `showMoreButton=true` 时有效，且 `editInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  editInMore: {
    type: Boolean,
    default: false,
  },

  /**
   * # 在更多里显示禁用启用
   * ---
   * 💡 仅在 `showMoreButton=true` 时有效，且 `enableAndDisableInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  enableAndDisableInMore: {
    type: Boolean,
    default: true,
  },

  /**
   * # 在更多里显示详情
   * ---
   * 💡 仅在 `showMoreButton=true` 时有效，且 `detailInMore=true` 时被收起到更多，否则保持表格行内显示
   */
  detailInMore: {
    type: Boolean,
    default: true,
  },

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
    type: Function as unknown as PropType<ClassConstructor<E>>,
    required: true,
  },

  /**
   * # 树结构的标准配置
   */
  treeProps: {
    type: Object as PropType<ITreeProps>,
    default: () => ({}),
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
 * 表格dom
 */
const airTableRef = ref<AirTableInstance>()

/**
 * Table的ID
 */
const tableId = `tb_${Math.floor(Math.random() * 1000)}`

/**
 * # 无需二次确认 强制删除
 */
const isForceDelete = ref(false)

/**
 * # 显示字段选择器
 */
const isFieldSelectorShow = ref(false)

/**
 * 选择的字段
 */
const selectedFieldList = ref<string[]>([])

/**
 * # Entity的实例
 */
const entityInstance = computed(() => {
  if (props.entity) {
    try {
      return AirClassTransformer.newInstance(props.entity)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ATable创建实例失败', e)
    }
  }
  return new AirEntity()
})

/**
 * # 显示按下快捷键的提醒
 */
watch(() => AirStore().controlKeyDown, () => {
  isForceDelete.value = !!(AirStore().controlKeyDown
    && !props.customDelete
    && !props.hideDelete
    && props.dataList
    && props.dataList.length > 0)
})

/**
 * # 内部使用的配置
 */
const entityConfig = computed(() => getEntityConfig(entityInstance.value))

/**
 * # 字段选择器是否启用
 */
const isFieldSelectorEnabled = computed(() => {
  if (entityConfig.value.hideFieldSelector) {
    // 全局标记了隐藏
    return false
  }
  // 读取传入配置是否隐藏
  return !props.hideFieldSelector
})

/**
 * # 所有的字段
 */
const allFieldList: ComputedRef<AirTableFieldConfig[]> = computed(() => {
  // 如果传入fieldList 优先使用fieldList
  if (props.fieldList.length > 0) {
    // 过滤没有隐藏且没有移除的列
    return props.fieldList.filter((item) => !item.removed)
      .map((item) => {
        if (item.money && !item.align) {
          item.align = 'right'
        }
        return item
      })
  }
  return (entityInstance.value.getTableFieldConfigList()
    .filter((item) => !item.removed) || []).map((item) => {
    if (item.dictionary) {
      item.dictionary = AirDictionaryArray.create(item.dictionary)
    }
    if (item.money && !item.align) {
      item.align = 'right'
    }
    return item
  })
})

const selectFieldListKey = computed(() => `field_list_of_${AirConfig.appKey}_${entityInstance.value.constructor.name}_${props.fieldCacheKey}`)

const isAddDisabled = (row: E) => (props.disableAdd
  ? props.disableAdd(row)
  : false)
const isDisableChangeStatus = (row: E) => (props.disableChangeStatus
  ? props.disableChangeStatus(row)
  : false)
const isDeleteDisabled = (row: E) => (props.disableDelete
  ? props.disableDelete(row)
  : false)
const isDetailDisabled = (row: E) => (props.disableDetail
  ? props.disableDetail(row)
  : false)
const isEditDisabled = (row: E) => (props.disableEdit
  ? props.disableEdit(row)
  : false)
const isSelectable = (row: E) => (props.selectable
  ? props.selectable(row)
  : true)

//! 计算按钮是否显示
const isDeleteShowInline = computed(() => {
  if (props.hideDelete) {
    return false
  }
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.deleteInMore
})

const isEditShowInline = computed(() => {
  if (props.hideEdit) {
    return false
  }
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.editInMore
})

const isEnableAndDisableShowInline = computed(() => {
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.enableAndDisableInMore
})

const isDetailShowInline = computed(() => {
  if (!props.showDetail) {
    return false
  }
  if (!props.showMoreButton) {
    return true
  }
  return props.showMoreButton && !props.detailInMore
})

/**
 * # 获取字符串值
 * @param data 数据
 */
function getStringValue(data: string | number | object | undefined | null) {
  if (data === undefined || data === null) {
    return ''
  }
  return data.toString()
}

/**
 * # 更新已选字段
 */
function updateSelectedFieldList() {
  selectedFieldList.value = []
  if (AirConfig.tableFieldCacheEnabled) {
    const fieldListCache: string[] = JSON.parse(localStorage.getItem(selectFieldListKey.value) || '[]')
    if (fieldListCache.length > 0 && !props.hideFieldSelector) {
      selectedFieldList.value = fieldListCache
      return
    }
  }
  selectedFieldList.value = allFieldList.value.filter(
    (item) => !item.removed && !item.hide,
  )
    .map((item) => item.key)
}

/**
 * # 字段选择变更事件
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

  localStorage.setItem(selectFieldListKey.value, JSON.stringify(selectedFieldList.value))
}

/**
 * # 字段是否选择
 */
function isFieldSelected(item: AirTableFieldConfig) {
  if (!item.key) {
    return false
  }
  return selectedFieldList.value.indexOf(item.key) >= 0
}

/**
 * # 获取指定字段的payload数据
 * @param row 行
 * @param config 配置信息
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPayloadRowData(row: IJson, config: AirTableFieldConfig) {
  if (config.key && config.payloadField && row[config.key]) {
    if (!config.payloadArray) {
      // 对象挂载
      return row[config.key][config.payloadField] || config.emptyValue
    }
    if (row[config.key] && row[config.key].length > 0) {
      // 对象数组挂载
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return row[config.key].map((i: any) => i[config.payloadField || ''])
        .join(config.arraySplitor)
    }
  }
  return config.emptyValue
}

/**
 * # 选中行
 */
function selectRow(list: ITree[]) {
  for (const row of list) {
    airTableRef.value?.toggleRowSelection(row, false)
    for (const selectedRow of props.selectList) {
      // 遍历每一行
      if (selectedRow.id === row.id) {
        airTableRef.value?.toggleRowSelection(row, true)
        // eslint-disable-next-line no-continue
      }
    }
    if (row.children && row.children.length > 0) {
      selectRow(row.children)
    }
  }
}

/**
 * # 回显选中
 */
function toggleSelection() {
  selectRow(props.dataList as unknown as ITree[])
}

/**
 * # 添加按钮点击事件
 * @param item 行数据
 */
function handleAdd(item: E) {
  emits('onAdd', item)
}

/**
 * # 详情按钮点击事件
 * @param item 详情数据
 */
function handleDetail(item: E) {
  emits('onDetail', item)
}

/**
 * # 编辑按钮点击事件
 * @param item 编辑的数据
 */
function handleEdit(item: E) {
  emits('onEdit', item)
}

/**
 * # 启用按钮点击事件
 * @param item 编辑的数据
 */
function handleEnable(item: E) {
  emits('onEnable', item)
}

/**
 * # 禁用按钮点击事件
 * @param item 编辑的数据
 */
function handleDisable(item: E) {
  emits('onDisable', item)
}

/**
 * # 单个删除
 * @param item
 */
async function handleDelete(item: E) {
  if (props.customDelete) {
    emits('onDelete', item)
    return
  }
  try {
    if (!AirStore().controlKeyDown) {
      let title: string
      let content: string
      // 如果实体传入 则尝试自动获取

      title = AirI18n.get().DeleteConfirm || '确认删除'
      content = AirI18n.get().AreYouConfirmToDelete || '是否确认删除选择的数据'

      // 如果传入配置项 则覆盖实体标注的内容
      if (props.deleteTitle) {
        title = props.deleteTitle
      }
      if (props.deleteContent) {
        content = props.deleteContent
      }
      await AirConfirm.create()
        .dangerButton()
        .enableEscClose()
        .setConfirmText(title)
        .show(content, title)
    }
    emits('onDelete', item)
  } catch (e) {
    // 取消删除
  }
}

/**
 * # 是否在当前页数据中
 */
function inCurrentPage(list: E[], find: E): boolean {
  const isIn = false
  for (let i = 0; i < list.length; i += 1) {
    const row = list[i]
    if (row.id === find.id) {
      return true
    }
    if ((row as IJson).children && (row as IJson).children.length > 0) {
      return inCurrentPage((row as IJson).children, find)
    }
  }
  return isIn
}

/**
 * # 选中事件
 * @param list 选中的列表
 */
function handleSelectChanged(list: E[]) {
  // 在当前页面没找到的数据 保持选中
  const selectAll = list.map((item) => item.copy())
  list.forEach((find) => {
    if (!inCurrentPage(props.dataList, find)) {
      selectAll.push(find)
    }
  })
  emits('onSelect', selectAll)
}

/**
 * # 排序事件
 * @param data
 */
function handleSortChanged(data: { prop: string; order: string }) {
  if (data.prop) {
    const sort = new AirSort()
    sort.field = data.prop
    sort.direction = data.order === 'descending' ? AirSortType.DESC : AirSortType.ASC
    emits('onSort', sort)
  } else {
    emits('onSort', undefined)
  }
}

/**
 * # 获取行的实体数据
 * @param scope
 */
function getRowEntity(scope: IJson): E {
  return scope.row
}

/**
 * # 获取行的数据列
 * @param scope Scope
 * @param key 字段
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRowEntityField(scope: IJson, key: string): any {
  return scope.row[key]
}

// 初始化
function init() {
  // 初始更新
  updateSelectedFieldList()
}

/**
 * # 监听传入字段列表变化
 */
watch(() => props.fieldList, () => {
  updateSelectedFieldList()
})

/**
 * # 监听传入数据变化
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
 * # 监听选择的数组列表
 */
watch(
  () => props.selectList,
  () => {
    nextTick(() => {
      if (airTableRef.value) {
        airTableRef.value.clearSelection()
      }
      toggleSelection()
    })
  },
)

init()
</script>

<style lang="scss">
.ctrlRow {
  display: flex;
  padding-right: 8px;

  .el-button--default {
    font-weight: normal;
    color: var(--primary-color);
  }

  .el-button + .el-button {
    margin-left: 0;
  }

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

.ctrlRow + .el-button {
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
      background-color: rgba($color: #000000, $alpha: 0.05);
    }

    &-dialog {
      box-shadow: 0 0 20px rgb(0 0 0 / 20%);
      position: absolute;
      right: 30px;
      top: 30px;
      background-color: white;
      width: 350px;
      z-index: 101;
      border-radius: 6px;
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

.air-table-tool-bar > * {
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

  .is-right .cell {
    justify-content: flex-end;
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

.air-table-more-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 120px;

  .el-scrollbar {
    width: 100%;
  }

  .air-button {
    width: 100%;
    padding: 8px 0;
    color: var(--primary-color);
    font-weight: normal !important;
    background-color: transparent;
  }

  .air-button + .air-button {
    margin: 0 !important;
  }
}
</style>
