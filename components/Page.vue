<template>
  <view class="page">
    <view
      v-if="response.total > 0"
      class="title"
    >
      共 {{ response.total }} 条
    </view>
    <slot>
      <view class="empty">
        <image src="@/airpower/assets/img/empty.svg" />
        <view class="text">
          暂无数据
        </view>
      </view>
    </slot>
  </view>
</template>
<script lang="ts" setup generic="E extends AirEntity">
import { PropType } from 'vue'
import { AirResponsePage } from '../model/AirResponsePage'
import { AirEntity } from '../base/AirEntity'

defineProps({
  response: {
    type: Object as PropType<AirResponsePage<E>>,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.page {
  padding: 10rpx;

  .title {
    display: flex;
    flex-direction: row;
    padding: 0 20rpx;
    color: #999;
    font-size: 24rpx;
    margin-top: 20rpx;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #aaa;
    position: absolute;
    inset: 0;

    image {
      margin-top: -200rpx;
      height: 250rpx;
      margin-bottom: 50rpx;
    }
  }
}
</style>
