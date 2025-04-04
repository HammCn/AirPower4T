<script lang="ts" setup>
import type { PropType } from 'vue'
import type { AirMoneyDirection } from '../type/AirType'
import { computed } from 'vue'
import { ACopy } from '.'
import { AirConfig } from '../config/AirConfig'

const props = defineProps({
  /**
   * # 💰金额
   */
  money: {
    type: Number,
    default: 0,
  },

  /**
   * # 💰金额的小数精度
   * 默认为 `AirConfig.moneyPrecision`
   */
  precision: {
    type: Number,
    default: AirConfig.moneyPrecision,
  },

  /**
   * # 💰金额的小数舍弃方式
   * 默认为 `AirConfig.moneyDirection`
   */
  direction: {
    type: String as PropType<AirMoneyDirection>,
    default: AirConfig.moneyDirection,
  },
})

/**
 * # 💰显示金额
 */
const showMoney = computed(() => {
  const precision = 10 ** props.precision
  let number = props.money * precision

  if (props.direction === 'up') {
    number = Math.ceil(number)
  }
  else {
    number = Math.floor(number)
  }
  return (number / precision).toFixed(props.precision).toString()
})
</script>

<template>
  <ACopy
    :content="showMoney"
    class="air-money"
  >
    <div class="prefix">
      ¥
    </div>
    <div class="money">
      {{ showMoney }}
    </div>
  </ACopy>
</template>

<style lang="scss" scoped>
.air-money {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  flex: none;

  :deep(.el-link__inner) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .money {
    font-weight: bold;
  }

  .prefix {
    margin-right: 3px;
    font-size: 12px;
  }
}
</style>
