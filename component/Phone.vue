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
    {{ desensitizePhone }}
  </div>
  <div v-else>
    {{ phone || '-' }}
  </div>
</template>
<script lang="ts" setup>
import { Iphone } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { AirDialog } from '../helper/AirDialog'
import { AirValidator } from '../helper/AirValidator'
import Call from './phone/Call.vue'
import { AirDesensitize } from '../helper/AirDesensitize'
import { AirDesensitizeType } from '../enum/AirDesensitizeType'

const props = defineProps({
  /**
   * # 电话号码
   */
  phone: {
    type: String,
    required: true,
  },

  /**
   * # 是否脱敏
   */
  desensitize: {
    type: AirDesensitizeType,
    default: undefined,
  },

  /**
   * # 脱敏开始保留
   */
  desensitizeHead: {
    type: Number,
    default: 3,
  },

  /**
   * # 脱敏末尾保留
   */
  desensitizeTail: {
    type: Number,
    default: 4,
  },
})

/**
 * # 显示拨打电话弹窗
 */
async function callPhone() {
  await AirDialog.show(Call, props.phone)
}

/**
 * # 脱敏电话号
 */
const desensitizePhone = computed(() => {
  if (!props.desensitize) {
    return props.phone
  }
  return AirDesensitize.desensitize(props.phone, props.desensitize)
})

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
