import { AirConfig } from '../config/AirConfig'
import { AirConstant } from '../config/AirConstant'
import { AirI18n } from './AirI18n'

/**
 * # 文件助手类
 * @author Hamm.cn
 */
export class AirFile {
  /**
   * ### 文件单位列表
   */
  static readonly FILE_UNIT_LIST = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  /**
   * ### 字节数转可读文件大小
   * @param size 字节数
   * @param fractionDigits 小数位数
   */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    if (size <= 0) {
      return AirI18n.get().FileUnknownSize || '未知大小'
    }
    for (let i = 0; i < this.FILE_UNIT_LIST.length; i += 1) {
      if (size < AirConstant.FILE_SIZE_RADIX ** (i + 1)) {
        return `${(size / (AirConstant.FILE_SIZE_RADIX ** i)).toFixed(fractionDigits)}${this.FILE_UNIT_LIST[i]}`
      }
    }
    return AirI18n.get().FileTooLarge || '文件过大'
  }

  /**
   * ### 获取静态文件的绝对地址
   * @param url 地址
   */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      return AirConstant.EMPTY_STRING
    }
    if (url.includes(AirConstant.PREFIX_HTTP) || url.includes(AirConstant.PREFIX_HTTPS)) {
      return url
    }
    return AirConfig.staticUrl + url
  }
}
