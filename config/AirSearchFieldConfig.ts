import { AirBetweenType } from '../enum/AirBetweenType'
import { AirFieldConfig } from './AirFieldConfig'
import { AirSearchDataType } from '../enum/AirSearchDataType'
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'

/**
 * # 查询字段配置实现类
 * @author Hamm
 */
export class AirSearchFieldConfig extends AirFieldConfig implements ISearchFieldConfig {
  hide = false

  orderNumber = 1

  dictionary?: AirDictionaryArray

  between = false

  betweenType = AirBetweenType.DATE

  betweenMin = 0

  betweenMax = 100

  dataType = AirSearchDataType.TEXT

  filterable = true

  width = 150
}
