<template>
  <div class="air-page">
    <el-pagination
      v-model:currentPage="page.pageNum"
      v-model:page-size="page.pageSize"
      class="air-page-bar"
      background
      :page-sizes="AirConfig.defaultPageSizes"
      layout=" prev, next"
      :total="response.total"
      small
      @current-change="pageChanged($event)"
    />
    <el-popover
      v-if="page.pageNum && response.pageCount"
      :width="240"
      trigger="click"
    >
      <template #reference>
        <div
          class="air-page-count"
        >
          <span>{{ page.pageNum }} / {{ response.pageCount }}</span>页
        </div>
      </template>
      <template #default>
        <div class="air-page-panel-box">
          <div class="air-page-header">
            <div class="air-page-title">
              每页显示
            </div>

            <el-radio-group
              v-model="page.pageSize"
              class="air-page-radio"
              size="small"
            >
              <el-radio-button
                v-for="item in AirConfig.defaultPageSizes"
                :key="item"
                :label="item"
                @click="sizeChanged(item)"
              >
                {{ item }}
              </el-radio-button>
            </el-radio-group>
          </div>
          <div class="air-page-goto">
            <el-button
              v-for="item in response.pageCount"
              :key="item"
              round
              :type="page.pageNum === item ? 'primary' : 'default'"
              @click="pageChanged(item)"
            >
              {{ item }}
            </el-button>
          </div>
        </div>
      </template>
    </el-popover>
    <div
      v-if="response.total"
      class="air-page-total"
    >
      共<span>{{ response.total }}</span>条数据
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { ref } from 'vue'
import { AirConfig } from '../AirConfig'
import { AirResponsePage } from '../dto/AirResponsePage'
import { AirPage } from '../dto/AirPage'

const props = defineProps({
  /**
   * # 响应对象
   */
  response: {
    type: AirResponsePage,
    default: new AirResponsePage(),
  },
})

const emits = defineEmits(['onChange', 'change'])

const page = ref(new AirPage())

/**
 * 页码变更
 */
function pageChanged(num: number): void {
  page.value.pageNum = num
  page.value.pageSize = props.response.page.pageSize
  emits('onChange', page.value)
  emits('change', page.value)
}

/**
 * 每页数量变更
 */
function sizeChanged(size: number): void {
  page.value.pageNum = 1
  page.value.pageSize = size
  emits('onChange', page.value)
  emits('change', page.value)
}

</script>

<style lang="scss">
.air-page {
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;

  .air-page-bar {
    margin-right: 10px;
    color: #aaa;

    .btn-next,
    .btn-prev {
      color: #000;
      font-weight: bolder;
    }

    .btn-next:hover,
    .btn-prev:hover {
      background-color: var(--el-color-primary-light-9) !important;
      color: var(--el-color-primary);

    }
  }

  .air-page-count:hover {
    display: inline-block;
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);

    * {
      color: var(--el-color-primary);
    }
  }

  .air-page-count,
  .air-page-total {
    color: #aaa;

    span {
      cursor: pointer;
      font-weight: bold;
      color: #666;
      margin: 0px 3px;
    }

    padding: 3px 8px;
  }
}

.air-page-panel-box {
  display: flex;
  flex-direction: column;

  .air-page-header {
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;

    .air-page-title {
      font-size: 15px;
      flex: 1;
    }
  }

  .air-page-goto {
    display: flex;
    border-top: 1px solid #f8f8f8;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px 0px;
    max-height: 140px;
    padding-bottom: 10px;
    overflow: hidden;
    overflow-y: auto;
    align-content: flex-start;

    .el-button {
      width: 30px;
      height: 30px;
      margin: 5px;
      padding: 0px;
      font-size: 13px;
    }
  }
}
</style>
