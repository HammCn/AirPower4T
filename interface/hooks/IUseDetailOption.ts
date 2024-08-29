import { AirEntity } from '../../base/AirEntity'

/**
 * # `Detail` 的 `Hook` 可选配置
 * @author Hamm.cn
 */
export interface IUseDetailOption<E extends AirEntity> {
  /**
   * ## 查到详情后的事件
   * 参数为响应的数据,请处理后返回
   *
   * @param detailData 实体
   */
  // eslint-disable-next-line no-unused-vars
  afterGetDetail?: (detailData: E) => E | void
}
