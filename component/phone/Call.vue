<template>
  <ADialog
    :title="param"
    :fullable="false"
    class="air-phone-call"
    hide-footer
    min-height="200px"
    min-width="250px"
    @on-cancel="onCancel()"
  >
    <div class="air-phone-call__content">
      <AQrocde
        :content="content"
        :size="160"
      />
      <span><el-icon class="icon"><WarningFilled /></el-icon>请使用手机自带的相机扫码</span>
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { airPropsParam } from '@/airpower/config/AirProps'
import { ADialog, AQrocde } from '..'

const props = defineProps(airPropsParam(''))

const content = `tel:${props.param}`
</script>
<style lang="scss" scoped>
.air-phone-call__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  >span {
    font-size: 14px;
    color: var(--text-danger-color);
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .icon{
      margin-right: 3px;
    }
  }
}
</style>
