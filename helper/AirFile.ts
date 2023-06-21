import { AirConfig } from '../config/AirConfig'

/**
 * # 文件助手类
 * @author Hamm
 */
export class AirFile {
  static readonly FILE_SIZE_CALCULATION_CONSTANT = 1024

  /**
   * # 字节数转可读文件大小
   * @param size 字节数
   * @param fractionDigits 小数位数
   */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let res = ''
    for (let i = 0; i < unitArr.length; i += 1) {
      if (size < this.FILE_SIZE_CALCULATION_CONSTANT ** (i + 1)) {
        res = `${(size / (this.FILE_SIZE_CALCULATION_CONSTANT ** i)).toFixed(fractionDigits)}${unitArr[i]}`
        break
      }
      res = 'LARGE FILE'
    }
    return res
  }

  /**
   * # 获取静态文件的绝对地址
   * @param url 地址
   */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      return ''
    }
    if (url.includes('https://') || url.includes('http://')) {
      return url
    }
    return AirConfig.staticUrl + url
  }
}
