<template>
  <el-empty
    :image="image"
    :description="description"
  />
</template>
<script lang="ts" setup>
import image from '../assets/img/empty.svg'

defineProps({
  /**
   * # 空描述文案
   */
  description: {
    type: String,
    default: '暂无数据',
  },
})
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
