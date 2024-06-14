import { AirBetweenType } from '../enum/AirBetweenType'
import { IFieldConfig } from './IFieldConfig'
import { AirSearchDataType } from '../enum/AirSearchDataType'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { AirEnum } from '../base/AirEnum'
import { AirEnumKey } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * # 表格的字段配置接口
 * @author Hamm.cn
 */
export interface ISearchFieldConfig<K extends AirEnumKey = AirEnumKey, E extends AirEnum<K> = AirEnum<K>> extends IFieldConfig {
  /**
   * # 隐藏搜索
   */
  hide?: boolean;

  /**
   * # 排序 越大越靠上边
   */
  orderNumber?: number;

  /**
   * # 枚举字典
   * ---
   * 💡 可配置 ```filterable``` 等参数
   */
  dictionary?: AirDictionaryArray | ClassConstructor<E>;

  /**
   * # 可筛选
   * ---
   * 💡 仅枚举字典下拉选择时有效
   */
  filterable?: boolean;

  /**
   * # 区间控件
   * ---
   * 💡 可配置 ```betweenType``` , ```betweenMin``` , ```betweenMax``` 等参数
   */
  between?: boolean;

  /**
   * # 区间的类型
   */
  betweenType?: AirBetweenType;

  /**
   * # 区间最小值
   */
  betweenMin?: number;

  /**
   * # 区间最大值
   */
  betweenMax?: number;

  /**
   * # 搜索数据类型
   */
  dataType?: AirSearchDataType;

  /**
   * # 搜索宽度
   */
  width?: number
}
