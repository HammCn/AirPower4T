<template>
  <div
    :style="{ width: width + 'px', height: height + 'px' }"
    class="air-image"
  >
    <el-image
      :preview-src-list="[imageUrl]"
      :src="imageUrl"
      :z-index="99"
      fit="contain"
      lazy
      preview-teleported
    >
      <template #error>
        <div class="image-error">
          {{
            placeholder || (upload && entity ? (AirI18n.get().UploadImage || '上传图片') :
              (AirI18n.get().NoPicture || '暂无图片'))
          }}
        </div>
      </template>
    </el-image>
    <div
      v-if="uploadHeader && upload"
      v-loading="isUploading"
      :class="imageUrl ? 'image-preview-color' : ''"
      class="image-upload"
    >
      <el-upload
        v-if="!imageUrl"
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :headers="uploadHeader"
        :name="uploadFileName"
        :on-error="onUploadError"
        :on-success="onUploadSuccess"
        :show-file-list="false"
        class="image-upload-box"
      />
    </div>
    <div
      v-if="imageUrl && upload && entity"
      class="action"
    >
      <el-icon
        v-if="clearable"
        @click="imageRemoved"
      >
        <CircleCloseFilled />
      </el-icon>
    </div>
  </div>
</template>

<script generic="F extends IFile" lang="ts" setup>
import {
  computed, PropType, ref, watch,
} from 'vue'

import { CircleCloseFilled } from '@element-plus/icons-vue'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirFile } from '../helper/AirFile'
import { AirConfig } from '../config/AirConfig'
import { IFile } from '../interface/IFile'
import { IJson } from '../interface/IJson'
import { AirI18n } from '../helper/AirI18n'
import { ClassConstructor } from '../type/AirType'

const emits = defineEmits<{
  onUpload: [file: F],
  onRemove: []
}>()

const props = defineProps({
  /**
   * # 显示的URL
   */
  src: {
    type: String,
    default: () => undefined,
  },

  /**
   * # 是否显示删除图标
   * 仅 `upload` 时有效, 如传入 `false`, 则上传后不允许删除
   */
  clearable: {
    type: Boolean,
    default: true,
  },

  /**
   * # 提示文本
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  /**
   * # 允许上传
   */
  upload: {
    type: Boolean,
    default: false,
  },

  /**
   * 请求头
   */
  headers: {
    type: Object as PropType<IJson>,
    default: () => {
    },
  },

  /**
   * # 显示上传 `tips`
   */
  showTips: {
    type: Boolean,
    default: false,
  },

  /**
   * # 图片宽度
   */
  width: {
    type: Number,
    default: 100,
  },

  /**
   * # 图片高度
   */
  height: {
    type: Number,
    default: 100,
  },

  /**
   * # 限制上传的大小
   */
  limit: {
    type: Number,
    default: () => 3 * 1024 * 1024,
  },

  /**
   * # 允许上传的格式
   */
  extensions: {
    type: Array,
    default: () => ['jpg', 'jpeg', 'png'],
  },

  /**
   * # 上传地址
   */
  uploadUrl: {
    type: String,
    default: '',
  },

  /**
   * # 上传文件的字段名
   * 默认为 `file`
   */
  uploadFileName: {
    type: String,
    default: 'file',
  },

  /**
   * # 接收的文件实体类
   * 可通过 `AirConfig.fileEntityClass` 配置, 默认为 `AirFileEntity`
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<F>>,
    default: AirConfig.fileEntityClass,
  },
})

/**
 * # 真实上传地址
 */
const uploadUrl = computed(() => props.uploadUrl || AirConfig.uploadUrl)

/**
 * # 显示的文件地址
 */
const imageUrl = ref('')

/**
 * # 是否正在上传
 */
const isUploading = ref(false)

function init() {
  if (props.src) {
    imageUrl.value = AirFile.getStaticFileUrl(props.src)
    return
  }
  imageUrl.value = ''
}

watch(props, () => {
  if (props.src) {
    imageUrl.value = AirFile.getStaticFileUrl(props.src)
  }
})

/**
 * # 上传文件的头
 */
const uploadHeader = ref<IJson>({})
uploadHeader.value = { ...uploadHeader.value, ...props.headers }
uploadHeader.value[AirConfig.authorizationHeaderKey] = localStorage.getItem(AirConfig.authorizationHeaderKey)

/**
 * # 移除图像事件
 */
function imageRemoved() {
  imageUrl.value = ''
  emits('onRemove')
}

/**
 * # 显示本地选择的图片
 */
function showLocalFile(file: File) {
  const reader = new FileReader()
  reader.onload = (e) => {
    if (e.target && e.target.result) {
      imageUrl.value = e.target.result.toString()
    }
  }
  reader.readAsDataURL(file)
}

/**
 * # 文件格式校验
 * @param file 文件
 * @return 是否成功
 */
function beforeUpload(file: File): boolean {
  const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (!props.extensions.includes(fileExt.toLocaleLowerCase())) {
    AirNotification.warning(`${AirI18n.get().ImageSupportExtensions || '支持的图片格式为: '} ${props.extensions.join('/')}`, AirI18n.get().ImageExtNotSupported || '图片格式不支持')
    return false
  }
  if (file.size > props.limit) {
    AirNotification.warning(`${AirI18n.get().FileMaxSizeAllowed || '文件最大允许为: '}${AirFile.getFileSizeFriendly(props.limit)}`, AirI18n.get().FileTooLarge || '文件过大')
    return false
  }
  isUploading.value = true
  showLocalFile(file)
  return true
}

/**
 * # 上传失败事件
 */
function onUploadError() {
  isUploading.value = false
  AirNotification.error(AirI18n.get().FileUploadErrorAndRetryPlease || '文件上传失败,请重新上传', AirI18n.get().UploadError || '上传失败')
}

/**
 * # 上传成功事件
 * @param response 成功响应
 */
function onUploadSuccess(response: { data: { url: string } }) {
  const entityData = AirClassTransformer.parse(response.data, props.entity)
  if (entityData && entityData.url) {
    emits('onUpload', entityData)
    isUploading.value = false
  } else {
    onUploadError()
  }
}

init()
</script>
<style lang="scss">
.air-image {
  display: inline-block;
  position: relative;
  background: #f5f7fa;
  border-radius: 5px;
  overflow: hidden;
  user-select: none;

  .el-image {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .image-error {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      justify-content: center;
      align-items: center;
      display: flex;
      color: #aaa;
      font-size: 14px;
    }
  }

  .image-upload {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all .3s;

    .image-upload-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      .el-upload {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }

  .action {
    position: absolute;
    right: -100px;
    bottom: 5px;
    background-color: white;
    color: orangered;
    border-radius: 100%;
    font-size: 24px;
    display: inline-block;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    pointer-events: auto;
    font-weight: bold;
  }

}

.air-image:hover {
  cursor: pointer;

  .action {
    display: flex;
    z-index: 99;
    right: 5px;
  }

  .image-upload {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }

  .image-preview-color {
    pointer-events: none;
  }
}
</style>
