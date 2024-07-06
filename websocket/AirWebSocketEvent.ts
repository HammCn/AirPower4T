import { AirModel } from '../base/AirModel'
import { Type } from '../decorator/Custom'
import { AirWebSocketPayload } from './AirWebSocketPayload'

/**
 * # WebSocket事件
 * @author Hamm.cn
 */
export class AirWebsocketEvent extends AirModel {
  /**
   * ## 事件ID
   */
  id!: string

  /**
   * ## 事件时间戳
   */
  time!: number

  /**
   * ## 事件负载
   */
  @Type(AirWebSocketPayload) payload!: AirWebSocketPayload
}
