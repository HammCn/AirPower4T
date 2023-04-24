<template>
  <transition name="dialog">
    <div
      class="dialog air-dialog"
      :class="getDialogClass"
      @mouseup="dialogMouseUpEvent"
      @mousemove="dialogMouseMoveEvent"
      @click.self="dialogBgClicked"
    >
      <div
        :id="randId"
        class="main"
        :style="{
          width: width,
          height: height,
          minWidth: minWidth,
          minHeight: minHeight,
          transform: 'translate(' + x + 'px, ' + y + 'px)',
          borderRadius: isFullScreen ? '0px' : '4px',
        }"
        :class="isFullScreen && fullable ? 'fullscreen' : ''"
      >
        <div
          class="header"
          :style="{
            cursor: cursorRef,
          }"
          @mousedown="dialogMouseDownEvent"
          @dblclick="headerDoubleClicked"
        >
          <div class="title">
            {{ title }}
          </div>
          <i
            v-if="fullable"
            class="airpower"
            :class="isFullScreen ? 'icon-commonicon_suoxiao' : 'icon-commonicon_quanping'"
            @click="headerDoubleClicked"
          />
          <i
            v-if="!hideClose"
            class="airpower icon-commonicon_guanbi close"
            @click="emits('onCancel')"
          />
        </div>
        <div
          v-loading="loading"
          class="body"
        >
          <slot />
        </div>
        <div
          v-if="!hideFooter"
          class="footer"
        >
          <div class="status">
            <slot name="status" />
          </div>
          <div
            v-if="!hideCtrl"
            class="control"
          >
            <slot name="leftCtrl" />
            <AButton
              v-if="!hideConfirm"
              primary
              type="FINISH"
              :disabled="disableConfirm || loading"
              @click="confirmEvent"
            >
              {{ confirmText }}
            </AButton>
            <slot name="middleButton" />
            <AButton
              v-if="!hideCancel"
              type="CLOCK"
              @click="emits('onCancel')"
            >
              {{ cancelText }}
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {
  watch, ref, nextTick, PropType, computed,
} from 'vue'
import { AButton } from '.'
import { AirConfig } from '../AirConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirValidator } from '../model/AirValidator'
import type { AirFormInstance } from '../type/AirType'
import { AirRandHelper } from '../helper/AirRandHelper'

