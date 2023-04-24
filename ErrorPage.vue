<template>
  <div
    v-loading="isLoading"
    class="air-error-page big-loading"
  >
    <div
      v-if="errorCode !== AirHttpStatus.OK"
      class="box"
    >
      <div class="left">
        <div class="code">
          {{ errorCode }}
        </div>
        <div class="title">
          {{ errorTitle }}
        </div>
        <div class="description">
          {{ errorDesc }}
        </div>
      </div>
      <div class="right">
        <el-image :src="erroimg" />
      </div>
    </div>
    <div
      v-if="AirConfig.isTimeout"
      class="percent"
    >
      <div />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AirConfig } from './AirConfig'
import { AirHttpStatus } from './enum/AirHttpStatus'
import erroimg from './assets/img/img403.png'

const isLoading = ref(true)
const isError = ref(false)

const errorCode = ref(AirHttpStatus.OK)

const errorTitle = ref('')

const errorDesc = ref('')

const route = useRoute()

const timer = setTimeout(() => {
  isLoading.value = false
  isError.value = true
  errorCode.value = AirHttpStatus.GATEWAY_TIMEOUT
  AirConfig.isTimeout = true
}, AirConfig.timeout || 5000)

watch(errorCode, () => {
  switch (errorCode.value) {
    case AirHttpStatus.FORBIDDEN:
      errorTitle.value = '很抱歉,你可能无权访问此服务'
      errorDesc.value = '请确认你的身份权限,你可以联系客服或管理员解决此问题'
      break
    case AirHttpStatus.INTERNAL_SERVER_ERROR:
      errorTitle.value = '很抱歉,服务器发生了一点小错误'
      errorDesc.value = '服务器可能正在维护中,你可以稍后再试或联系客服或管理员'
      isError.value = true
      break
    case AirHttpStatus.NOT_FOUND:
      errorTitle.value = '很抱歉,没有找到你想访问的资源'
      errorDesc.value = '请确认你的访问地址是否正确, 你可以联系客服或管理员解决此问题'
      break
    case AirHttpStatus.GATEWAY_TIMEOUT:
      errorTitle.value = '很抱歉,服务可能依然还没有正确的响应.'
      errorDesc.value = '建议尝试检查你的网络后刷新重试或联系客服或管理员解决此问题'
      break
    default:
  }
  if (errorCode.value !== AirHttpStatus.OK) {
    isLoading.value = false
    isError.value = true
    setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
      location.replace('/')
    }, 3000)
  }
})

function checkErrorCode() {
  const code = route.path.replace('/', '')
  switch (code) {
    case AirHttpStatus.FORBIDDEN.toString():
      clearTimeout(timer)
      errorCode.value = AirHttpStatus.FORBIDDEN
      break
    case AirHttpStatus.NOT_FOUND.toString():
      clearTimeout(timer)
      errorCode.value = AirHttpStatus.NOT_FOUND
      break
    default:
      errorCode.value = AirHttpStatus.OK
  }
}
checkErrorCode()

watch(() => route, () => {
  checkErrorCode()
}, {
  deep: true,
})

</script>
<style lang="scss" scoped>
.air-error-page {
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
  perspective: 800px;

  .percent {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 3px;
    font-size: 0px;

    >div {
      width: 0%;
      height: 100%;
      background-color: var(--el-color-primary);
      display: inline-block;
      z-index: 10;
      animation: air-error-page-percent-animation 5s;
    }
  }

  .box {
    animation: air-error-page-animation 30s infinite;
    width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

    .left {
      width: 600px;

      .code {
        color: var(--el-color-primary);
        font-size: 100px;
      }

      .title {
        font-size: 24px;
        color: #333;
        margin-top: 20px;
      }

      .description {
        font-size: 16px;
        color: #ccc;
        margin-top: 10px;
      }
    }

    .right {
      margin-left: 50px;

      .el-image {
        width: 666px;
      }
    }
  }

}

@keyframes air-error-page-animation {
  0% {
    transform: rotateY(-3deg) rotateX(-3deg) scale(1) translateZ(0px);
  }

  50% {
    transform: rotateY(3deg) rotateX(3deg) scale(.95) translateZ(-50px);
  }

  100% {
    transform: rotateY(-3deg) rotateX(-3deg) scale(1) translateZ(0px);
  }
}

@keyframes air-error-page-percent-animation {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}
</style>
