<template>
  <el-dropdown
    trigger="click"
    @command="commandEvent($event)"
  >
    <span class="el-dropdown-link">
      <div class="air-user">
        <el-avatar
          :size="30"
          :src="user.avatar"
          class="air-user-avatar"
        />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <slot />
        <el-dropdown-item
          v-if="!hideLogout"
          command="logout"
          divided
        >
          <el-icon>
            <switch-button />
          </el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { AirConfig } from '../AirConfig'
import { AirConfirm } from '../feedback/AirConfirm'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { IUser } from '../interface/IUser'

defineProps({
  /**
   * # 用户信息
   */
  user: {
    type: Object as PropType<IUser>,
    default: () => AirClassTransformerHelper.newInstance(AirConfig.defaultUserEntity),
  },

  /**
   * # 隐藏退出登录
   */
  hideLogout: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['onCommand'])

/**
 * 右上角菜单点击事件
 * @param cmd
 */
async function commandEvent(cmd: string) {
  switch (cmd) {
    case 'logout':
      await new AirConfirm().setTitle('退出登录')
        .setContent('是否确认退出当前登录的用户?')
        .warning()
      AirConfig.removeAccessToken()
      if (AirConfig.router) {
        AirConfig.router.replace('/login')
      }
      break
    default:
      emits('onCommand', cmd)
  }
}
</script>
<style scoped lang="scss">
.air-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
</style>
