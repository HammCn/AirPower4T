<template>
  <div class="air-desensitize">
    <el-icon
      :class="!isDesensitize ? 'desensitize' : ''"
      class="icon"
      @click.stop="isDesensitize = !isDesensitize"
    >
      <View v-if="isDesensitize" />
      <Hide v-else />
    </el-icon>
    {{ desensitized || '-' }}
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Hide, View } from '@element-plus/icons-vue'
import { AirDesensitizeType } from '../enum/AirDesensitizeType'
import { AirDesensitize } from '../helper/AirDesensitize'
import { AirConstant } from '../config/AirConstant'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
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

  /**
   * # 脱敏符号
   */
  desensitizeSymbol: {
    type: String,
    default: AirConstant.ASTERISK,
  },
})

const isDesensitize = ref(true)

/**
 * # 脱敏
 */
const desensitized = computed(() => {
  if (!isDesensitize.value || !props.desensitize) {
    return props.content
  }
  return AirDesensitize.desensitize(props.content, props.desensitize, props.desensitizeHead, props.desensitizeTail, props.desensitizeSymbol)
})
</script>

<style lang="scss" scoped>
.air-desensitize {
  display: flex !important;
  flex-direction: row;
  align-items: center;

  .icon {
    margin-right: 3px;
    font-weight: bold;
  }

  .desensitize {
    color: red;
  }
}
</style>
