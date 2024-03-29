<template>
  <ADialog
    title="拨打电话"
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
      <ACopy
        class="phone"
        :content="param"
      >
        {{ param }}
      </ACopy>
      <span><el-icon class="icon">
        <WarningFilled />
      </el-icon>请使用手机自带的相机扫码</span>
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { airPropsParam } from '../../config/AirProps'
import { ACopy, ADialog, AQrocde } from '..'

const props = defineProps(airPropsParam(''))

const content = `tel:${props.param}`
</script>
<style lang="scss" scoped>
.air-phone-call__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .phone {
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
  }

  >span {
    font-size: 12px;
    color: var(--text-danger-color);
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: 3px;
    }
  }
}
</style>
