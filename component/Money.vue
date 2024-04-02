<template>
  <ACopy
    class="air-money"
    :content="money.toFixed(precision)"
  >
    <div class="prefix">
      ¥
    </div>
    <div class="money">
      {{ money.toFixed(precision) }}
    </div>
  </ACopy>
</template>
<script setup lang="ts">
import { ACopy } from '.'
import { AirConfig } from '../config/AirConfig'

defineProps({
  /**
   * # 💰金额
   */
  money: {
    type: Number,
    default: 0,
  },

  /**
   * # 💰金额的小数精度
   * ---
   * 💡 默认为 `AirConfig.moneyPrecision`
   */
  precision: {
    type: Number,
    default: AirConfig.moneyPrecision,
  },
})
</script>
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
