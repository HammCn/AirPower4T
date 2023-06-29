/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirColor } from '../enum/AirColor'

/**
 * # 标准字典 用于全局固定枚举常量的声明
 * @author Hamm
 */
export interface IDictionary {
  /**
   * # 常量的值
   */
  key: number | string | boolean,

  /**
   * # 常量的显示标题
   */
  label: any

  /**
   * # 标准 **AirColor** 颜色或自定义颜色
   * ---
   * ### 💡 支持 ```AirColor``` 标准色 / 十六进制 / HTML标准色
   */
  color?: AirColor | string

  /**
   * # 是否被禁用
   * ---
   * ### 💡  如禁用, 下拉选项中将显示但无法选中
   */
  disabled?: boolean

  /**
   * # 子字典
   */
  children?: this[]
}
