<template>
  <el-link
    v-tip="copyTips"
    :underline="false"
    @click="copy"
  >
    <slot>{{ content || "-" }}</slot>
  </el-link>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { AirStore } from '../store/AirStore'
import { AirClipboard } from '../helper/AirClipboard'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    default: '',
  },
})

/**
 * 复制的默认提示
 */
const defaultTips = '点击复制'

/**
 * 当前显示的提示
 */
const copyTips = ref(defaultTips)

/**
 * 重置显示的timer
 */
let timer: number

/**
 * 复制事件
 */
async function copy() {
  if (!props.content) {
    return
  }
  await AirClipboard.copy(props.content)
  copyTips.value = '成功复制到剪切板!'
  AirStore().tooltip = copyTips.value
  clearTimeout(timer)
  timer = setTimeout(() => {
    copyTips.value = defaultTips
    AirStore().tooltip = copyTips.value
  }, 2000)
}
</script>
