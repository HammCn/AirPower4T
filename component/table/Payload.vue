<script generic="T extends IPayload" lang="ts" setup>
import type { Component, PropType } from 'vue'
import type { IPayload } from '../../interface/IPayload'
import { AirDialog } from '../../helper/AirDialog'

const props = defineProps({
  /**
   * # 负载对象
   */
  payload: {
    type: Object as PropType<IPayload>,
    required: true,
  },

  /**
   * # 视图文件
   */
  view: {
    type: Object as PropType<Component>,
    required: true,
  },
})

function show() {
  AirDialog.show(props.view, props.payload.copy())
}
</script>

<template>
  <el-link @click="show()">
    {{ payload.getPayloadLabel() }}
  </el-link>
</template>
