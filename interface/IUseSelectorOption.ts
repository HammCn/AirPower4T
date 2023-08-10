/**
 * # Selector的Hook可选配置
 */
export interface IUseSelectorOption {
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
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeSearch?: Function
}
