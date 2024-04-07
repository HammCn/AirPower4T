<template>
  <div
    v-loading="isLoading"
    class="air-error-page big-loading"
  >
    <div
      v-if="errorCode !== AirHttpStatus.OK"
      class="box"
    >
      <div class="code">
        {{ errorCode }}
      </div>
      <div class="title">
        {{ errorTitle }}
      </div>
      <div class="description">
        {{ errorDesc }}
        <router-link to="/">
          {{ AirI18n.get().ReturnHome || '返回首页' }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { AirConfig } from '../config/AirConfig'
import { AirHttpStatus } from '../enum/AirHttpStatus'
import { AirI18n } from '../helper/AirI18n'

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
}, AirConfig.timeout)

watch(errorCode, () => {
  switch (errorCode.value) {
    case AirHttpStatus.FORBIDDEN:
      errorTitle.value = AirI18n.get().SorryButForbiddenToAccess || '很抱歉,你可能无权访问此服务'
      errorDesc.value = AirI18n.get().CheckYourAccessPlease || '请确认你的身份权限, '
      break
    case AirHttpStatus.INTERNAL_SERVER_ERROR:
      errorTitle.value = AirI18n.get().SorryButSomeInternalServerError || '很抱歉,服务器发生了一点小错误'
      errorDesc.value = AirI18n.get().ServerMaintaining || '服务器可能正在维护中, '
      isError.value = true
      break
    case AirHttpStatus.NOT_FOUND:
      errorTitle.value = AirI18n.get().SorryButResourceNotFound || '很抱歉,没有找到你想访问的资源'
      errorDesc.value = AirI18n.get().ConfirmYourAccessUrlPlease || '请确认你的访问地址是否正确, 或 '
      break
    case AirHttpStatus.GATEWAY_TIMEOUT:
      errorTitle.value = AirI18n.get().SorryButServerBusyNow || '很抱歉,服务可能依然还没有正确的响应.'
      errorDesc.value = AirI18n.get().CheckYourNetworkPlease || '建议尝试检查你的网络后刷新重试或 '
      break
    default:
  }
  if (errorCode.value !== AirHttpStatus.OK) {
    isLoading.value = false
    isError.value = true
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

  .box {
    width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

    .code {
      color: var(--el-color-primary);
      font-size: 200px;
      font-weight: bold;
    }

    .title {
      font-size: 20px;
      color: #333;
    }

    .description {
      font-size: 14px;
      color: #ccc;
      margin-top: 10px;

      a {
        color: var(--el-color-primary);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
        font-weight: bold;
      }
    }
  }
}
</style>
