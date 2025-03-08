<template>
  <div class="air-user">
    <div
      class="air-user-head"
      @click="isDialogShow = true"
    >
      <el-image :src="userAvatar" />
    </div>
    <div
      v-if="isDialogShow"
      class="air-user-cover"
      @click.self="isDialogShow = false"
    />
    <transition name="search">
      <div
        v-if="isDialogShow"
        :style="{ width: width + 'px', height: height + 'px' }"
        class="air-user-dialog"
      >
        <div class="air-user-header">
          <div class="air-user-title">
            <slot name="title">
              {{ user.nickname }}
            </slot>
          </div>
          <div class="air-user-logout">
            <el-button
              text
              type="danger"
              @click="logout"
            >
              <el-icon>
                <SwitchButton />
              </el-icon>
              {{ AirI18n.get().Logout || '退出登录' }}
            </el-button>
          </div>
        </div>
        <div class="air-user-body">
          <slot>
            <div class="slot">
              User Profile Card...
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import { SwitchButton } from '@element-plus/icons-vue'
import { AirConfig } from '../config/AirConfig'
import { AirConfirm } from '../feedback/AirConfirm'
import { IUser } from '../interface/IUser'
import { AirUserEntity } from '../model/entity/AirUserEntity'
import defaultAvatar from '../assets/img/avatar.svg'
import { AirFile } from '../helper/AirFile'
import { AirI18n } from '../helper/AirI18n'
import { AirRouter } from '../helper/AirRouter'
import { AirPermission } from '../helper/AirPermission'

const props = defineProps({
  /**
   * # 用户信息
   */
  user: {
    type: Object as PropType<IUser>,
    default: new AirUserEntity(),
  },

  /**
   * # 宽度
   */
  width: {
    type: Number,
    default: 400,
  },

  /**
   * # 宽度
   */
  height: {
    type: Number,
    default: 300,
  },
})

const isDialogShow = ref(false)

const userAvatar = computed(() => {
  if (props.user.avatar) {
    return AirFile.getStaticFileUrl(props.user.avatar)
  }
  return defaultAvatar
})

/**
 * # 退出登录
 */
async function logout() {
  await AirConfirm.create()
    .dangerButton()
    .setConfirmText(AirI18n.get().LogoutConfirm || '退出确认')
    .show(AirI18n.get().AreYouConfirmToLogout || '是否确认退出当前登录的用户?', AirI18n.get().LogoutConfirm || '退出确认')
  AirConfig.removeAccessToken()
  AirPermission.saveList([])
  if (AirRouter.router) {
    await AirRouter.router.replace('/login')
  }
}
</script>
<style lang="scss" scoped>
.air-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  .air-user-head {
    border-radius: 8px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    background-color: #eee;
    overflow: hidden;

    * {
      width: 100%;
      height: 100%;
    }
  }

  .air-user-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba($color: #000000, $alpha: 0.05);
  }

  .air-user-dialog {
    position: absolute;
    right: 0;
    top: 50px;
    background-color: white;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    border-radius: 6px;
    z-index: 99;
    display: flex;
    flex-direction: column;

    .air-user-body {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
      padding: 10px;

      .slot {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }

    .air-user-header {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .air-user-title {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
  }
}
</style>
