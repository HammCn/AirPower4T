<template>
  <view
    class="body"
    :style="{
      paddingBottom: paddingBottom,
    }"
  >
    <slot />
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  /**
   * ### 是否有Tabbar
   */
  tabbar: {
    type: Boolean,
    default: false,
  },
})

const paddingBottom = computed(() => `calc(${props.tabbar ? '90rpx' : '10rpx'} + env(safe-area-inset-bottom))`)
</script>
<style lang="sass" scoped>
</style>
