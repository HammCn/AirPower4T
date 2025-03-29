<template>
  <div class="air-tree-box">
    <div
      v-if="!hideTree"
      :style="{ width: showWidth }"
      class="air-tree-box-left"
    >
      <APanel
        v-show="isShow"
        :hide-icon="hideIcon"
        :show-title="!!title"
        :title="title"
        class="air-tree-box-panel"
        hide-footer
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
          :current-node-key="currentData ? currentData.id : 0"
          :data="treeData"
          :default-expand-all="defaultExpandAll"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          :props="AirConfig.treeProps"
          highlight-current
          node-key="id"
          @node-click="treeSelectChanged"
        />
      </APanel>
      <div
        v-if="collapse"
        :style="{ marginLeft: isShow ? '5px' : '0px' }"
        class="collapse-bar"
        @click="isShow = !isShow"
      />
    </div>
    <div class="air-tree-box-right">
      <slot />
    </div>
  </div>
</template>

<script generic="T extends ITree" lang="ts" setup="props">
import { computed, Ref, ref, watch } from 'vue'
import { APanel } from '.'
import { AirConfig } from '../config/AirConfig'
import { ITree } from '../interface/ITree'
import { AirTreeInstance } from '../type/AirType'

const emits = defineEmits<{
  onChange: [data: T | undefined]
  change: [data: T | undefined]
}>()

const props = defineProps({
  /**
   * # 隐藏树
   */
  hideTree: {
    type: Boolean,
    default: false,
  },
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
    type: Array<T>,
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

  /**
   * # 是否可折叠
   */
  collapse: {
    type: Boolean,
    default: false,
  },

  /**
   * # 默认折叠状态
   */
  defaultCollapse: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 树的实例
 */
const treeRef = ref<AirTreeInstance>()

/**
 * # 当前选中的数据
 */
const currentData: Ref<T | undefined> = ref()

/**
 * # 当前搜索关键词
 */
const searchKeyword = ref('')

/**
 * # 是否显示树
 */
const isShow = ref(!props.defaultCollapse)

/**
 * # 关键词变更事件
 */
watch(searchKeyword, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val)
  }
})

const showWidth = computed(() => (isShow.value ? `${props.width}px` : 'auto'))

/**
 * # 树节点选中事件
 * @param row
 */
function treeSelectChanged(row: T) {
  if (currentData.value && row.id === currentData.value.id) {
    currentData.value = undefined
    if (treeRef.value) {
      treeRef.value.setCurrentKey(undefined)
    }
  } else {
    currentData.value = row
  }
  emits('onChange', currentData.value)
  emits('change', currentData.value)
}

/**
 * # 节点过滤
 * @param value 输入的内容
 * @param node 节点
 */
function filterNode(value: string, node: ITree): boolean {
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
    flex-direction: row;
    margin-right: 5px;

    .collapse-bar {
      background-color: white;
      width: 5px;
      margin-left: 5px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 3px;
    }

    .collapse-bar:hover {
      background-color: var(--el-color-primary-light-3);
    }
  }

  &-panel {
    height: 100% !important;

    .panel-body {
      padding: 10px !important;
      padding-right: 0 !important;

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
