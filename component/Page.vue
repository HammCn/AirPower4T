<template>
  <div class="air-page">
    <el-pagination
      v-model:currentPage="page.pageNum"
      v-model:page-size="page.pageSize"
      class="air-page-bar"
      background
      :page-sizes="AirConfig.pageSizes"
      layout=" prev, next"
      :total="response.total"
      small
      @current-change="pageChanged($event)"
    />
    <el-popover
      v-if="page.pageNum && response.pageCount"
      :width="226"
      trigger="click"
      @hide="pageChanged(page.pageNum)"
    >
      <template #reference>
        <div class="air-page-count">
          <span>{{ page.pageNum }} / {{ response.pageCount }}</span>
        </div>
      </template>
      <template #default>
        <div class="air-page-panel-box">
          <div class="air-page-header">
            <div class="air-page-title">
              {{ AirI18n.get().PageSize || '每页' }}
            </div>

            <el-radio-group
              v-model="page.pageSize"
              class="air-page-radio"
              size="small"
            >
              <el-radio-button
                v-for="item in AirConfig.pageSizes"
                :key="item"
                :value="item"
                @click="sizeChanged(item)"
              >
                {{ item }}
              </el-radio-button>
            </el-radio-group>
          </div>
          <div class="air-page-goto">
            <el-button
              v-for="item in pageCountList"
              :key="item"
              round
              :type="page.pageNum == item ? 'primary' : 'default'"
              @click="pageChanged(item)"
            >
              {{ item }}
            </el-button>
          </div>
          <div class="air-page-jumper">
            <el-input
              v-model="currentPage"
              type="number"
              :placeholder="AirI18n.get().InputPageNumber || '输入页码跳转'"
              min="1"
              :max="response.pageCount"
              @change="currentPageChanged"
            >
              <template #append>
                <el-button
                  size="small"
                  @click="pageChanged(page.pageNum)"
                >
                  {{ AirI18n.get().Jump || '跳转' }}
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
      </template>
    </el-popover>
    <div
      v-if="response.total"
      class="air-page-total"
    >
      {{ AirI18n.get().TotalRow || '总条数' }}: <span>{{ response.total }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { computed, ref } from 'vue'
import { AirConfig } from '../config/AirConfig'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirPage } from '../model/AirPage'
import { AirI18n } from '../helper/AirI18n'

const emits = defineEmits(['onChange', 'change'])

const props = defineProps({
  /**
   * # 响应对象
   */
  response: {
    type: AirResponsePage,
    required: true,
  },
})

const page = ref(new AirPage())
const currentPage = ref(page.value.pageNum)

/**
 * # 抛出数据
 */
function emitChange() {
  currentPage.value = page.value.pageNum
  emits('change')
  emits('onChange')
}

/**
 * # 页码变更
 */
function pageChanged(num: number): void {
  page.value.pageNum = num
  page.value.pageSize = props.response.page.pageSize
  emitChange()
}

/**
 * # 每页数量变更
 */
function sizeChanged(size: number): void {
  page.value.pageNum = 1
  page.value.pageSize = size
  emitChange()
}

/**
 * # 快捷页码列表
 */
const pageCountList = computed(() => {
  const maxShowPage = 20
  const list: number[] = []
  for (let i = 1; i <= (Math.min(props.response.pageCount, maxShowPage)); i += 1) {
    list.push(i)
  }
  return list
})

/**
 * # 输入页码变更
 */
function currentPageChanged() {
  if (currentPage.value) {
    page.value.pageNum = Math.min(props.response.pageCount, parseInt(currentPage.value.toString(), 10))
    page.value.pageNum = Math.max(page.value.pageNum, 1)
    emitChange()
  }
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
      margin: 0 3px;
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
    padding: 10px 0;
    overflow: hidden;
    overflow-y: auto;
    align-content: flex-start;

    .el-button {
      width: 30px;
      height: 30px;
      margin: 5px;
      padding: 0;
      font-size: 13px;
    }
  }

  .air-page-jumper {
    display: flex;
    flex-direction: row;

  }
}
</style>
