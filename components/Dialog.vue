<script lang="ts" setup>
defineProps({
  confirmText: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '返回',
  },
  title: {
    type: String,
    default: '',
  },
})

function cancel() {
  uni.navigateBack()
}
</script>

<template>
  <view
    class="mask"
    @click="cancel()"
  />
  <view class="frame">
    <view class="header">
      <view
        class="cancel"
        @click="cancel()"
      >
        {{ cancelText }}
      </view>
      <view
        v-if="title"
        class="title"
      >
        {{ title }}
      </view>
      <view class="confirm">
        {{ confirmText }}
      </view>
    </view>
    <view class="body">
      <slot />
    </view>
  </view>
</template>

<style scoped>

.mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.frame {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  margin-bottom: calc(50rpx + env(--safe-area-inset-bottom));

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #333;
    padding: 20rpx;
    border-bottom: 1rpx solid #eee;

    .cancel,
    .confirm {
      width: 80rpx;
      padding: 10rpx 20rpx;
    }

    .cancel {
      text-align: left;
    }

    .confirm {
      text-align: right;
    }

    .title {
      flex: 1;
      text-align: center;
      color: #999;
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 20rpx;
    }
  }

  .body {
    padding: 40rpx;
    flex: 1;
    height: 0;
    overflow: hidden;
    overflow-y: auto;
    margin-bottom: 20rpx;
  }
}
</style>
