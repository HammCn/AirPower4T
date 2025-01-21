<template>
  <view
    class="card-number"
    :style="{ color: color }"
  >
    <view class="number">
      <slot>0</slot>
    </view>
    <view class="label">
      {{ label }}
    </view>
  </view>
</template>
<script setup lang="ts">
import { AirColor } from '../enum/AirColor'

defineProps({
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: AirColor.NORMAL,
  },
})
</script>
<style lang="scss" scoped>
.card-number {
  margin: 30rpx 0rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 0;
  white-space: nowrap;
  word-break: keep-all;

  .number {
    font-size: 44rpx;
    font-weight: bold;
  }

  .label {
    font-size: 20rpx;
  }
}
</style>
