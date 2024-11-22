<template>
  <el-link @click="show()">
    {{ payload.getPayloadLabel() }}
  </el-link>
</template>
<script generic="T extends IPayload" lang="ts" setup>
import { Component, PropType } from 'vue'
import { AirDialog } from '../../helper/AirDialog'
import { IPayload } from '../../interface/IPayload'

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
