import { AirConfig } from '../AirConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { IRecord } from '../interface/IRecord'
import { AirFieldConfig } from './AirFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { AirTrim } from '../enum/AirTrim'

/**
 * # 表单字段配置实现类
 * @author Hamm
 */
export class AirFormFieldConfig extends AirFieldConfig implements IFormFieldConfig {
  dateValueFormatter = AirDateTimeFormatter.TIMESTAMP

  dateShowFormatter?: AirDateTimeFormatter

  dateType?: AirDateTimeType

  max = AirConfig.maxNumber

  min = AirConfig.minNumber

  maxLength?: number

  minLength?: number

  placeholder?: string

  isTextarea?: boolean

  isNumber?: boolean

  orderNumber = 1

  precision: number = AirConfig.defaultPrecision

  isPassword?: boolean

  prefixIcon?: string

  suffixIcon?: string

  suffixText?: string

  clearable = true

  multiple = false

  multipleLimit = 0

  collapseTags = true

  filterable = true

  showLimit?: boolean

  enumRecord?: IRecord[]

  checkStrictly = true

  emitPath = false

  showAllLevels = false

  autoSize = true

  minRows = AirConfig.defaultTextareaMinRows

  maxRows = AirConfig.defaultTextareaMaxRows

  isSwitch = false

  hideSwitchLabel = false

  isRadio = false

  isRadioButton = false

  defaultValue?: string | number | boolean

  disableSwitchColor = false

  trim = AirTrim.NONE

  isUnique = false

  isChinese = false

  isMobilePhone = false

  isRequired = false

  isTelPhone = false

  isPhone = false

  isEmail = false

  regExp = undefined
}
