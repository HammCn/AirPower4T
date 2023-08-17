import { AirConfig } from '../config/AirConfig'
import { AirAlert } from '../feedback/AirAlert'

export class AirWebsocket {
  websocket!: WebSocket

  isConnected = false

  heartBeatTimer!: number

  heartBeatSecond = 5

  /**
   * # 设置Websocket心跳秒
   * @param second 秒
   */
  setHeartBeatTime(second: number): AirWebsocket {
    this.heartBeatSecond = second
    return this
  }

  /**
   * 心跳
   */
  private startHeartBeat() {
    clearTimeout(this.heartBeatTimer)
    if (this.isConnected) {
      this.websocket.send('ping')
      this.heartBeatTimer = setTimeout(() => {
        this.startHeartBeat()
      }, this.heartBeatSecond * 1000)
    }
  }

  /**
   * # 创建一个WebSocket
   * @param url [可选]URL
   */
  static create(): AirWebsocket {
    if (!AirConfig.websocketUrl) {
      AirAlert.error('请配置环境变量 VITE_APP_WEBSOCKET_URL')
      return new AirWebsocket()
    }
    const instance = new AirWebsocket()
    instance.websocket = new WebSocket(`${AirConfig.websocketUrl}?${AirConfig.getAccessToken()}`)
    instance.websocket.onopen = () => {
      instance.isConnected = true
      instance.startHeartBeat()
    }
    instance.websocket.onclose = () => {
      instance.isConnected = false
    }
    return instance
  }
}
