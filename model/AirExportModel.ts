import { AirRequest } from '../dto/AirRequest'

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
}
