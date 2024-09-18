import { IPayload } from './IPayload'

/**
 * # 标准公共选择器接口
 * @author Hamm.cn
 * @deprecated
 */
export interface ISelector extends IPayload {
  /**
   * ## 选择器显示内容
   */
  getSelectorLabel(): string;
}
