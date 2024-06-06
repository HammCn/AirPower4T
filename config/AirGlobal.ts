import { AirConfig } from './AirConfig'
import { IJson } from '../interface/IJson'
import { AirStore } from '../store/AirStore'

/**
 * # 一些全局使用的扩展方法
 * @author Hamm
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
  console.table(airConfig, ['value'])
}
let controlKeyDownTimer: number
document.onkeydown = (e: KeyboardEvent) => {
  if (e.key === 'Meta' || e.key === 'Alt') {
    clearTimeout(controlKeyDownTimer)
    AirStore().controlKeyDown = true
    controlKeyDownTimer = setTimeout(() => {
      AirStore().controlKeyDown = false
    }, 5000)
  }
  if (e.key === 'Escape') {
    AirStore().escKeyDown = true
  }
}

document.onkeyup = (e: KeyboardEvent) => {
  if (e.key === 'Meta' || e.key === 'Alt') {
    AirStore().controlKeyDown = false
    clearTimeout(controlKeyDownTimer)
  }
  if (e.key === 'Escape') {
    AirStore().escKeyDown = false
  }
}
