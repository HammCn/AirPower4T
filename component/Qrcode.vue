<template>
  <div
    v-loading="!content"
    class="air-qrcode"
    :style="{ width: size + 'px', height: size + 'px', }"
  >
    <QrcodeVue
      v-if="content"
      :value="content"
      :size="size"
      level="H"
    />
  </div>
</template>
<script setup lang="ts">

import QrcodeVue from 'qrcode.vue'

import { ref, watch } from 'vue'

const props = defineProps({
  /**
   * # 二维码内容
   */
  content: {
    type: String,
    required: true,
  },

  /**
   * # 二维码尺寸
   */
  size: {
    type: Number,
    default: 200,
  },
})

const qr = ref('')

watch(() => props.content, () => {
  qr.value = props.content || ''
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
