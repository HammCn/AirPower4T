<template>
  <el-tabs
    class="air-tabs"
    type="border-card"
  >
    <slot />
  </el-tabs>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.air-tabs {
  min-height: 100px;
  flex: 1;
  height: 0;

  ::v-deep(.el-tabs__content) {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 0;
    padding: 10px 20px;

    .el-tab-pane {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
