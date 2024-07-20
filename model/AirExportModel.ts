import { AirModel } from '../base/AirModel'
import { Type } from '../decorator/Custom'
import { AirRequest } from './AirRequest'

/**
 * # 导出的数据模型
 * @author Hamm.cn
 */
export class AirExportModel<R extends AirRequest = AirRequest> extends AirModel {
  /**
   * ## 创建导出任务的API地址
   */
  @Type(String) createExportTaskUrl!: string

  /**
   * ## 查询导出结果的 `API` 地址
   */
  @Type(String) queryExportUrl!: string

  /**
   * ## 请求的参数
   */
  param!: R

  /**
   * ## 下载导出文件的临时令牌
   */
  @Type(String) fileCode!: string
}
