<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { AirAlert } from './feedback/AirAlert'
import { AirRouter } from './helper/AirRouter'
import { AirStore } from './store/AirStore'

const isLoading = ref(true)

const isShowTooltip = ref(false)

const tooltipRef = ref()

onMounted(() => {
  isLoading.value = false
})

function airpowerInit() {
  if (!AirRouter.router) {
    AirAlert.error('请在main.ts中配置 AirConfig.router', '请先配置')
  }
}

airpowerInit()

let tooltipTimer: number

watch(
  () => AirStore().tooltipRef,
  () => {
    clearTimeout(tooltipTimer)
    tooltipTimer = setTimeout(() => {
      isShowTooltip.value = false
    }, 2000)
  },
)
</script>

<template>
  <div
    v-loading="isLoading"
    class="airpower"
  >
    <router-view />

    <el-tooltip
      ref="tooltipRef"
      v-model:visible="isShowTooltip"
      :content="AirStore().$state.tooltip"
      :disabled="AirStore().$state.tooltip === ''"
      :popper-options="{
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              enabled: false,
            },
          },
        ],
      }"
      :virtual-ref="AirStore().$state.tooltipRef"
      effect="customized"
      placement="top"
      popper-class="air-tooltip"
      trigger="hover"
      virtual-triggering
    />
  </div>
</template>

<style lang="scss" scoped>
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
