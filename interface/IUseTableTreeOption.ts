import { ITree } from './ITree'
import { IUseTableOption } from './IUseTableOption'

/**
 * # TableTreeList的Hook可选配置
 * @author Hamm.cn
 */
export interface IUseTableTreeOption<T extends ITree> extends IUseTableOption<T> {
  /**
   * # 添加行的子项的前置拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回 `param`
   *
   * @param param 添加的数据
   * @param row 当前行数据
   */
  // eslint-disable-next-line no-unused-vars
  beforeAddRow?: (param: T, row: T) => T | void
}
