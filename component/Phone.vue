<script lang="ts" setup>
import { Iphone } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { AirDesensitizeType } from '../enum/AirDesensitizeType'
import { AirDesensitize } from '../helper/AirDesensitize'
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

  /**
   * # 是否脱敏
   */
  desensitize: {
    type: AirDesensitizeType,
    default: undefined,
  },

  /**
   * # 脱敏开始保留
   * 默认使用传入的参数
   */
  desensitizeHead: {
    type: Number,
    default: 0,
  },

  /**
   * # 脱敏末尾保留
   * 默认使用传入的参数
   */
  desensitizeTail: {
    type: Number,
    default: 0,
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
  return AirDesensitize.desensitize(props.phone, props.desensitize, props.desensitizeHead, props.desensitizeTail)
})
</script>

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

<style lang="scss" scoped>
.air-phone {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.air-phone:hover {
  color: var(--primary-color);
}
</style>
