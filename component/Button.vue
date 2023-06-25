<template>
  <el-link
    v-if="iconButton"
    :class="customClass"
    :type="danger ? 'danger' : 'default'"
    :underline="false"
    :disabled="isDisabled"
    @click="$emit('onClick'); $emit('click')"
    @mouseover="(e: any) => {
      AirStore().tooltipRef = e.currentTarget;
      AirStore().tooltip = permission && !AirConfig.permissionList.includes(permission) ? '无权操作' : tooltip
    }
    "
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
    @click=" $emit('onClick'); $emit('click')"
    @mouseover="(e: any) => {
      AirStore().tooltipRef = e.currentTarget;
      AirStore().tooltip = permission && !AirConfig.permissionList.includes(permission) ? '无权操作' : tooltip
    }
    "
  >
    <i
      v-if="showIcon"
      class="airpower"
      :class="showIcon"
      style="margin-right: 5px;"
    />
    <slot />
  </el-button>
</template>
<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { AirIcon } from '../enum/AirIcon'
import { AirIconType } from '../type/AirType'
import { AirStore } from '../store/AirStore'
import { AirConfig } from '../config/AirConfig'

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
   * ---
   * ### 💡 如传入了 ```type``` 则此项配置无效
   */
  icon: {
    type: String,
    default: '',
  },

  /**
   * # 常用图标
   * ---
   * ### 💡 仅支持传入 ```AirIconType``` 支持的图标类型
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
   * # 是否是主按钮
   * ---
   * ### 💡 仅在 ```icon-button``` 下生效
   */
  primary: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是危险按钮
   * ---
   * ### 💡 仅在 ```icon-button``` 下生效
   */
  danger: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否禁用按钮
   * ---
   * ### 💡 如传入了 ```permission```, 则优先判断权限
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * 是否禁用
 */
const isDisabled = computed(() => {
  if (props.permission) {
    // 传了标识 查看是否有权限，优先级：基础服务 > 自定义disabled
    return AirConfig.permissionList.includes(props.permission) ? props.disabled : true
  }
  return props.disabled
})

/**
 * 显示的图标
 */
const showIcon = computed(() => AirIcon[props.type] || `${props.icon} iconfont`)
</script>
<style scoped lang="scss"></style>
