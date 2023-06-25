<template>
  <el-empty
    :image="image"
    class="air-empty"
  >
    <slot name="footer" />
    <template #description>
      <p>
        <slot />
      </p>
    </template>
  </el-empty>
</template>
<script lang="ts" setup>
import image from '../assets/img/empty.svg'
</script>
<style scoped lang="scss">
.el-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
