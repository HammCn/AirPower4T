import { AirEnum } from '../base/AirEnum'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { AirTrim } from '../enum/AirTrim'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'
import { AirEnumKey } from '../type/AirType'
import { ClassConstructor } from '../type/ClassConstructor'
import { IFieldConfig } from './IFieldConfig'

/**
 * # 表单的字段配置接口
 * @author Hamm.cn
 */
export interface IFormFieldConfig<K extends AirEnumKey = AirEnumKey, E extends AirEnum<K> = AirEnum<K>> extends IFieldConfig {
  /**
   * # 时间日期真实数据的格式
   * ---
   * 💡 仅在传入了 ```dateType``` 时有效
   * 默认值 ```AirDateTimeFormatter.TIMESTAMP```
   */
  dateFormatter?: AirDateTimeFormatter | string;

  /**
   * # 显示到表单中的时间日期格式
   * ---
   * 💡 仅在传入了 ```dateType``` 时有效
   * - 如不设置:
   * > - 时间日期类型默认通过 ```dateType``` 的类型自动获取
   * > - 时间类型默认为 ```HH_mm_ss```
   * > - ```AirConfig.defaultDateTimeFormatter``` 可作为全局兜底配置
   */
  dateShowFormatter?: AirDateTimeFormatter | string;

  /**
   * # 配置时间日期控件格式
   * ---
   * 💡 可配置 ```dateValueFormatter``` ```dateShowFormatter``` 等时间日期格式化方式
   */
  dateType?: AirDateTimeType;

  /**
   * # 最大数字
   * ---
   * 💡 默认配置 ```AirConfig.maxNumber``` 仅在 ```isNumber``` 时有效
   */
  max?: number;

  /**
   * # 最小数字
   */
  min?: number;

  /**
   * # 最大允许输入的长度
   * ---
   * 💡 手动指定后, ```AirConfig.maxTextAreaLength``` 和 ```AirConfig.maxTextLength``` 将失效
   */
  maxLength?: number;

  /**
   * # 最小长度
   */
  minLength?: number;

  /**
   * # 排序 越大越靠前
   */
  orderNumber?: number;

  /**
   * # 占位文本
   * ---
   * 💡 优先级: ```AInput```传入 > ```@FormField``` > 自动生成
   */
  placeholder?: string;

  /**
   * # 文本域
   */
  textarea?: boolean;

  /**
   * # 数字输入
   */
  number?: boolean;

  /**
   * # 数字精度(小数的位数)
   * ---
   * 💡 如为0,则是整数,不允许输入小数
   *
   * 默认为 ```AirConfig.defaultPrecision``` 的配置
   */
  precision?: number

  /**
   * # 显示清除按钮
   */
  clearable?: boolean;

  /**
   * # 密码输入框
   */
  password?: boolean;

  /**
   * # 前置图标名称
   * ---
   * 💡 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  prefixIcon?: string;

  /**
   * # 后置图标名称
   * ---
   * 💡 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  suffixIcon?: string;

  /**
   * # 后置文字
   */
  suffixText?: string;

  /**
   * # 可多选
   */
  multiple?: boolean;

  /**
   * # 收起多选标签
   */
  collapseTags?: boolean;

  /**
   * # 可筛选
   * ---
   * 💡 如同时为 ```AInput``` 传入了 ```onSearch``` 回调方法, 则进行自定义的筛选
   */
  filterable?: boolean;

  /**
   * # 限制最多选择多少个
   * ---
   * 💡 配置 0 不限制, 默认不限制
   */
  multipleLimit?: number;

  /**
   * # 父子关联
   */
  checkStrictly?: boolean;

  /**
   * # 显示输入限制
   * ---
   * 💡 AirConfig中支持配置全局默认状态 如
   *
   * ```typescript
   * AirConfig.defaultInputShowLimit = true
   * AirConfig.defaultTextAreaShowLimit = false
   * ```
   */
  showLimit?: boolean;

  /**
   * # 下拉选择枚举字典
   * ---
   * 💡 如 ```AInput``` 传入了自定义的数据 ```list``` 或 ```tree```, 则此项失效
   */
  dictionary?: AirDictionaryArray | ClassConstructor<E>;

  /**
   * # 是否显示枚举字典的颜色灯
   * ---
   * 💡 如果显示 请确保传入的 ```dictionary``` 配置了 ```color```
   */
  showColor?: boolean

  /**
   * # 返回全路径的值
   */
  emitPath?: boolean;

  /**
   * # 显示全路径
   */
  showAllLevels?: boolean;

  /**
   * # TextArea是否自适应
   * ---
   * 💡 ```AInput```如配置了 ```textarea:true``` 此项生效, 默认为```true```
   * ---
   * 💡 如配置为 ```false```, 可手动配置 ```minRow``` ```maxRow``` 等参数
   */
  autoSize?: boolean;

  /**
   * # 最小行数
   * ---
   * 💡 默认为 ```AirConfig.defaultTextareaMinRows```
   * ---
   * 💡 如配置了 ```autoSize```, 则此项配置无效
   */
  minRows?: number;

  /**
   * # 最大行数
   * ---
   * 💡 默认为 ```AirConfig.defaultTextareaMaxRows```
   *
   * 💡 如配置了 ```autoSize```, 则此项配置无效
   */
  maxRows?: number;

  /**
   * # 使用Switch控件
   */
  switch?: boolean;

  /**
   * # 使用Switch控件时是否隐藏Label文字
   * ---
   * 💡 ```@FormField``` 的 ```isSwitch``` 配置为 ```true``` 时生效
   */
  hideSwitchLabel?: boolean;

  /**
   * # 使用Radio控件
   */
  radio?: boolean;

  /**
   * # 使用Radio控件时用按钮的样式
   * ---
   * 💡 ```@FormField``` 的 ```isRadio``` 配置为 ```true``` 时生效
   */
  radioButton?: boolean;

  /**
   * # 表单默认值
   */
  defaultValue?: boolean | string | number;

  /**
   * # switch不使用枚举配置的颜色
   * ---
   * 💡 ```@FormField``` 的 ```isSwitch``` 配置为 ```true``` 时生效
   */
  disableSwitchColor?: boolean;

  /**
   * # 输入框是否去除空格
   * ---
   * 💡 默认: ```AirTrim.NONE```
   */
  trim?: AirTrim

  /**
   * # 是否是纯中文
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  chinese?: boolean | string

  /**
   * # 是否是手机号
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  mobilePhone?: boolean | string

  /**
   * # 是否是座机电话
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  telPhone?: boolean | string

  /**
   * # 是否是电子邮箱
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  email?: boolean | string

  /**
   * # 是否是座机电话或手机
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  phone?: boolean | string

  /**
   * # 是否必填(字符串类型)
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredString?: boolean | string

  /**
   * # 是否必填(数字类型)
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredNumber?: boolean | string

  /**
   * # 是否必填(挂载对象)
   * ---
   * 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  requiredPayload?: boolean | string

  /**
   * # 正则表达式对象
   */
  regExp?: RegExp

  /**
   * # 是否隐藏表单字段
   * ---
   * 💡 如配置`true` 则`getFormFieldConfigList`将无法拿到这个属性
   */
  hide?: boolean
}
