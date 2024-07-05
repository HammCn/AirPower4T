/**
 * # 依赖版本检测
 * @author Hamm.cn
 */
export class AirVersion {

  /**
   * # 获取版本号数字
   * @param version 版本号字符串
   * @param splitor (可选)分隔符 默认 `.`
   * @param padding (可选)填充位数 默认 `2`
   * @returns 版本号数字
   */
  static parseVersion(version: string, splitor = '.', padding = 2): number {
    return parseInt(version.split(splitor).map((item) => item.padStart(padding, '0')).join(''), 10)
  }

  /**
   * # 解析版本号数字
   * @param version 版本号数字
   * @param splitor (可选)分隔符 默认 `.`
   * @param padding (可选)填充位数 默认 `2`
   * @returns 版本号字符串
   */
  static formatVersion(version: number, splitor = '.', padding = 2): string {
    const major = Math.floor(version / (10 ** padding ** padding))
    const minor = Math.floor(version % (10 ** padding ** padding)) / (10 ** padding)
    return [major, minor].join(splitor)
  }
}
