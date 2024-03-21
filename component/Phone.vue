<template>
  <div
    v-tip="'点击扫码拨打'"
    class="air-phone"
    @click="callPhone()"
  >
    <el-icon>
      <Iphone />
    </el-icon>
    {{ phone }}
  </div>
</template>
<script lang="ts" setup>
import { AirDialog } from '../helper/AirDialog'
import Call from './phone/Call.vue'

const props = defineProps({
  phone: {
    type: String,
    required: true,
  },
})

async function callPhone() {
  await AirDialog.show(Call, props.phone)
}
</script>
<style scoped lang="scss">
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
