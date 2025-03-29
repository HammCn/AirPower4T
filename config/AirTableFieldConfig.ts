import type { AirEnum } from '../base/AirEnum'
import type { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import type { AirDesensitizeType } from '../enum/AirDesensitizeType'
import type { ITableFieldConfig } from '../interface/decorators/ITableFieldConfig'
import type { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import type { AirSortable, AirTableAlign, AirTableFixed, ClassConstructor } from '../type/AirType'
import { AirConfig } from './AirConfig'
import { AirConstant } from './AirConstant'
import { AirFieldConfig } from './AirFieldConfig'

/**
 * # 表格的字段配置实现类
 * @author Hamm.cn
 */
export class AirTableFieldConfig extends AirFieldConfig implements ITableFieldConfig {
  hide = false

  removed = false

  width?: number

  minWidth?: number

  fixed?: AirTableFixed

  orderNumber = 1

  dictionary?: AirDictionaryArray | ClassConstructor<AirEnum>

  dateTimeFormatter?: AirDateTimeFormatter | string

  showColor = false

  sortable: AirSortable = false

  forceShow = false

  align?: AirTableAlign

  prefixText?: string

  suffixText?: string

  payloadField?: string

  friendlyDateTime = false

  copyField = false

  image = false

  imageWidth = 30

  imageHeight = 30

  imageRadius = '10px'

  emptyValue = AirConfig.tableEmptyValue

  payloadArray = false

  arraySeparator = AirConfig.arraySeparator

  nowrap = true

  phone = false

  money = false

  moneyPrecision = AirConfig.moneyPrecision

  moneyDirection? = AirConfig.moneyDirection

  desensitize?: AirDesensitizeType

  desensitizeHead?: number = 0

  desensitizeTail?: number = 0

  desensitizeSymbol?: string = AirConstant.STRING_ASTERISK
}
