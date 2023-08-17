import { AirConfig } from '../config/AirConfig'
import { AirAlert } from '../feedback/AirAlert'

export class AirWebsocket {
  /**
   * # WebSocket实例
   */
  websocket!: WebSocket

  /**
   * # 是否已连接
   */
  isConnected = false

  /**
   * # 同步Timer
   */
  private heartBeatTimer!: number

  /**
   * # 心跳秒
   */
  private heartBeatSecond = 30

  /**
   * # 自动重连
   */
  private reconnectWhenClosed = true

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
   * # 是否自动重连
   * @param autoConnectWhenClose 是否自动重连
   */
  private autoConnectWhenClosed(autoConnectWhenClose = true) {
    this.reconnectWhenClosed = autoConnectWhenClose
  }

  /**
   * # 创建一个WebSocket
   */
  static create(handler: {
    // eslint-disable-next-line no-unused-vars
    onmessage?: (message: string) => void,
    onopen?: () => void
  }): AirWebsocket {
    if (!AirConfig.websocketUrl) {
      AirAlert.error('请配置环境变量 VITE_APP_WEBSOCKET_URL')
      return new AirWebsocket()
    }
    const instance = new AirWebsocket()
    instance.websocket = new WebSocket(`${AirConfig.websocketUrl}?${AirConfig.getAccessToken()}`)
    instance.websocket.onopen = () => {
      instance.isConnected = true
      instance.startHeartBeat()
      if (handler.onopen) {
        handler.onopen()
      }
    }
    instance.websocket.onmessage = (message) => {
      if (handler.onmessage) {
        handler.onmessage(message.data)
      }
    }
    instance.websocket.onclose = () => {
      instance.isConnected = false
    }
    return instance
  }

  /**
   * # 关闭WebSocket
   */
  close() {
    this.reconnectWhenClosed = false
    this.websocket.close()
  }
}
