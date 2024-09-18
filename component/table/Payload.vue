<template>
  <el-link @click="show()">
    {{ payload.getPayloadLabel() }}
  </el-link>
</template>
<script lang="ts" setup generic="T extends IPayload">
import { Component, PropType } from 'vue'
import { AirDialog } from '../../helper/AirDialog'
import { IPayload } from '../../interface/IPayload'

const props = defineProps({
  payload: {
    type: Object as PropType<IPayload>,
    required: true,
  },
  view: {
    type: Object as PropType<Component>,
    required: true,
  },
})

function show() {
  AirDialog.show(props.view, props.payload.copy())
}
</script>
