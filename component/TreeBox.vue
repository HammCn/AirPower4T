<template>
  <div class="air-tree-box">
    <div
      class="air-tree-box-left"
      :style="{ width: width + 'px' }"
    >
      <APanel
        class="air-tree-box-panel"
        hide-footer
        :title="title"
        :show-title="!!title"
        :hide-icon="hideIcon"
      >
        <template #icon>
          <slot name="icon" />
        </template>
        <div
          v-if="searchable"
          class="search-box"
        >
          <el-input
            v-model="searchKeyword"
            :placeholder="placeholder"
            clearable
          />
        </div>
        <el-tree
          ref="treeRef"
          v-loading="isTreeLoading"
          :data="treeData"
          :props="AirConfig.treeProps"
          :default-expand-all="defaultExpandAll"
          highlight-current
          :current-node-key="currentData ? currentData.id : 0"
          :expand-on-click-node="false"
          node-key="id"
          :filter-node-method="filterNode"
          @node-click="treeSelectChanged"
        />
      </APanel>
    </div>
    <div class="air-tree-box-right">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import {
  PropType, Ref, ref, watch,
} from 'vue'
import { APanel } from '.'
import { AirConfig } from '../config/AirConfig'
import { ITree } from '../interface/ITree'
import { AirTreeInstance } from '../type/AirType'

const emits = defineEmits(['onChange'])

defineProps({
  /**
   * # 是否默认展开全部
   */
  defaultExpandAll: {
    type: Boolean,
    default: true,
  },

  /**
   * # 是否显示树搜索
   */
  searchable: {
    type: Boolean,
    default: false,
  },

  /**
   * # 树搜索提示文案
   */
  placeholder: {
    type: String,
    default: '搜索...',
  },

  /**
   * # 左侧树的数据
   */
  treeData: {
    type: Array as PropType<ITree[]>,
    required: true,
  },

  /**
   * # 是否隐藏图标
   */
  hideIcon: {
    type: Boolean,
    default: true,
  },

  /**
   * # 树是否正在加载
   */
  isTreeLoading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 标题
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * # 左侧树的宽度
   */
  width: {
    type: Number,
    default: 300,
  },
})

/**
 * 树的实例
 */
const treeRef = ref<AirTreeInstance>()

/**
 * 当前选中的数据
 */
const currentData: Ref<ITree | undefined> = ref()

/**
 * 当前搜索关键词
 */
const searchKeyword = ref('')

/**
 * 关键词变更事件
 */
watch(searchKeyword, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val)
  }
})

/**
 * 树节点选中事件
 * @param row
 */
function treeSelectChanged(row: ITree) {
  if (currentData.value && row.id === currentData.value.id) {
    currentData.value = undefined
    if (treeRef.value) {
      treeRef.value.setCurrentKey(undefined)
    }
  } else {
    currentData.value = row
  }
  emits('onChange', currentData.value)
}

/**
 * 节点过滤
 * @param value 输入的内容
 * @param node 节点
 */
function filterNode(value: string, node: ITree) {
  if (!value) return true
  return node.name?.indexOf(value) !== -1
}
</script>

<style lang="scss">
.air-tree-box {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 0;
  overflow: hidden;
  position: relative;

  &-left {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
  }

  &-panel {

    .panel-body {
      padding: 10px !important;
      padding-right: 0px !important;

      .search-box {
        padding-right: 10px;
      }

      .el-tree {
        padding-top: 10px;
        height: 0;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        padding-right: 5px;
      }
    }
  }

  &-right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
  }

  .el-tree-node__label {
    flex: 1;
    width: 0;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
}
</style>
