<template>
  <div
    v-if="phone && AirValidator.isTelephoneOrMobilePhone(phone)"
    v-tip="'点击扫码拨打'"
    class="air-phone"
    @click="callPhone()"
  >
    <el-icon>
      <Iphone />
    </el-icon>
    {{ phone }}
  </div>
  <div v-else>
    {{ phone || '-' }}
  </div>
</template>
<script lang="ts" setup>
import { Iphone } from '@element-plus/icons-vue'
import { AirDialog } from '../helper/AirDialog'
import { AirValidator } from '../helper/AirValidator'
import Call from './phone/Call.vue'

const props = defineProps({
  /**
   * # 电话号码
   */
  phone: {
    type: String,
    required: true,
  },
})

async function callPhone() {
  await AirDialog.show(Call, props.phone)
}
</script>
<style lang="scss" scoped>
.air-phone {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all .3s;
}

.air-phone:hover {
  color: var(--primary-color);
}
</style>
