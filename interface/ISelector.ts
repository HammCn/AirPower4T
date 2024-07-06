import { AirEntity } from '../base/AirEntity'

/**
 * # 标准公共选择器接口
 * @author Hamm.cn
 */
export interface ISelector extends AirEntity {
  /**
   * ## 选择器显示内容
   */
  getSelectorLabel(): string;
}
