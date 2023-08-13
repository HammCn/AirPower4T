/* eslint-disable no-unused-vars */
import { AirEntity } from '../base/AirEntity'
import { AirRequestPage } from '../model/AirRequestPage'

/**
 * # Selector的Hook可选配置
 */
export interface IUseSelectorOption<E extends AirEntity> {
  /**
   * # 不分页
   * ---
   * 💡 默认请求分页接口
   */
  unPaginate?: boolean,

  /**
   * # 搜索前的拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   *
   * @param request 请求对象
   */
  beforeSearch?: (request: AirRequestPage<E>) => AirRequestPage<E>
}
