<template>
  <ADialog
    :fullable="false"
    class="air-phone-call"
    hide-footer
    min-height="200px"
    min-width="250px"
    title="拨打电话"
    @on-cancel="onCancel()"
  >
    <div class="air-phone-call__content">
      <AQrcode
        :content="content"
        :size="160"
      />
      <ACopy
        :content="phone"
        class="phone"
      >
        {{ phone }}
      </ACopy>
      <span><el-icon class="icon">
        <WarningFilled />
      </el-icon>{{ tips }}</span>
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { WarningFilled } from '@element-plus/icons-vue'
import { airProps } from '../../config/AirProps'
import { ACopy, ADialog, AQrcode } from '..'

const props = defineProps(Object.assign(airProps(), {
  /**
   * # 📱电话号码
   */
  phone: {
    type: String,
    default: '',
  },

  /**
   * # 💡提示
   */
  tips: {
    type: String,
    default: '请使用手机自带的相机扫码',
  },
}))

const content = `tel:${props.phone}`
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

  > span {
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
