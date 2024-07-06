/* eslint-disable no-unused-vars */

import { AirEntity } from '../../base/AirEntity'

/**
 * # Detail的Hook可选配置
 * @author Hamm.cn
 */
export interface IUseDetailOption<E extends AirEntity> {
  /**
   * ## 查到详情后的事件
   * 参数为响应的数据,请处理后返回
   *
   * @param detailData 实体
   */
  afterGetDetail?: (detailData: E) => E | void
}
