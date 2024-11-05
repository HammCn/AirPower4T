<template>
  <div
    :class="autoHeight ? 'auto-height' : ''"
    class="air-group"
  >
    <div
      v-if="title && !hideTitle"
      class="group-title"
    >
      <div class="left">
        <div class="title">
          <span>{{ title }}</span>
          <slot name="tips" />
        </div>
        <div class="custom">
          <slot name="custom" />
        </div>
      </div>
      <div
        v-if="!disableCollapse"
        class="expand"
      >
        <el-icon @click="isCollapse = !isCollapse">
          <ArrowRight v-if="isCollapse" />
          <ArrowDown v-else />
        </el-icon>
      </div>
    </div>
    <div
      v-show="!isCollapse"
      :class="getBodyClass()"
      class="group-body"
      :style="{ paddingTop: hideTitle ? '0' : '10px', minHeight: minHeight || 'auto', flexDirection: column === 1 ? 'column' : 'row' }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { ref } from 'vue'
import { ArrowDown, ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  /**
   * # 最低高度
   */
  minHeight: {
    type: String,
    default: undefined,
  },

  /**
   * # 隐藏标题
   */
  hideTitle: {
    type: Boolean,
    default: false,
  },
  /**
   * # 分组标题
   */
  title: {
    type: String,
    default: '',
  },

  /**
   * # 分组列数
   * 配置范围 `1~3`, 默认为 `1`
   */
  column: {
    type: Number,
    default: 1,
  },

  /**
   * # 自适应高度
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },

  /**
   * # 列数自适应
   */
  autoCol: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否禁用展开收起
   */
  disableCollapse: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否默认收起
   */
  collapse: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 获取合理列数
 */
function getColumn() {
  if (!props.column || props.column < 1) {
    return 1
  }
  return Math.min(props.column, 4)
}

/**
 * # 当前展开收起的状态
 */
const isCollapse = ref(props.collapse)

/**
 * # 获取body的样式类
 */
function getBodyClass() {
  return props.autoCol ? 'column-auto ' : `column-${getColumn()} `
}
</script>

<style lang="scss">
.air-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  .group-body {
    flex-direction: row;
    flex-wrap: wrap;
    display: flex;
    position: relative;

    .el-cascader,
    .el-select {
      width: 100%;
    }
  }

  .column-auto {
    >* {
      width: 320px;
      min-width: 33.333333333%;
      margin: 10px 0;
    }
  }

  .column-1>* {
    width: 100%;
  }

  .column-2 {
    display: flex;

    >* {
      width: 46%;
      margin: 10px 2%;
    }
  }

  .column-3 {
    display: flex;

    >* {
      width: 29.3333333%;
      margin: 10px 2%;
    }
  }

  .column-4 {
    display: flex;

    >* {
      width: 24%;
      margin: 10px 0.5%;
    }
  }

  .group-title {
    font-size: 16px;
    padding-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0;
    margin-bottom: 10px;

    .left {
      flex: 1;
      font-weight: 400;
      display: flex;
      flex-direction: row;

      .title {
        flex: 1;
        width: 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          border-bottom: 3px solid var(--primary-color);
          padding-bottom: 0;
          margin-bottom: -2px;
          user-select: none;
        }
      }
    }

    .expand {
      .el-icon {
        cursor: pointer;
        padding-left: 10px;
        padding-right: 5px;
        transition: color 0.3s;

        &:hover {
          color: var(--primary-color)
        }
      }
    }
  }

}

.air-group.auto-height {
  flex: 1;
  height: 0;
  margin-bottom: 0;

  .group-body {
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column
  }
}
</style>
