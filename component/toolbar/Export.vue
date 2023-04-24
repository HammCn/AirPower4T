<template>
  <ADialog
    title="数据导出"
    :fullable="false"
    class="export-dialog"
    hide-footer
    min-height="300px"
    width="400px"
    @on-cancel="cancelExport"
  >
    <template #body>
      <div class="tips">
        <template v-if="loading">
          <el-progress
            :percentage="100"
            :indeterminate="true"
            :duration="1"
            :stroke-width="10"
            :format="() => { }"
          />
          数据生成中,请稍后...
        </template>
        <template v-else>
          <el-result
            icon="success"
            title="数据导出成功"
          >
            <template #extra>
              <el-button
                type="primary"
                @click="download"
              >
                下载导出的文件
              </el-button>
            </template>
          </el-result>
        </template>
      </div>
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '..'
import { AirExportModel } from '@/airpower/model/AirExportModel'
import { AirFileHelper } from '@/airpower/helper/AirFileHelper'
import { AirHttp } from '@/airpower/model/AirHttp'

const props = defineProps({
  onConfirm: {
    type: Function,
    default: () => null,
  },
  onCancel: {
    type: Function,
    default: () => null,
  },
  param: {
    type: AirExportModel,
    default: new AirExportModel(),
  },
})
const loading = ref(false)
/**
 * # 轮询Timer
 */
let loopTimer: number

/**
 * # 关闭弹窗时询问是否取消导出
 */
const cancelExport = async () => {
  clearTimeout(loopTimer)
  props.onCancel()
}

/**
 * 导出文件的地址
 */
const exportFilePath = ref('')

/**
 * # 轮询任务结果
 * @param fileCode 请求的文件code
 */
const startLoop = async (fileCode: string) => {
  clearTimeout(loopTimer)
  try {
    const downloadPath: string = await new AirHttp('file/download').withOutError()
      .post({ fileCode })
    loading.value = false
    exportFilePath.value = AirFileHelper.getStaticFileUrl(downloadPath)
  } catch (e) {
    // 文件暂未生成
    loopTimer = setTimeout(() => {
      startLoop(fileCode)
    }, 1000)
  }
}

/**
 * 下载导出的文件
 */
const download = () => {
  window.open(exportFilePath.value)
  props.onConfirm(exportFilePath.value)
}

/**
 * # 创建下载任务
 */
const createExportTask = async () => {
  loading.value = true
  try {
    // 将请求的param参数发送到url对应的API上 开始创建一个任务
    const json = props.param.param.toSourceObject()
    json.page = undefined
    const fileCode: string = await new AirHttp(props.param.url).post(json)
    // 轮询任务结果
    startLoop(fileCode)
  } catch (e) {
    props.onCancel()
  }
}
createExportTask()
</script>
<style lang="scss">
.export-dialog {
  .tips {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    color: #999;
    flex-direction: column;
    font-size: 14px;

    .el-progress {
      width: 300px;
      margin-bottom: 50px;
      margin-top: -20px;

      .el-progress__text {
        display: none;
      }
    }
  }

  .el-result {
    padding: 0;
    margin-top: -30px;
  }
}
</style>
