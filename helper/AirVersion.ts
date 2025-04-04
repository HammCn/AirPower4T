import ElementPlus from 'element-plus'
import { AirConstant } from '../config/AirConstant'

/**
 * # 版本工具类
 * @author Hamm.cn
 */
export class AirVersion {
  /**
   * ### `Element Plus` 最低版本
   */
  private static readonly elementPlusRequired = '2.8.0'

  /**
   * ### 版本号长度
   */
  private static readonly VERSION_LENGTH = 2

  /**
   * ### 检查 `Element Plus`
   */
  static checkElementPlus() {
    if (this.parseVersion(ElementPlus.version) >= this.parseVersion(this.elementPlusRequired)) {
      return
    }
    console.error(
      `%cElement Plus 版本过低，请升级至 ${this.elementPlusRequired} 或以上版本`,
      'color:red;font-size:12px;',
    )
  }

  /**
   * ### 检查依赖版本
   */
  static check() {
    this.checkElementPlus()
  }

  /**
   * ### 获取版本号数字
   * @param version 版本号字符串
   * @param separator `可选` 分隔符 默认 `.`
   * @param padding `可选` 填充位数 默认 `2`
   * @returns 版本号数字
   */
  static parseVersion(version: string, separator = AirConstant.STRING_DOT, padding = this.VERSION_LENGTH): number {
    return Number.parseInt(
      version
        .split(separator)
        .map(item => item.padStart(padding, AirConstant.STRING_ZERO))
        .join(AirConstant.STRING_EMPTY),
      10,
    )
  }

  /**
   * ### 解析版本号数字
   * @param version 版本号数字
   * @param separator `可选` 分隔符 默认 `.`
   * @param padding `可选` 填充位数 默认 `2`
   * @returns 版本号字符串
   */
  static formatVersion(version: number, separator = AirConstant.STRING_DOT, padding = this.VERSION_LENGTH): string {
    const major = Math.floor(version / 10 ** (padding ** padding))
    const minor = Math.floor(version % 10 ** (padding ** padding)) / 10 ** padding
    return [major, minor].join(separator)
  }
}
