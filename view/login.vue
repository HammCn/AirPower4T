<script lang="ts" setup>
import { ref } from 'vue'
import { AirConfig } from '../config/AirConfig'

const isLoading = ref(true)

window.location.replace(
  `${AirConfig.oauthUrl}?appKey=${AirConfig.appKey}&redirectUri=${encodeURIComponent(`${window.location.origin}/callback`)}`,
)
</script>

<template>
  <div
    v-loading="isLoading"
    class="air-login big-loading"
  />
</template>

<style lang="scss" scoped>
.air-login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
</style>
