/* eslint-disable no-unused-vars */
import { Component } from 'vue'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirEntity } from '../base/AirEntity'
/**
 * # TableList的Hook可选配置
 */
export interface IUseTableOption<E extends AirEntity> {
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
   *
   * @param requestData 请求对象
   */
  beforeSearch?: (requestData: AirRequestPage<E>) => AirRequestPage<E> | void

  /**
   * # 添加行的子项的前置拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   *
   * @param param 添加的数据
   * @param row 当前行数据
   */
  beforeAddRow?: (param: E, row: E) => E | void
}
