<template>
  <div class="air-user">
    <el-avatar
      class="air-user-head"
      :size="36"
      :src="user.avatar || ''"
      @click="isDialogShow = true"
    />
    <div
      v-if="isDialogShow"
      class="air-user-cover"
      @click.self="isDialogShow = false"
    />
    <transition name="search">
      <div
        v-if="isDialogShow"
        class="air-user-dialog"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <div class="air-user-header">
          <div class="air-user-title">
            <slot name="title">
              {{ user.nickname }}
            </slot>
          </div>
          <div class="air-user-logout">
            <el-button
              type="danger"
              text
              @click="logout"
            >
              <el-icon>
                <SwitchButton />
              </el-icon>
              退出登录
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
import { PropType, ref } from 'vue'
import { AirConfig } from '../config/AirConfig'
import { AirConfirm } from '../feedback/AirConfirm'
import { IUser } from '../interface/IUser'
import { AirUserEntity } from '../model/entity/AirUserEntity'

defineProps({
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

/**
 * 退出登录
 */
async function logout() {
  await AirConfirm.create().dangerButton().setConfirmText('确认退出').show('是否确认退出当前登录的用户?', '退出登录')
  AirConfig.removeAccessToken()
  if (AirConfig.router) {
    AirConfig.router.replace('/login')
  }
}
</script>
<style scoped lang="scss">
.air-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  .air-user-head {

    cursor: pointer;
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
    right: 0px;
    top: 50px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 0px 20px rgb(0 0 0 / 20%);
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
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #f5f5f5;
      padding: 10px;
      align-items: center;
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
