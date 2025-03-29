<script lang="ts" setup>
import { ref } from 'vue'
import { AirClipboard } from '../helper/AirClipboard'
import { AirI18n } from '../helper/AirI18n'
import { AirStore } from '../store/AirStore'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    required: true,
  },
})

/**
 * 复制的默认提示
 */
const defaultTips = AirI18n.get().ClickToCopy || '点击复制'

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
  await AirClipboard.copy(props.content.toString())
  copyTips.value = AirI18n.get().CopySuccess || '成功复制到剪切板!'
  AirStore().tooltip = copyTips.value
  clearTimeout(timer)
  timer = setTimeout(() => {
    copyTips.value = defaultTips
    AirStore().tooltip = copyTips.value
  }, 2000)
}
</script>

<template>
  <el-link
    v-tip="copyTips"
    :underline="false"
    class="air-copy"
    @click="copy"
  >
    <slot>{{ content || '-' }}</slot>
  </el-link>
</template>

<style lang="scss" scoped>
.air-copy {
  ::v-deep(.el-link__inner) {
    flex: 1;
  }
}
</style>
