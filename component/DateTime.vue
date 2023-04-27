<template>
  <el-tooltip
    effect="customized"
    :content="toolTips"
    placement="top"
    :disabled="toolTips === '-'"
  >
    <el-link
      class="air-friend-datetime"
      :underline="false"
    >
      {{ getDateTimeString }}
    </el-link>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { AirConfig } from '../AirConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeHelper } from '../helper/AirDateTimeHelper'

const props = defineProps({
  /**
   * # 毫秒时间戳
   */
  time: {
    type: Number,
    default: undefined,
  },

  /**
   * # 时间格式化模板
   * ---
   * ### 💡 建议使用 ```AirDateTimeFormatter```
   */
  formatter: {
    type: String as PropType<AirDateTimeFormatter | string>,
    default: AirConfig.defaultDateTimeFormatter,
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
 * 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (props.isFriendly) {
    return AirDateTimeHelper.getFriendlyDateTime(props.time)
  }
  return AirDateTimeHelper.formatFromMilliSecond(props.time, props.formatter)
})

/**
 * 提示信息
 */
const toolTips = computed(() => {
  if (!props.time) {
    return '-'
  }
  if (!props.isFriendly) {
    return AirDateTimeHelper.getFriendlyDateTime(props.time)
  }
  return AirDateTimeHelper.formatFromMilliSecond(props.time, props.formatter)
})

</script>
<style lang="scss">
.air-friend-datetime,
.air-friend-datetime * {
  user-select: none !important;

  .is-disabled {
    color: #333;
  }
}
</style>
