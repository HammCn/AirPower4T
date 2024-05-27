import { AirAlert } from '../feedback/AirAlert'
import { AirWebsocketEvent } from './AirWebSocketEvent'

/**
 * # 内置的Websocket助手
 * @author Hamm
 */
export class AirWebsocket {
  /**
   * # PING包的字符串
   */
  static ping = 'PING'

  /**
   * # PONG包的字符串
   */
  static pong = 'PONG'

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
      this.websocket.send(AirWebsocket.ping)
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
   * # 关闭WebSocket
   */
  close() {
    this.reconnectWhenClosed = false
    this.websocket.close()
  }
}
