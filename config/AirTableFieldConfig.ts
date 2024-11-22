import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirFieldConfig } from './AirFieldConfig'
import { ITableFieldConfig } from '../interface/decorators/ITableFieldConfig'
import { AirConfig } from '../config/AirConfig'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import {
  AirSortable, AirTableAlign, AirTableFixed, ClassConstructor,
} from '../type/AirType'
import { AirEnum } from '../base/AirEnum'
import { AirDesensitizeType } from '../enum/AirDesensitizeType'
import { AirConstant } from './AirConstant'

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

  desensitizeSymbol?: string = AirConstant.ASTERISK
}
