<template>
  <div class="air-user">
    <el-avatar
      class="air-user-head"
      :size="36"
      :src="user.avatar"
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
        <div class="air-user-body">
          <slot>
            <div class="slot">
              your slot here...
            </div>
          </slot>
        </div>
        <div class="air-user-footer">
          <div class="air-user-setting">
            <slot name="setting" />
          </div>
          <div class="air-user-logout">
            <el-button
              type="danger"
              size="small"
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
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { AirConfig } from '../AirConfig'
import { AirConfirm } from '../feedback/AirConfirm'
import { IUser } from '../interface/IUser'
import { AirUserEntity } from '../dto/AirUserEntity'

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
    default: 250,
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
  await new AirConfirm().setTitle('退出登录')
    .setContent('是否确认退出当前登录的用户?')
    .warning()
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

    .air-user-footer {
      display: flex;
      flex-direction: row;
      border-top: 1px solid #f5f5f5;
      padding: 10px;
      align-items: center;
      display: flex;
      flex-direction: row;
      align-items: center;

      .air-user-setting {
        flex: 1;
        font-size: 12px;
      }
    }
  }
}
</style>
