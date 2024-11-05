<template>
  <el-tab-pane
    class="air-tab"
    :label="label"
  >
    <slot />
  </el-tab-pane>
</template>
<script setup lang="ts">
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
