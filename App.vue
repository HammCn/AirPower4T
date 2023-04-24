<template>
  <div
    v-loading="isLoading"
    class="airpower"
  >
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { AirConfig } from './AirConfig'
import { AirAlert } from './feedback/AirAlert'

const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})

const airpowerInit = () => {
  if (!AirConfig.router) {
    new AirAlert().setTitle('请先配置')
      .setContent('请在main.ts中配置 AirConfig.router')
      .error()
  }
}
airpowerInit()
</script>
<style scoped lang="scss">
.airpower {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  :deep(.el-loading-mask) {
    background-color: white;
  }
}
</style>
