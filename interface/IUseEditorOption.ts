import { IValidateRule } from './IValidateRule'

/**
 * # Editor的Hook可选配置
 */
export interface IUseEditorOption {
  /**
   * # 自定义验证
   */
  customRules?: IValidateRule,

  /**
   * # 请求前拦截器
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeSubmit?: Function

  /**
   * # 查到详情后的事件
   * ---
   * 💡 参数为响应的数据,请处理后返回
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  afterGetDetail?: Function

}
