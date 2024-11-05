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
      size="small"
      @current-change="pageChanged($event)"
    />
    <el-popover
      v-if="page.pageNum && response.pageCount"
      :width="pageBoxWidth[pageCountList[pageCountList.length - 1].length]"
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
              :style="{ width: pageItemWidth[pageCountList[pageCountList.length - 1].length] + 'px' }"
              round
              :disabled="item === disablePageLabel"
              :type="page.pageNum == parseInt(item, 10) ? 'primary' : 'default'"
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

<script lang="ts" setup="props" generic="E extends AirEntity">
/* eslint-disable no-continue */
import { computed, ref } from 'vue'
import { AirConfig } from '../config/AirConfig'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirPage } from '../model/AirPage'
import { AirI18n } from '../helper/AirI18n'
import { AirEntity } from '../base/AirEntity'

const emits = defineEmits<{
  onChange: [page: AirPage],
  change: [page: AirPage],
}>()

const props = defineProps({
  /**
   * # 响应对象
   */
  response: {
    type: AirResponsePage<E>,
    required: true,
  },
})

/**
 * # 页码对象
 */
const page = ref(new AirPage())

/**
 * # 当前页码
 */
const currentPage = ref(page.value.pageNum)

/**
 * # 抛出数据
 */
function emitChange() {
  currentPage.value = page.value.pageNum
  emits('change', page.value)
  emits('onChange', page.value)
}

/**
 * # 页码变更
 */
function pageChanged(num: string | number): void {
  page.value.pageNum = parseInt(num.toString(), 10)
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
 * # 禁用页码标签
 */
const disablePageLabel = '...'

/**
 * # 快捷页码列表
 */
const pageCountList = computed(() => {
  const showPageCount = 15
  const endSecondPage = showPageCount - 1
  const mid = parseInt((showPageCount / 2).toString(), 10) + 1

  const list: string[] = []
  if (props.response.pageCount <= showPageCount) {
    for (let i = 1; i <= props.response.pageCount; i += 1) {
      list.push(i.toString())
    }
    return list
  }
  for (let i = 1; i <= showPageCount; i += 1) {
    if (i === 1) {
      // 第一页
      list.push(i.toString())
      continue
    }
    if (i === showPageCount) {
      list.push(props.response.pageCount.toString())
      continue
    }
    if (page.value.pageNum > mid) {
      if (i === 2) {
        // 第二页
        list.push(disablePageLabel)
        continue
      }

      if (page.value.pageNum > props.response.pageCount - mid) {
        // 最后一页选中 前面的
        list.push(String(props.response.pageCount - mid + 1 + i - mid))
        continue
      }

      if (endSecondPage === i && page.value.pageNum <= props.response.pageCount - mid + 1) {
        list.push(disablePageLabel)
        continue
      }
      // 中间页码 两头禁用和起始
      list.push((page.value.pageNum - mid + i).toString())
      continue
    }

    if (endSecondPage === i) {
      // 倒数第二页
      list.push(disablePageLabel)
      continue
    }
    list.push(i.toString())
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

/**
 * # 页码宽度
 */
const pageItemWidth = [30, 30, 30, 30, 40, 52, 58, 64, 70]

/**
 * # 页码容器宽度
 */
const pageBoxWidth = [230, 230, 230, 230, 280, 340, 370, 400, 430]

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

  .air-page-count {
    border-radius: 3px;
  }

  .air-page-count,
  .air-page-total {
    color: #aaa;

    padding: 3px 8px;

    span {
      cursor: pointer;
      font-weight: bold;
      color: #666;
      margin: 0 3px;
    }
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
      width: 50px;
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
