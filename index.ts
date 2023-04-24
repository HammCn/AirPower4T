/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */

// 引入TypeScript反射库
import 'reflect-metadata'
import 'es6-shim'
import './AirGlobal'

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
// import './assets/css/theme.scss'
import './assets/css/font.css'
import './assets/css/global.scss'

// ELement Plus 中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 入口视图
import { createPinia } from 'pinia'
import App from './App.vue'

// AirConfig
import { AirConfig } from './AirConfig'

// Vue初始化
const app = createApp(App)

app.use(createPinia())

// ELement Plus 初始化
app.use(ElementPlus, { zIndex: 3000, locale: zhCn })

// 全局注册Element Plus 图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

export { app }

console.clear()

console.log(
  `%c©Air%cPower\n%c${AirConfig.version}`,
  `padding:20px 0px 10px 0px;
  font-size:24px;
  color:#f39800;`,
  'font-size:24px;color:#0083c0;',
  'font-size:14px;color:#333;padding-bottom:20px;',
)
console.groupCollapsed('%cRuntime', 'font-size:12px;color:#333;font-weight:300;')
console.log(
  `%cVue\t\t\t\t%cv${app.version}`,
  'font-size:12px;color:#999;',
  'font-size:12px;color:#333;',
)
console.log(
  `%cElement Plus\t%cv${ElementPlus.version}`,
  'font-size:12px;color:#999;',
  'font-size:12px;color:#333;',
)
console.log(import.meta.env)
console.groupEnd()
if (!import.meta.env.DEV) {
  console.groupCollapsed('%cConsole', 'font-size:12px;color:#333;font-weight:300;')
}
