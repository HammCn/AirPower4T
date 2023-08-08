import { Component } from 'vue'
/**
 * # TableList的Hook可选配置
 */
export interface IUseTableOption {
  /**
   * # 不分页
   * ---
   * 💡 默认请求分页接口
   */
  unPaginate?: boolean,

  /**
   * # 新增修改的视图Vue文件
   */
  editor?: Component

  /**
   * # 搜索前的拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeSearch?: Function

  /**
   * # 添加行的子项的前置拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  beforeAddRow?: Function
}
