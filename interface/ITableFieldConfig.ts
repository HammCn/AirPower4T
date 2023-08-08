import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { IFieldConfig } from './IFieldConfig'
import { IDictionary } from './IDictionary'

/**
 * # 表格的字段配置接口
 * @author Hamm
 */
export interface ITableFieldConfig extends IFieldConfig {
  /**
   * # 默认隐藏 可自行勾选后放出
   */
  hide?: boolean;

  /**
   * # 是否从表格列移除 将不显示且无法勾选此列
   */
  removed?: boolean;

  /**
   * # 表格字段宽度
   */
  width?: number;

  /**
   * # 表格字段最小宽度
   */
  minWidth?: number;

  /**
   * # 是否表格浮动字段
   */
  fixed?: 'left' | 'right';

  /**
   * # 排序 越大越靠左边
   */
  orderNumber?: number;

  /**
   * # 枚举字典
   * ---
   * 💡 如字典配置了 ```color```, 可使用 ```showColor``` 配置项显示颜色
   */
  dictionary?: AirDictionaryArray<IDictionary>;

  /**
   * # 如是日期 可传入转换规则
   */
  dateTimeFormatter?: AirDateTimeFormatter | string;

  /**
   * # 是否显示枚举字典的颜色状态灯
   * ---
   * 💡 如果显示 请确保传入的 ```dictionary``` 配置了 ```color```
   */
  showColor?: boolean;

  /**
   * # 是否字段允许排序 默认不排序
   * ---
   * 💡 ```custom``` 为自定义排序, ```ATable``` 组件将触发 ```onSortChange``` 事件
   */
  sortable?: boolean | 'custom';

  /**
   * # 强制显示到表格列 不允许取消勾选
   */
  forceShow?: boolean;

  /**
   * # 列对齐方式
   */
  align?: 'right' | 'left' | 'center';

  /**
   * # 后置文字
   * ---
   * 💡 一般用于显示一些类似 单位 的文本
   */
  suffixText?: string;

  /**
   * # 挂载对象的属性名称
   * ---
   * 💡 表格中可以直接指定这个参数来显示挂载对象中的哪个属性
   */
  payloadField?: string;

  /**
   * # 显示友好时间
   * 设置为```true```则显示友好时间
   */
  friendlyDateTime?: boolean;

  /**
   * # 是可复制的字段
   * ---
   * 💡 该表格列允许一键复制, 仅支持普通字段和挂载字段
   */
  copyField?: boolean;

  /**
   * # 图片字段
   * ---
   * 💡 可配置 ```imageWidth```, ```imageHeight``` 等
   */
  image?: boolean;

  /**
   * # 图片的宽度 默认60
   */
  imageWidth?: number;

  /**
   * # 图片的高度 默认60
   */
  imageHeight?: number;

  /**
   * # 空数据兜底字符串
   * ---
   * 💡 可在 ```AirConfig.defaultTableEmptyValue``` 进行全局兜底, 此配置项将优先使用 仅支持普通字段和挂载字段
   */
  emptyValue?: string

  /**
   * # 挂载的是数组数据
   * ---
   * 💡 仅当配置了 ```payloadField``` 时有效
   * ---
   * 💡 如需修改数组显示的分隔符 可以自定义 ```arraySplitor```配置
   */
  payloadArray?: boolean

  /**
   * # 显示数组数据的分隔符
   * ---
   * 💡 可在 ```AirConfig.defaultArraySplitor``` 进行全局配置 如不配置 默认为 ，
   */
  arraySplitor?: string

  /**
   * # 配置列换行省略
   */
  nowrap?: boolean
}
