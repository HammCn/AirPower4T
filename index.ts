/* eslint-disable no-console */
import './config/AirGlobal'

// 引入Vue createApp
import { createApp } from 'vue'

import './assets/css/iconfont/iconfont.css'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/element.rewrite.scss'
import * as Icons from '@element-plus/icons-vue'

// 引入样式
import './assets/css/animation.scss'
import './assets/css/font.css'
import './assets/css/global.scss'

// Element Plus 中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 入口视图
import { createPinia } from 'pinia'
import App from './App.vue'

// AirConfig
import { AirConfig } from './config/AirConfig'
import { AirStore } from './store/AirStore'
import { AirVersion } from './helper/AirVersion'
import { AirAny } from './type/AirType'
import AirEvent from './event/AirEvent'
import { AirEventType } from './event/AirEventType'
import { AirAlert } from './feedback/AirAlert'
import { AirNotification } from './feedback/AirNotification'
import { AirI18n } from './helper/AirI18n'

// Vue初始化
const app = createApp(App)

app.use(createPinia())

// Element Plus 初始化
app.use(ElementPlus, {
  zIndex: 3000,
  locale: zhCn,
})

// 全局注册Element Plus 图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

export { app }

console.clear()

console.log(
  `%c©%cAirPower%c4T%c${AirConfig.version}%c\n已支持: Web、微信小程序、uni-app\n\n%c🔥🔥🔥AirPower系列开源项目推荐\n
%c前端: https://github.com/HammCn/AirPower4T
%c后端: https://github.com/HammCn/AirPower4J
  `,
  `padding:20px 0px 0px 0px;
  font-size:24px;font-weight:bold;
  color:#f39800;`,
  'font-size:24px;color:#f39800;',
  'font-size:24px;color:#0083c0;',
  'font-size:12px;color:#fff;background-color:#ff4500;padding:1px 5px;border-radius:3px;',
  'font-size:12px;color:#ccc;padding-bottom:50px;',

  'font-size:10px;color:#333;padding-bottom:5px;',
  'font-size:10px;color:#ccc;padding-bottom:5px;',
  'font-size:10px;color:#ccc;padding-bottom:5px;',
)
console.groupCollapsed('%cRuntime', 'font-size:12px;color:#333;font-weight:300;')
console.log(`%cVue\t\t\t\t%cv${app.version}`, 'font-size:12px;color:#999;', 'font-size:12px;color:#333;')
console.log(`%cElement Plus\t%cv${ElementPlus.version}`, 'font-size:12px;color:#999;', 'font-size:12px;color:#333;')
console.log(import.meta.env)
console.groupEnd()
if (!import.meta.env.DEV) {
  console.groupCollapsed('%cConsole', 'font-size:12px;color:#333;font-weight:300;')
}

AirVersion.check()

app.directive('tip', {
  mounted(el: AirAny, binding: AirAny) {
    el.addEventListener('mouseover', () => {
      if (binding.value) {
        AirStore().tooltipRef = el
        AirStore().tooltip = binding.value
      }
    })
  },
})

const errorTitle = AirI18n.get().SystemError || AirConfig.errorTitle
const defaultErrorMessage = AirI18n.get().SystemErrorAndRetryPlease || AirConfig.errorMessage

// 网络错误和请求错误弹出错误
AirEvent.onAll([AirEventType.NETWORK_ERROR, AirEventType.REQUEST_ERROR], (message: string) => {
  AirNotification.error(message || defaultErrorMessage, errorTitle)
})

AirEvent.on(AirEventType.REQUEST_CONTINUE, (message: string) => {
  AirAlert.success(
    message || AirI18n.get().SomeOperateSuccessAndContinuePlease || '部分操作成功，请继续操作',
    AirI18n.get().ContinueOperate || '继续操作',
  )
})

// 各种操作成功提示
AirEvent.onAll(
  [
    AirEventType.UPDATE_SUCCESS,
    AirEventType.ADD_SUCCESS,
    AirEventType.ENABLE_SUCCESS,
    AirEventType.DISABLE_SUCCESS,
    AirEventType.DELETE_SUCCESS,
  ],
  (title: string, message: string) => {
    if (message) {
      AirNotification.success(message, title)
    }
  },
)

// 各种操作失败的业务提示
AirEvent.onAll(
  [AirEventType.DELETE_FAIL, AirEventType.ENABLE_FAIL, AirEventType.DISABLE_FAIL],
  (title: string, message: string) => {
    AirNotification.error(message || defaultErrorMessage, title)
  },
)
