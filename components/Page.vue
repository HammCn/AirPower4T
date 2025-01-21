<template>
  <view class="page">
    <view class="title">
      共 {{ response.total }} 条
    </view>
    <slot />
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
}
</style>
