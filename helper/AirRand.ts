/**
 * # 随机生成数据助手
 * @author Hamm
 */
export class AirRand {
  /**
   * # 数字集合
   */
  private static readonly STRING_OF_NUMBER = '0123456789'

  /**
   * # 小写字母集合
   */
  private static readonly STRING_OF_LOWER_CHAR = 'abcdefghijklmnopqrstuvwxyz'

  /**
   * # 大写字母集合
   */
  private static readonly STRING_OF_UPPER_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  /**
   * # 默认的进制
   */
  private static readonly DEFAULT_RADIX = 10

  /**
   * # 指定范围内获取随机整数
   * @param min 最小
   * @param max 最大
   */
  static getRandNumber(min: number, max: number): number {
    return parseInt((min + Math.random() * (max - min)).toString(), this.DEFAULT_RADIX)
  }

  /**
   * # 获取随机数字字符串
   * @param length (可选)长度 默认6位
   */
  static getRandNumberString(length = 6): string {
    let str = ''
    for (let i = 0; i < length; i += 1) {
      str += this.STRING_OF_NUMBER[parseInt((Math.random() * this.STRING_OF_NUMBER.length).toString(), this.DEFAULT_RADIX)]
    }
    return str
  }

  /**
   * # 获取随机字母字符串
   * @param length (可选)长度 默认32位
   * @param isUpper (可选)是否大写 默认小写
   */
  static getRandCharString(length = 32, isUpper = false): string {
    let str = ''
    for (let i = 0; i < length; i += 1) {
      str += this.STRING_OF_LOWER_CHAR[parseInt((Math.random() * this.STRING_OF_LOWER_CHAR.length).toString(), this.DEFAULT_RADIX)]
    }
    return isUpper ? str.toLocaleUpperCase() : str
  }

  /**
   * # 获取大小写混合随机字母字符串
   * @param length (可选)长度 默认32位
   */
  static getRandMixedCharString(length = 32): string {
    let str = ''
    const strStorage = this.STRING_OF_LOWER_CHAR + this.STRING_OF_UPPER_CHAR
    for (let i = 0; i < length; i += 1) {
      str += strStorage[parseInt((Math.random() * strStorage.length).toString(), this.DEFAULT_RADIX)]
    }
    return str
  }

  /**
   * # 获取字母加数字随机字符串
   * @param length (可选)长度 默认32位
   * @param isUpper (可选)是否大写 默认false
   */
  static getRandNumberAndCharString(length = 32, isUpper = false): string {
    let str = ''
    const strStorage = this.STRING_OF_LOWER_CHAR + this.STRING_OF_NUMBER
    for (let i = 0; i < length; i += 1) {
      str += strStorage[parseInt((Math.random() * strStorage.length).toString(), this.DEFAULT_RADIX)]
    }
    return isUpper ? str.toLocaleUpperCase() : str
  }

  /**
   * # 获取大小写字母加数字随机字符串
   * @param length (可选)长度 默认32位
   */
  static getRandNumberAndMixedCharString(length = 32): string {
    let str = ''
    const strStorage = this.STRING_OF_LOWER_CHAR + this.STRING_OF_NUMBER + this.STRING_OF_UPPER_CHAR
    for (let i = 0; i < length; i += 1) {
      str += strStorage[parseInt((Math.random() * strStorage.length).toString(), this.DEFAULT_RADIX)]
    }
    return str
  }
}