const props = defineProps({
  /**
   * # 弹窗标题
   */
  title: {
    type: String,
    default: '弹窗标题',
  },

  /**
   * # 确定按钮文字
   */
  confirmText: {
    type: String,
    default: '确定',
  },

  /**
   * # 取消按钮文字
   */
  cancelText: {
    type: String,
    default: '取消',
  },

  /**
   * # 宽度
   */
  width: {
    type: String,
    default: '',
  },

  /**
   * # 高度
   */
  height: {
    type: String,
    default: '',
  },

  /**
   * # 最小宽度
   */
  minWidth: {
    type: String,
    default: '500px',
  },

  /**
   * # 最小高度
   */
  minHeight: {
    type: String,
    default: '300px',
  },

  /**
   * # 隐藏底部控制栏
   */
  hideCtrl: {
    type: Boolean,
    default: false,
  },

  /**
   * # 隐藏Footer
   */
  hideFooter: {
    type: Boolean,
    default: false,
  },

  /**
   * # 隐藏确认按钮
   */
  hideConfirm: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否禁用确认按钮
   */
  disableConfirm: {
    type: Boolean,
    default: false,
  },

  /**
   * # 隐藏取消按钮
   */
  hideCancel: {
    type: Boolean,
    default: AirConfig.defaultDialogHideCancel,
  },

  /**
   * # 隐藏右上角关闭
   */
  hideClose: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否正在Loading
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 允许显示全屏按钮
   */
  fullable: {
    type: Boolean,
    default: AirConfig.defaultDialogFullable,
  },

  /**
   * # 是否全屏
   */
  fullScreen: {
    type: Boolean,
    default: false,
  },

  /**
   * # 允许移动
   */
  movable: {
    type: Boolean,
    default: true,
  },

  /**
   * # 如传入此参数,则自动校验,否则请自行校验
   */
  formRef: {
    type: Object as PropType<AirFormInstance>,
    default: undefined,
  },

  /**
   * # 是否是选择器
   */
  isSelector: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 标题的鼠标样式
 */
const cursorRef = ref('grab')

/**
 * # 随机ID
 */
const randId = ref(`id${AirRandHelper.getRandNumberAndCharString()}`)

const emits = defineEmits(['onCancel', 'onFull', 'onConfirm'])

/**
 * 窗体偏移的x
 */
const x = ref(0)

/**
 * 窗体偏移的y
 */
const y = ref(0)

/**
 * 是否正在移动
 */
const isMoving = ref(false)

/**
 * 开始移动的鼠标x
 */
let startX = 0

/**
 * 开始移动的鼠标Y
 */
let startY = 0

/**
 * 窗口的真实宽度
 */
let trueWidth = 0

/**
 * 窗口的真实高度
 */
let trueHeight = 0

/**
 * 是否全屏
 */
const isFullScreen = ref(props.fullable && props.fullScreen)

/**
 * 抛出全屏切换的事件
 */
watch(isFullScreen, () => {
  emits('onFull', isFullScreen.value)
})

/**
 * 鼠标按下的事件
 * @param event
 */
function dialogMouseDownEvent(event: MouseEvent) {
  if (isFullScreen.value || !props.movable) {
    return
  }
  cursorRef.value = 'grabbing'
  startX = event.clientX - x.value
  startY = event.clientY - y.value
  isMoving.value = true
  trueWidth = window.innerWidth
    - (document.querySelector(`#${randId.value}`) as HTMLDivElement).offsetWidth
  trueHeight = window.innerHeight
    - (document.querySelector(`#${randId.value}`) as HTMLDivElement).offsetHeight
}

/**
 * 双击标题事件
 */
function headerDoubleClicked() {
  if (!props.fullable) {
    return
  }
  isFullScreen.value = !isFullScreen.value
  x.value = 0
  y.value = 0
  cursorRef.value = isFullScreen.value ? 'pointer' : 'grab'
}

/**
 * 鼠标放开事件
 */
function dialogMouseUpEvent() {
  if (isMoving.value) {
    cursorRef.value = 'grab'
    isMoving.value = false
  }
}

/**
 * 鼠标移动事件
 * @param event event
 */
function dialogMouseMoveEvent(event: MouseEvent) {
  if (isMoving.value) {
    nextTick(() => {
      x.value = event.clientX - startX
      y.value = event.clientY - startY
      if (x.value < (0 - trueWidth) / 2 + 10) {
        x.value = (0 - trueWidth) / 2
      }
      if (x.value > trueWidth / 2 - 10) {
        x.value = trueWidth / 2
      }
      if (y.value < (0 - trueHeight) / 2 + 10) {
        y.value = (0 - trueHeight) / 2
      }
      if (y.value > trueHeight / 2 - 10) {
        y.value = trueHeight / 2
      }
    })
  }
}

/**
 * 当前抖动状态
 */
const isShaking = ref(false)

/**
 * 获取样式
 */
const getDialogClass = computed(() => {
  const arr: string[] = []
  if (isShaking.value) {
    arr.push('shake')
  }
  if (props.isSelector) {
    arr.push('dialog-selector')
  }
  return arr.join(' ')
})

/**
 * 点击背景后的抖动
 */
function dialogBgClicked() {
  if (isShaking.value) {
    return
  }
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 400)
}

// 表单提交
async function confirmEvent() {
  if (!props.formRef) {
    // 无需校验
    emits('onConfirm')
    return
  }
  try {
    if (!await props.formRef.validate()) {
      // 校验返回结果为false
      dialogBgClicked()
      return
    }
  } catch (e) {
    // 校验抛出了一异常
    const keys = Object.keys(e as Error)
    if (keys.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = ((e as any)[keys[0]] as AirValidator[])
      if (list.length > 0) {
        new AirNotification().setTitle('验证失败')
          .setMessage(list[0].message)
          .warning()
      }
    }
    dialogBgClicked()
    return
  }
  emits('onConfirm')
}

</script>

<style scoped lang="scss">
.dialog {
  z-index: 99;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba($color: #000000, $alpha: 0.2);
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  .main {
    animation: dialog-in 0.5s;
    background-color: white;
    box-shadow: 0px 0px 20px rgba($color: #000000, $alpha: 0.3);
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    transition: min-width 0.2s, min-height 0.2s;
    user-select: none;
    overflow: hidden;

    .header {
      padding: 15px 20px 20px 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .title {
        font-weight: normal;
        flex: 1;
      }

      .airpower {
        color: #333;
        cursor: pointer;
        transition: all 0.5s;
        margin-left: 12px;
        font-size: 18px;
      }

      .airpower:hover {
        color: red;
      }
    }

    .body {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
      padding: 10px 15px;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .footer {
      padding: 15px;
      display: flex;
      flex-direction: row;
      font-size: 16px;
      align-items: center;

      .status {
        flex: 1;
      }

      .control {
        display: flex;
        flex-direction: row;

        .el-button {
          padding: 6px 30px;
          margin-left: 15px;
        }
      }
    }
  }

  .fullscreen {
    min-width: 100% !important;
    min-height: 100% !important;
  }
}
</style>

<style lang="scss">
.dialog {
  .main {
    .body {
      * {
        user-select: text;
      }
    }

    .body.el-loading-parent--relative {
      overflow: hidden !important;
    }
  }
}

.shake {
  animation: shake-in 0.2s infinite;
}

.dialog-selector {
  .main {
    .body {
      display: flex;
      flex-direction: column;

      .el-pagination {
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
    }
  }
}
</style>
