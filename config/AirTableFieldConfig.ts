import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { IRecord } from '../interface/IRecord'
import { AirFieldConfig } from './AirFieldConfig'
import { ITableFieldConfig } from '../interface/ITableFieldConfig'
import { AirConfig } from '../config/AirConfig'
import { AirRecordArray } from '../model/AirRecordArray'

/**
 * # 表格的字段配置实现类
 * @author Hamm
 */
export class AirTableFieldConfig extends AirFieldConfig implements ITableFieldConfig {
  hide = false

  removed = false

  width?: number

  minWidth?: number

  fixed?: 'left' | 'right'

  orderNumber = 1

  enumRecord?: AirRecordArray<IRecord>

  dateTimeFormatter?: AirDateTimeFormatter | string

  showStatus = false

  sortable: boolean | 'custom' = false

  forceShow = false

  align: 'right' | 'left' | 'center' = 'left'

  suffixText?: string

  payloadField?: string

  isFriendlyDateTime = false

  isCopyField = false

  isImage = false

  imageWidth = 60

  imageHeight = 60

  emptyValue = AirConfig.defaultTableEmptyValue

  payloadArray = false

  arraySplitor = AirConfig.defaultArraySplitor

  nowrap = true
}
