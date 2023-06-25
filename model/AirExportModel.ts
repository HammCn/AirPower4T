import { AirRequest } from './AirRequest'

/**
 * # 导出的数据模型
 * @author Hamm
 */
export class AirExportModel<R extends AirRequest = AirRequest> {
  /**
   * # 导出请求的API地址
   */
  url!: string

  /**
   * # 请求的参数
   */
  param!: R

  /**
   * # 实例化一个导出模型
   * @param url [可选] 导出URL地址
   * @param param [可选] 导出的查询参数
   */
  constructor(url?: string, param?: R) {
    if (url) {
      this.url = url
    }
    if (param) {
      this.param = param
    }
  }
}
