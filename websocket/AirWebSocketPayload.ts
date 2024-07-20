import { AirModel } from '../base/AirModel'

/**
 * # `WebSocket` 事件负载
 * @author Hamm.cn
 */
export class AirWebSocketPayload extends AirModel {
  /**
   * ## 负载类型
   */
  type!: string

  /**
   * ## 负载数据
   */
  data!: string
}
