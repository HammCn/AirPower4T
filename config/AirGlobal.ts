import { AirKeys } from '../enum/AirKeys'
import { AirStore } from '../store/AirStore'

/**
 * # 一些全局使用的扩展方法
 * @author Hamm.cn
 */
const CONTROL_KEYS: string[] = [AirKeys.META, AirKeys.ALT]

let controlKeyDownTimer: number
document.onkeydown = (e: KeyboardEvent) => {
  if (CONTROL_KEYS.includes(e.key)) {
    clearTimeout(controlKeyDownTimer)
    AirStore().controlKeyDown = true
    controlKeyDownTimer = setTimeout(() => {
      AirStore().controlKeyDown = false
    }, 5000)
  }
  if (e.key === AirKeys.ESC) {
    AirStore().escKeyDown = true
  }
}

document.onkeyup = (e: KeyboardEvent) => {
  if (CONTROL_KEYS.includes(e.key)) {
    AirStore().controlKeyDown = false
    clearTimeout(controlKeyDownTimer)
  }
  if (e.key === AirKeys.ESC) {
    AirStore().escKeyDown = false
  }
}
