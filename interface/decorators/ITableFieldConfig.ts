import { AirDateTimeFormatter } from '../../enum/AirDateTimeFormatter'
import { AirDictionaryArray } from '../../model/extend/AirDictionaryArray'
import { IField } from './IField'
import {
  AirEnumKey,
  AirMoneyDirection,
  AirSortable,
  AirTableAlign,
  AirTableFixed,
  ClassConstructor,
} from '../../type/AirType'
import { AirEnum } from '../../base/AirEnum'
import { AirDesensitizeType } from '../../enum/AirDesensitizeType'

/**
 * # 表格的字段配置接口
 * @author Hamm.cn
 */
export interface ITableFieldConfig extends IField {
  /**
   * ## 默认隐藏
   * `可自行勾选后放出`
   */
  hide?: boolean;

  /**
   * ## 是否从表格列移除
   * `将不显示且无法勾选此列`
   */
  removed?: boolean;

  /**
   * ## 表格字段宽度
   */
  width?: number;

  /**
   * ## 表格字段最小宽度
   */
  minWidth?: number;

  /**
   * ## 是否表格浮动字段
   */
  fixed?: AirTableFixed;

  /**
   * ## 排序
   * `越大越靠左边`
   */
  orderNumber?: number;

  /**
   * ## 枚举字典
   * 如字典配置了 `color`, 可使用 `showColor` 配置项显示颜色
   */
  dictionary?: AirDictionaryArray | ClassConstructor<AirEnum<AirEnumKey>>;

  /**
   * ## 如是日期 可传入转换规则
   */
  dateTimeFormatter?: AirDateTimeFormatter | string;

  /**
   * ## 是否显示枚举字典的颜色灯
   * 如果显示 请确保传入的 `dictionary` 配置了 `color`
   */
  showColor?: boolean;

  /**
   * ## 是否字段允许排序 `默认不排序`
   * `custom` 为自定义排序, `ATable` 组件将触发 `onSortChange` 事件
   */
  sortable?: AirSortable;

  /**
   * ## 强制显示到表格列 不允许取消勾选
   */
  forceShow?: boolean;

  /**
   * ## 列对齐方式
   */
  align?: AirTableAlign;

  /**
   * ## 前置文字
   * 一般用于显示一些类似 ¥ 的文本
   */
  prefixText?: string;

  /**
   * ## 后置文字
   * 一般用于显示一些类似 单位 的文本
   */
  suffixText?: string;

  /**
   * ## 挂载对象的属性名称
   * 表格中可以直接指定这个参数来显示挂载对象中的哪个属性
   */
  payloadField?: string;

  /**
   * ## 显示友好时间
   * 设置为 `true` 则显示友好时间
   */
  friendlyDateTime?: boolean;

  /**
   * ## 是可复制的字段
   * 该表格列允许一键复制, 仅支持普通字段和挂载字段
   */
  copyField?: boolean;

  /**
   * ## 图片字段
   * 可配置 `imageWidth`, `imageHeight` 等
   */
  image?: boolean;

  /**
   * ## 图片的宽度 `默认60`
   */
  imageWidth?: number;

  /**
   * ## 图片的高度 `默认60`
   */
  imageHeight?: number;

  /**
   * ## 图片圆角 `默认10px`
   */
  imageRadius?: string

  /**
   * ## 空数据兜底字符串
   * 可在 `AirConfig.defaultTableEmptyValue` 进行全局兜底, 此配置项将优先使用 仅支持普通字段和挂载字段
   */
  emptyValue?: string

  /**
   * ## 挂载的是数组数据
   * 仅当配置了 `payloadField` 时有效
   * 如需修改数组显示的分隔符 可以自定义 `arraySeparator` 配置
   */
  payloadArray?: boolean

  /**
   * ## 显示数组数据的分隔符
   * 可在 `AirConfig.arraySeparator` 进行全局配置 如不配置 默认为 `，`
   */
  arraySeparator?: string

  /**
   * ## 配置列换行省略
   */
  nowrap?: boolean

  /**
   * ## 📱标记为电话字段
   * 点击将唤起拨号或展示拨号二维码
   */
  phone?: boolean

  /**
   * ## 💰是否是金额字段
   * 如配置`true` 则自动显示 `¥` 符号,且自动保留小数
   * - 可单独配置小数位数，默认为 `AirConfig.moneyPrecision`
   * - 可单独小数舍弃方式，默认为 `AirConfig.moneyDirection`
   */
  money?: boolean

  /**
   * ## 💰金额字段保留的小数位数
   * 默认为 `AirConfig.moneyPrecision` 可手动在 `main.ts` 中覆盖全局默认值
   */
  moneyPrecision?: number

  /**
   * ## 💰金额字段舍弃方向
   * 默认为 `AirConfig.moneyDirection` 可手动在 `main.ts` 中覆盖全局默认值
   */
  moneyDirection?: AirMoneyDirection

  /**
   * ## 脱敏
   */
  desensitize?: AirDesensitizeType

  /**
   * ## 脱敏开始保留
   */
  desensitizeHead?: number

  /**
   * ## 脱敏结尾保留
   */
  desensitizeTail?: number

  /**
   * ## 脱敏符号
   */
  desensitizeSymbol?: string
}
