import { AirConfig } from '../config/AirConfig'
import { AirI18n } from './AirI18n'

/**
 * # 文件助手类
 * @author Hamm.cn
 */
export class AirFile {
  /**
   * ## 文件大小计算常量
   */
  static readonly FILE_SIZE_CALCULATION_CONSTANT = 1024

  /**
   * ## 文件单位列表
   */
  static readonly FILE_UNIT_LIST = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  /**
   * ## 字节数转可读文件大小
   * @param size 字节数
   * @param fractionDigits 小数位数
   */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    if (size <= 0) {
      return AirI18n.get().FileUnknownSize || '未知大小'
    }
    for (let i = 0; i < this.FILE_UNIT_LIST.length; i += 1) {
      if (size < this.FILE_SIZE_CALCULATION_CONSTANT ** (i + 1)) {
        return `${(size / (this.FILE_SIZE_CALCULATION_CONSTANT ** i)).toFixed(fractionDigits)}${this.FILE_UNIT_LIST[i]}`
      }
    }
    return AirI18n.get().FileTooLarge || '文件过大'
  }

  /**
   * ## 获取静态文件的绝对地址
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
