<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <view class="cell">
    <view class="label">
      {{ label }}
    </view>
    <view class="value">
      <slot />
      <view
        v-if="color"
        :style="{
          backgroundColor: color,
        }"
        class="light"
      />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10rpx;

  .label {
    flex: 1;
    width: 0;
    color: #aaa;
  }

  .value {
    color: #666;
    display: flex;
    flex-direction: row;
    align-items: center;

    .light {
      width: 20rpx;
      height: 20rpx;
      border-radius: 100%;
      display: inline-block;
      margin-left: 10rpx;
    }
  }
}
</style>
