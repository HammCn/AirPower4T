import type { AirEnum } from '../base/AirEnum'
import type { ISearchFieldConfig } from '../interface/decorators/ISearchFieldConfig'
import type { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import type { ClassConstructor } from '../type/AirType'
import { AirBetweenType } from '../enum/AirBetweenType'
import { AirSearchDataType } from '../enum/AirSearchDataType'
import { AirFieldConfig } from './AirFieldConfig'

/**
 * # 查询字段配置实现类
 * @author Hamm.cn
 */
export class AirSearchFieldConfig extends AirFieldConfig implements ISearchFieldConfig {
  hide = false

  orderNumber = 1

  dictionary?: AirDictionaryArray | ClassConstructor<AirEnum>

  between = false

  betweenType = AirBetweenType.DATE

  betweenMin = 0

  betweenMax = 100

  dataType = AirSearchDataType.TEXT

  filterable = true

  width = 150

  clearable = true
}
