<template>
  <view class="card">
    <view class="top">
      <view class="title">
        {{ title }}
      </view>
      <view
        class="badge"
        :style="{ backgroundColor: badgeColor }"
      >
        {{ badge }}
      </view>
    </view>
    <view class="more">
      <slot />
    </view>
    <view
      v-if="showLink"
      class="link"
    >
      {{ linkTip }}
    </view>
  </view>
</template>
<script lang="ts" setup>
import { AirColor } from '../enum/AirColor'

defineProps({
  title: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: '',
  },
  badgeColor: {
    type: String,
    default: AirColor.NORMAL,
  },
  showLink: {
    type: Boolean,
    default: true,
  },
  linkTip: {
    type: String,
    default: '查看详情',
  },
})
</script>
<style lang="scss" scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  padding: 16px;
  margin: 20rpx 10rpx;

  .top {
    display: flex;
    align-items: center;
    flex-direction: row;

    .title {
      font-size: 32rpx;
      flex: 1;
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
    }

    .badge {
      padding: 4rpx 10rpx;
      color: white;
      font-size: 22rpx;
      border-radius: 16rpx;
    }
  }
  .link{
    border-top: 2rpx solid #f5f5f5;
    margin-top: 40rpx;
    padding-top: 20rpx;
    font-size: 24rpx;
    color: #aaa;
  }
}
</style>
