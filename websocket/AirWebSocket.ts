import { AirAlert } from '../feedback/AirAlert'
import { AirWebsocketEvent } from './AirWebSocketEvent'

/**
 * # 内置的 `Websocket` 助手
 * @author Hamm.cn
 */
export class AirWebsocket {
  /**
   * ## `PING` 包的字符串
   */
  static ping = 'PING'

  /**
   * ## `PONG` 包的字符串
   */
  static pong = 'PONG'

  /**
   * ## `WebSocket` 实例
   */
  websocket!: WebSocket

  /**
   * ## 是否已连接
   */
  isConnected = false

  /**
   * ## 同步 `Timer`
   */
  private heartBeatTimer!: number

  /**
   * ## 心跳秒
   */
  private heartBeatSecond = 30

  /**
   * ## 自动重连
   */
  private reconnectWhenClosed = true

  /**
   * ## 创建一个 `WebSocket`
   */
  static create(url: string, handler: {
    // eslint-disable-next-line no-unused-vars
    onMessage?: (event: AirWebsocketEvent) => void,
    onConnect?: () => void
  }): void {
    if (!url) {
      AirAlert.error('请传入WebSocket连接的URL')
      return
    }
    const instance = new AirWebsocket()
    instance.websocket = new WebSocket(url)
    instance.websocket.onopen = () => {
      instance.isConnected = true
      instance.startHeartBeat()
      if (handler.onConnect) {
        handler.onConnect()
      }
    }
    instance.websocket.onmessage = (message) => {
      if (message.data === AirWebsocket.pong) {
        return
      }
      if (!handler.onMessage) {
        return
      }
      const event = AirWebsocketEvent.fromJson(JSON.parse(message.data))
      handler.onMessage(event)
    }
    instance.websocket.onclose = () => {
      instance.isConnected = false
      if (instance.reconnectWhenClosed) {
        // Reconnect when close by exception
        setTimeout(() => {
          this.create(url, handler)
        }, 1000)
      }
    }
  }

  /**
   * ## 设置心跳秒
   * @param second 秒
   */
  setHeartBeatTime(second: number): AirWebsocket {
    this.heartBeatSecond = second
    return this
  }

  /**
   * ## 关闭 `WebSocket`
   */
  close() {
    this.reconnectWhenClosed = false
    this.websocket.close()
  }

  /**
   * ## 心跳
   */
  private startHeartBeat() {
    clearTimeout(this.heartBeatTimer)
    if (this.isConnected) {
      this.websocket.send(AirWebsocket.ping)
      this.heartBeatTimer = setTimeout(() => {
        this.startHeartBeat()
      }, this.heartBeatSecond * 1000)
    }
  }

  /**
   * ## 是否自动重连
   * @param autoConnectWhenClose 是否自动重连
   */
  private autoConnectWhenClosed(autoConnectWhenClose = true) {
    this.reconnectWhenClosed = autoConnectWhenClose
  }
}
