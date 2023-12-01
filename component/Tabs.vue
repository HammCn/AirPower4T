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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

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
