<template>
  <el-tooltip
    effect="customized"
    :content="permission && !AirConfig.permissionList.includes(permission) ? '无权操作' : tooltip"
    placement="top"
    :disabled="!tooltip"
  >
    <el-link
      v-if="iconButton"
      :class="customClass"
      :type="danger ? 'danger' : 'default'"
      :underline="false"
      :disabled="isDisabled"
      @click="$emit('onClick'); $emit('click')"
    >
      <i
        class="airpower"
        :class="showIcon"
      />
    </el-link>
    <el-button
      v-else
      :class="customClass"
      :type="danger ? 'danger' : (primary ? 'primary' : 'default')"
      :disabled="isDisabled"
      @click="$emit('onClick'); $emit('click')"
    >
      <i
        v-if="showIcon"
        class="airpower"
        :class="showIcon"
        style="margin-right: 5px;"
      />
      <slot />
    </el-button>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { AirConfig } from '../AirConfig'
import { AirIcon } from '../enum/AirIcon'
import { AirIconType } from '../type/AirType'

const props = defineProps({
  /**
   * # 样式类
   */
  customClass: {
    type: String,
    default: '',
  },

  /**
   * # 权限标识 如无权限 将禁用
   * disabled tooltip自动失效
   */
  permission: {
    type: String,
    default: undefined,
  },

  /**
   * # 提示文字 如不提供 不显示tooltip
   */
  tooltip: {
    type: String,
    default: '',
  },

  /**
   * # 自定义图标类名
   */
  icon: {
    type: String,
    default: '',
  },

  /**
   * # 常用图标
   */
  type: {
    type: String as PropType<AirIconType>,
    default: '',
  },

  /**
   * # 是否图标按钮
   */
  iconButton: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是主按钮 在button下有效 否则为白底按钮
   */
  primary: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是危险按钮
   */
  danger: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否禁用按钮
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 是否禁用
 */
const isDisabled = computed(() => {
  if (props.permission) {
    // 传了标识 查看是否有权限，优先级：基础服务 > 自定义disabled
    return AirConfig.permissionList.includes(props.permission) ? props.disabled : true
  }
  return props.disabled
})

defineEmits(['click', 'onClick'])

/**
 * # 显示的图标
 */
const showIcon = computed(() => AirIcon[props.type] || `${props.icon} iconfont`)
</script>
<style scoped lang="scss">

</style>
