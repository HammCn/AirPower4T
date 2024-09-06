import { AirConstant } from "../config/AirConstant"

/**
 * # 版本工具类
 * @author Hamm.cn
 */
export class AirVersion {
  /**
   * ## 版本号长度
   */
  private static readonly VERSION_LENGTH = 2
  
  /**
   * ## 获取版本号数字
   * @param version 版本号字符串
   * @param splitor `可选` 分隔符 默认 `.`
   * @param padding `可选` 填充位数 默认 `2`
   * @returns 版本号数字
   */
  static parseVersion(version: string, splitor = AirConstant.DOT, padding = this.VERSION_LENGTH): number {
    return parseInt(version.split(splitor)
      .map((item) => item.padStart(padding, AirConstant.ZERO_STRING))
      .join(AirConstant.EMPTY_STRING), 10)
  }

  /**
   * ## 解析版本号数字
   * @param version 版本号数字
   * @param splitor `可选` 分隔符 默认 `.`
   * @param padding `可选` 填充位数 默认 `2`
   * @returns 版本号字符串
   */
  static formatVersion(version: number, splitor = AirConstant.DOT, padding = this.VERSION_LENGTH): string {
    const major = Math.floor(version / (10 ** padding ** padding))
    const minor = Math.floor(version % (10 ** padding ** padding)) / (10 ** padding)
    return [major, minor].join(splitor)
  }
}
