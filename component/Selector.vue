<template>
  <el-input
    :placeholder="placeholder"
    :value="label"
    readonly
    :disabled="disabled"
  >
    <template
      v-if="!disabled"
      #append
    >
      <el-button
        v-if="!result"
        :disabled="disabled"
        @click="onSelect()"
      >
        选择
      </el-button>
      <el-button
        v-else
        :disabled="disabled"
        @click="
          result = undefined;
          emitChange()"
      >
        清除
      </el-button>
    </template>
  </el-input>
</template>
<script setup lang="ts" generic="T extends ISelector">
import { Component, computed, PropType } from 'vue'
import { AirDialog } from '../helper/AirDialog'
import { ISelector } from '../interface/ISelector'

const result = defineModel<T>()

const props = defineProps({
  /**
   * # 默认空值的提示
   */
  default: {
    type: String,
    default: '',
  },

  /**
   * # 提示信息
   */
  placeholder: {
    type: String,
    default: '请选择...',
  },

  /**
   * # 使用的选择器视图
   */
  selector: {
    type: Object as PropType<Component>,
    required: true,
  },

  /**
   * # 选择器参数
   */
  param: {
    type: Object as PropType<T>,
    default: () => null,
  },

  /**
   * # 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['change', 'onChange'])

function emitChange() {
  emits('change', result.value)
  emits('onChange', result.value)
}

const label = computed(() => result.value?.getSelectorLabel() || props.default)

async function onSelect() {
  result.value = await AirDialog.show<T>(props.selector, props.param)
  emitChange()
}

</script>
