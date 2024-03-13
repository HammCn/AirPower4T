<template>
  <ADialog
    :title="title"
    :fullable="false"
    hide-cancel
    min-height="220px"
    :hide-footer="!confirmText"
    :confirm-text="confirmText"
    class="upload-dialog"
    @on-cancel="onCancel()"
    @on-confirm="onCustomConfirm()"
  >
    <div
      v-loading="loading"
      class="file-upload-pack"
    >
      <el-upload
        v-if="entity"
        class="upload"
        drag
        :show-file-list="false"
        :action="url"
        :headers="uploadHeader"
        :before-upload="uploadReady"
        :on-success="onUploadSuccess"
        :on-error="onUploadError"
        :name="uploadName"
        :data="data"
      >
        <div class="el-upload__text">
          <b>{{ AirI18n.get().ClickHereToUpload || '点击或拖到此处上传' }}</b>
          <span>
            {{ AirI18n.get().FileSize || "文件大小: " }}
            <b>{{ AirFile.getFileSizeFriendly(props.maxSize) }}</b>
            {{ AirI18n.get().FileExt || "文件格式: " }}
            <template v-if="!exts.includes('*')">
              <b>{{ exts.join('/') }}</b>
            </template>
          </span>
          <div
            v-if="tips"
            class="tips"
          >
            {{ tips }}
          </div>
        </div>
      </el-upload>
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref, PropType, computed } from 'vue'

import { ADialog } from '.'
import { AirConfig } from '../config/AirConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirFile } from '../helper/AirFile'
import { IFile } from '../interface/IFile'
import { ClassConstructor } from '../type/ClassConstructor'
import { IJson } from '../interface/IJson'
import { AirI18n } from '../helper/AirI18n'

const props = defineProps({
  /**
   * # 标准确认返回
   */
  onConfirm: {
    type: Function,
    default: () => null,
  },

  /**
   * # 自定义确认按钮事件
   */
  onCustomConfirm: {
    type: Function,
    default: () => null,
  },

  /**
   * # 自定义上传成功回调
   */
  onCustomSuccess: {
    type: Function,
    default: null,
  },

  /**
   * # 标准取消返回
   */
  onCancel: {
    type: Function,
    default: () => null,
  },

  /**
   * # 上传弹窗中的标题
   */
  title: {
    type: String,
    default: '文件上传',
  },

  /**
   * # 确认按钮的文字
   */
  confirmText: {
    type: String,
    default: undefined,
  },

  /**
   * # 上传允许的最大文件大小 默认10m
   */
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },

  /**
   * # 上传文件使用的name属性
   */
  uploadName: {
    type: String,
    default: AirConfig.uploadFileName,
  },

  /**
   * # 上传成功的文案提示
   */
  uploadSuccess: {
    type: String,
    default: AirI18n.get().UploadSuccess || '上传成功',
  },

  /**
   * # 手动指定的上传路径
   */
  uploadUrl: {
    type: String,
    default: '',
  },

  /**
   * # 允许上传的后缀
   */
  exts: {
    type: Array as PropType<string[]>,
    default: () => ['jpg', 'jpeg', 'png'],
  },

  /**
   * # 接收文件的实体类
   * ---
   * 💡 可通过 ```AirConfig.fileEntityClass``` 配置, 默认为 ```AirFileEntity```
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<IFile>>,
    default: AirConfig.fileEntityClass,
  },

  /**
 * # 上传文件同时发送的数据
 */
  data: {
    type: Object as PropType<IJson>,
    default: () => null,
  },

  /**
 * # 上传文件同时发送的header
 */
  header: {
    type: Object as PropType<IJson>,
    default: () => null,
  },

  /**
   * 显示的提示文字
   */
  tips: {
    type: String,
    default: '',
  },
})

/**
 * # Loading状态
 */
const loading = ref(false)

/**
 * # 上传的URL
 */
const url = computed(() => props.uploadUrl || AirConfig.uploadUrl)

/**
 * # 上传的header
 */
const uploadHeader = ref({
  Authorization: AirConfig.getAccessToken(),
} as IJson)

if (props.header) {
  Object.assign(uploadHeader.value, props.header)
}

/**
 * # 上传验证
 */
function uploadReady(file: { name: string; size: number; }): boolean {
  // 文件类型验证
  if (!props.exts.includes('*')) {
    const arr = file.name.split('.')
    const fileExt = arr && arr.length > 1 ? arr[arr.length - 1] : ''
    const isFileTypeInLimited = !(props.exts.indexOf(fileExt.toLowerCase()) < 0)
    if (!isFileTypeInLimited) {
      AirNotification.error(`${AirI18n.get().FileExtNotSupported || '文件格式不支持 '}${fileExt}`, AirI18n.get().UploadError || '上传失败')
      return false
    }
  }
  const isFileSizeInLimited = file.size <= props.maxSize
  // 文件大小验证
  if (!isFileSizeInLimited) {
    AirNotification.error(`${AirI18n.get().FileSizeNotSupported || '文件大小不支持 '}${AirFile.getFileSizeFriendly(file.size)}`, AirI18n.get().UploadError || '上传失败')
    return false
  }

  loading.value = true
  return true
}

/**
 * # 上传失败
 */
function onUploadError() {
  loading.value = false
  AirNotification.error(AirI18n.get().FileUploadErrorAndRetryPlease || '上传文件失败, 请稍后再试', AirI18n.get().UploadError || '上传失败')
  props.onCancel()
}

/**
 * # 上传成功
 */
function onUploadSuccess(result: IJson) {
  loading.value = false
  if (result.code === undefined || result.code === null) {
    onUploadError()
    return
  }
  if (result.code === AirConfig.successCode) {
    AirNotification.success(props.uploadSuccess, AirI18n.get().UploadSuccess || '上传成功')
    if (props.onCustomSuccess) {
      props.onCustomSuccess(result.data)
      props.onConfirm(null)
    } else {
      const entity = AirClassTransformer.parse(
        result.data as IJson,
        props.entity,
      )
      props.onConfirm(entity)
    }
  } else {
    AirNotification.error(result.message as string || '好家伙,后端的拉垮哥们连Message都没返回???', AirI18n.get().UploadError || '上传失败')
    props.onCancel()
  }
}

</script>
<style lang="scss">
.upload-dialog {
  .body {
    padding-bottom: 0 !important;
  }

  .main {
    min-width: 500px !important;
  }

  .file-upload-pack {
    display: flex;
    flex-direction: column;
    align-items: center;

    .upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .el-upload {
        width: 100%;

        .el-upload__text {
          display: flex;
          flex-direction: column;

          >b {
            font-size: 18px;
          }

          span {
            font-size: 12px;
            margin-top: 10px;
            color: #ccc;

            b {
              color: #999;
              margin: 0 3px;
            }
          }

          .tips {
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            color: orangered;
            font-size: 14px;
          }
        }

        .el-upload-dragger {
          width: 100%;
        }
      }
    }
  }
}

::v-deep(.air-dialog) {
  .main {
    min-height: 200px !important;
  }
}
</style>
