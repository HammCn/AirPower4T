import { AirConfig } from '../config/AirConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { AirFieldConfig } from './AirFieldConfig'
import { IFormFieldConfig } from '../interface/decorators/IFormFieldConfig'
import { AirTrim } from '../enum/AirTrim'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { AirEnum } from '../base/AirEnum'
import { ClassConstructor } from '../type/AirType'

/**
 * # 表单字段配置实现类
 * @author Hamm.cn
 */
export class AirFormFieldConfig extends AirFieldConfig implements IFormFieldConfig {
  dateFormatter = AirDateTimeFormatter.TIMESTAMP

  dateShowFormatter?: AirDateTimeFormatter

  dateType?: AirDateTimeType

  max = AirConfig.maxNumber

  min = AirConfig.minNumber

  maxLength?: number

  minLength?: number

  placeholder?: string

  textarea?: boolean

  number?: boolean

  orderNumber = 1

  precision: number = AirConfig.numberPrecision

  password?: boolean

  prefixIcon?: string

  suffixIcon?: string

  suffixText?: string

  clearable = true

  multiple = false

  multipleLimit = 0

  collapseTags = true

  filterable = true

  showLimit?: boolean

  dictionary?: AirDictionaryArray | ClassConstructor<AirEnum>

  showColor = false

  checkStrictly = true

  emitPath = false

  showAllLevels = false

  autoSize = true

  minRows = AirConfig.textareaMinRows

  maxRows = AirConfig.textareaMaxRows

  switch = false

  hideSwitchLabel = false

  radio = false

  radioButton = false

  defaultValue?: string | number | boolean

  disableSwitchColor = false

  trim = AirTrim.NONE

  chinese: string | boolean = false

  mobilePhone: string | boolean = false

  requiredString: string | boolean = false

  requiredNumber: string | boolean = false

  requiredPayload: string | boolean = false

  telPhone: string | boolean = false

  phone: string | boolean = false

  email: string | boolean = false

  regExp = undefined

  hide = false
}
