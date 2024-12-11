import { AirWebsocketEvent } from './AirWebSocketEvent'
import { AirWebSocketPayload } from './AirWebSocketPayload'

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
   * ## 是否已连接
   */
  isConnected = false

  /**
   * ## `WebSocket` 实例
   */
  private websocket!: WebSocket

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
  }): AirWebsocket {
    if (!url) {
      throw new Error('请传入WebSocket连接的URL')
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
    return instance
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
   * <h2>发送消息</h2>
   * @param payload 消息体
   */
  send(payload: AirWebSocketPayload): void {
    if (!this.isConnected) {
      throw new Error('WebSocket未连接')
    }
    this.websocket.send(JSON.stringify(payload.toJson()))
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
}
