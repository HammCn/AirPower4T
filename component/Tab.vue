<template>
  <el-tab-pane
    :label="label"
    class="air-tab"
  >
    <slot />
  </el-tab-pane>
</template>
<script lang="ts" setup>
import { ElTabPane } from 'element-plus'

defineProps({
  /**
   * # Tab标题
   */
  label: {
    type: String,
    default: 'Tab',
  },
})
</script>
<style lang="scss" scoped></style>
