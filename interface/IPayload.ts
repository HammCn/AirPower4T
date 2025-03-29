import type { AirEntity } from '../base/AirEntity'

/**
 * # 标准的负载接口
 * @author Hamm.cn
 */
export interface IPayload extends AirEntity {
  /**
   * ### 获取负载显示的文本
   */
  getPayloadLabel: () => string
}
