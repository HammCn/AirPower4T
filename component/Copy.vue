<template>
  <el-tooltip
    effect="customized"
    :content="copyTips"
    placement="top"
  >
    <el-link
      :underline="false"
      @click="copy"
    >
      <!-- 自定义显示的插槽 -->
      <slot>{{ content }}</slot>
    </el-link>
  </el-tooltip>
</template>
<script lang="ts" setup>
import userClipboard from 'vue-clipboard3'
import { ref } from 'vue'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    default: '-',
  },
})

const { toClipboard } = userClipboard()

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
  await toClipboard(props.content)
  copyTips.value = '成功复制到剪切板!'
  clearTimeout(timer)
  timer = setTimeout(() => {
    copyTips.value = defaultTips
  }, 2000)
}
</script>
