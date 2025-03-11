<template>
  <el-link
    v-tip="toolTips"
    :underline="false"
    class="air-friend-datetime"
  >
    {{ getDateTimeString }}
  </el-link>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { AirConfig } from '../config/AirConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTime } from '../helper/AirDateTime'

const props = defineProps({
  /**
   * # 毫秒时间戳
   */
  time: {
    type: Number,
    default: 0,
  },

  /**
   * # 时间格式化模板
   * 建议使用 `AirDateTimeFormatter`
   */
  formatter: {
    type: String as PropType<AirDateTimeFormatter | string>,
    default: AirConfig.dateTimeFormatter,
  },

  /**
   * # 是否显示友好时间
   */
  isFriendly: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (props.isFriendly) {
    return AirDateTime.getFriendlyDateTime(props.time)
  }
  return AirDateTime.formatFromMilliSecond(props.time, props.formatter)
})

/**
 * # 提示信息
 */
const toolTips = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (!props.isFriendly) {
    return AirDateTime.getFriendlyDateTime(props.time)
  }
  return AirDateTime.formatFromMilliSecond(props.time, props.formatter)
})
</script>
<style lang="scss" scoped>
.air-friend-datetime,
.air-friend-datetime * {
  user-select: none !important;
}
</style>
