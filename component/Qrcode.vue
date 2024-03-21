<template>
  <div
    v-loading="!value"
    class="air-qrcode"
    :style="{ width: size + 'px', height: size + 'px', }"
  >
    <QrcodeVue
      v-if="value"
      :value="value"
      :size="size"
      level="H"
    />
  </div>
</template>
<script setup lang="ts">

import QrcodeVue from 'qrcode.vue'

import { ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },

  size: {
    type: Number,
    default: 200,
  },
})

const qr = ref('')

watch(() => props.value, () => {
  qr.value = props.value || ''
})
</script>
<style scoped lang="scss">
.air-qrcode {
  position: relative;
  display: flex;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: default;
  user-select: none;
  pointer-events: none;
}
</style>
