<template>
  <view class="card">
    <view class="top">
      <view class="title">
        {{ title }}
      </view>
      <view
        v-if="badge"
        :style="{ backgroundColor: badgeColor }"
        class="badge"
      >
        {{ badge }}
      </view>
    </view>
    <view class="desc">
      {{ desc }}
    </view>
    <view class="more">
      <slot />
    </view>
    <view
      v-if="!hideLink"
      class="link"
      @click="emits('click')"
    >
      <view class="label">
        {{ linkTip }}
      </view>
      <view class="icon">
        ···
      </view>
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
  desc: {
    type: String,
    default: '',
  },
  badgeColor: {
    type: String,
    default: AirColor.NORMAL,
  },
  hideLink: {
    type: Boolean,
    default: false,
  },
  linkTip: {
    type: String,
    default: '查看详情',
  },
})

const emits = defineEmits(['click'])

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

  .desc {
    font-size: 26rpx;
    margin-top: 10rpx;
    color: #aaa;
  }

  .more {
    font-size: 24rpx;
    color: #aaa;
    margin-top: 40rpx;
  }

  .link {
    border-top: 2rpx solid #f5f5f5;
    margin-top: 40rpx;
    padding-top: 20rpx;
    font-size: 24rpx;
    color: #aaa;
    display: flex;
    flex-direction: row;
    align-items: center;

    .label {
      flex: 1;
      width: 0;
    }

    .icon {
      font-size: 28rpx;
      color: #ccc;
    }
  }
}
</style>
