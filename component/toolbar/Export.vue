<template>
  <ADialog
    :allow-fullscreen="false"
    class="export-dialog"
    hide-footer
    min-height="300px"
    title="数据导出"
    width="400px"
    @on-cancel="cancelExport"
  >
    <div class="tips">
      <template v-if="isLoading">
        <el-progress
          :duration="1"
          :format="() => { }"
          :indeterminate="true"
          :percentage="100"
          :stroke-width="10"
        />
        {{ AirI18n.get().ExportLoadingAndWaitPlease || '数据准备中,请稍后...' }}
      </template>
      <template v-else>
        <el-result
          :title="AirI18n.get().ExportSuccess || '数据导出成功'"
          icon="success"
        >
          <template #extra>
            <el-button
              type="primary"
              @click="download"
            >
              {{ AirI18n.get().DownloadExportFile || '下载导出文件' }}
            </el-button>
          </template>
        </el-result>
      </template>
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '..'
import { AirExportModel } from '../../model/AirExportModel'
import { AirFile } from '../../helper/AirFile'
import { AirHttp } from '../../helper/AirHttp'
import { airPropsParam } from '../../config/AirProps'
import { AirI18n } from '../../helper/AirI18n'
import { IJson } from '../../interface/IJson'

const props = defineProps(airPropsParam(new AirExportModel()))

/**
 * 加载状态
 */
const isLoading = ref(false)

/**
 * 轮询Timer
 */
let loopTimer: number

/**
 * 关闭弹窗时询问是否取消导出
 */
async function cancelExport() {
  clearTimeout(loopTimer)
  props.onCancel()
}

/**
 * 导出文件的地址
 */
const exportFilePath = ref('')

/**
 * 轮询任务结果
 * @param fileCode 请求的文件code
 */
async function startLoop(fileCode: string) {
  clearTimeout(loopTimer)
  try {
    const exportModel = new AirExportModel()
    exportModel.fileCode = fileCode
    const downloadPath = await AirHttp.create(props.param.queryExportUrl).callbackError()
      .post(exportModel) as unknown as string
    isLoading.value = false
    exportFilePath.value = AirFile.getStaticFileUrl(downloadPath)
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
function download() {
  window.open(exportFilePath.value)
  props.onConfirm(exportFilePath.value)
}

/**
 * # 创建下载任务
 */
async function createExportTask() {
  isLoading.value = true
  try {
    // 将请求的param参数发送到url对应的API上 开始创建一个任务
    const exportRequest = props.param.param;

    // 导出数据无需分页
    (exportRequest as IJson).page = undefined
    const fileCode: string = await AirHttp.create(props.param.createExportTaskUrl).post(exportRequest) as unknown as string
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
