<template>
  <el-link
    v-if="iconButton"
    v-tip="permissionTips"
    :class="customClass"
    :disabled="isDisabled"
    :type="danger ? 'danger' : 'default'"
    :underline="false"
    class="air-button"
    @click="$emit('onClick'); $emit('click')"
  >
    <i
      :class="showIcon"
      class="airpower"
    />
  </el-link>
  <el-button
    v-else
    v-tip="permissionTips"
    :class="customClass"
    :disabled="isDisabled"
    :link="linkButton"
    :type="danger ? 'danger' : (primary ? 'primary' : 'default')"
    class="air-button"
    @click=" $emit('onClick'); $emit('click')"
  >
    <i
      v-if="showIcon && !linkButton"
      :class="showIcon"
      class="airpower"
      style="margin-right: 5px;"
    />
    <slot />
  </el-button>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { AirIcon } from '../enum/AirIcon'
import { AirIconType } from '../type/AirType'
import { AirConfig } from '../config/AirConfig'
import { AirI18n } from '../helper/AirI18n'
import { AirPermission } from '../helper/AirPermission'

defineEmits(['click', 'onClick'])

const props = defineProps({
  /**
   * # 样式类
   */
  customClass: {
    type: String,
    default: '',
  },

  /**
   * # 权限标识
   * `disabled` `tooltip` 自动失效 (如无权限 将禁用)
   */
  permission: {
    type: String,
    default: undefined,
  },

  /**
   * # 提示文字
   * 如不提供 不显示 `tooltip`
   */
  tooltip: {
    type: String,
    default: '',
  },

  /**
   * # 自定义图标类名
   * 如传入了 `type` 则此项配置无效
   */
  icon: {
    type: String,
    default: '',
  },

  /**
   * # 常用图标
   * 仅支持传入 `AirIconType` 支持的图标类型
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
   * # 是否链接按钮
   */
  linkButton: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是主按钮
   * 仅在 `icon-button` 为 `false` 时生效
   */
  primary: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是危险按钮
   * `danger` 设置为 `true` 时, `primary` 失效
   */
  danger: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否禁用按钮
   * 如不禁用，且传入了 `permission` 则按权限判断是否禁用 否则不禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 权限提示
 */
const permissionTips = computed(() => {
  if (AirConfig.disablePermission) {
    return props.tooltip
  }
  if (props.permission && !AirPermission.has(props.permission)) {
    return (AirI18n.get().NoPermissionToOperate || '无权操作')
  }
  return props.tooltip
})

/**
 * # 是否禁用
 */
const isDisabled = computed(() => {
  if (props.disabled) {
    return true
  }
  if (props.permission) {
    return !AirPermission.has(props.permission) && !AirConfig.disablePermission
  }
  return false
})

/**
 * # 显示的图标
 */
const showIcon = computed(() => AirIcon[props.type] || `${props.icon} iconfont`)
</script>
<style lang="scss" scoped></style>
