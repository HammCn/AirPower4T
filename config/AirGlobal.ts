import { AirConfig } from './AirConfig'
import { IJson } from '../interface/IJson'
import { AirStore } from '../store/AirStore'

/**
 * # 一些全局使用的扩展方法
 * @author Hamm.cn
 */
declare global {
  interface Window {
    airConfig(): void
  }
}

Window.prototype.airConfig = () => {
  // eslint-disable-next-line no-console
  console.clear()
  const airConfig: IJson = {}
  Object.keys(AirConfig).forEach((item) => {
    airConfig[item] = (AirConfig as IJson)[item]
  })
  // eslint-disable-next-line no-console
  console.log(airConfig)
}

const CONTROL_KEYS = ['Meta', 'Alt']
const ESC_KEY = 'Escape'

let controlKeyDownTimer: number
document.onkeydown = (e: KeyboardEvent) => {
  if (CONTROL_KEYS.includes(e.key)) {
    clearTimeout(controlKeyDownTimer)
    AirStore().controlKeyDown = true
    controlKeyDownTimer = setTimeout(() => {
      AirStore().controlKeyDown = false
    }, 5000)
  }
  if (e.key === ESC_KEY) {
    AirStore().escKeyDown = true
  }
}

document.onkeyup = (e: KeyboardEvent) => {
  if (CONTROL_KEYS.includes(e.key)) {
    AirStore().controlKeyDown = false
    clearTimeout(controlKeyDownTimer)
  }
  if (e.key === ESC_KEY) {
    AirStore().escKeyDown = false
  }
}
