/* eslint-disable no-case-declarations */
import { AirInputType } from '../enum/AirInputType'

/**
 * # 表单验证工具
 * @author Hamm.cn
 * */
export class AirValidator {
  /**
   * ## 默认的进制
   */
  private static readonly DEFAULT_RADIX = 10

  /**
   * ## 验证是否手机号或座机号
   * @param phoneNumber 号码
   */
  static isTelephoneOrMobilePhone(phoneNumber: string): boolean {
    return this.isMobilePhone(phoneNumber) || this.isTelephone(phoneNumber)
  }

  /**
   * ## 验证是否邮箱
   * @param email
   */
  static isEmail(email: string): boolean {
    return /^[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))*@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))+$/.test(email)
  }

  /**
   * ## 验证是否手机号
   * @param num 号码
   */
  static isMobilePhone(num: string): boolean {
    return /^(\+(\d{1,4}))?1[3-9](\d{9})$/.test(num)
  }

  /**
   * ## 验证是否座机号
   * @param num 号码
   */
  static isTelephone(num: string): boolean {
    return /^(((0\d{2,3})-)?((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4}))?)$/.test(num)
  }

  /**
   * ## 是否是纯汉字
   * @param str 字符串
   */
  static isChinese(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.CHINESE}]+$`).test(str)
  }

  /**
   * ## 字符串是否只包含了字母
   * @param str 字符串
   */
  static isOnlyLetter(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.LETTER}]+$`).test(str)
  }

  /**
   * ## 字符串是否只包含了数字
   * @param str 字符串
   */
  static isOnlyNumberAndLetter(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.LETTER + AirInputType.NUMBER}]+$`).test(str)
  }

  /**
   * ## 字符串是否是数字 正负整数小数和0
   * @param str 字符串
     */
  static isNumber(str: string): boolean {
    return /^(-)?[0-9]+((.)[0-9]+)?$/.test(str)
  }

  /**
   * ## 字符串是否是整数
   * @param str 字符串
   */
  static isInteger(str: string): boolean {
    return /^(-)?[0-9]+$/.test(str)
  }

  /**
   * ## 字符串是否是自然整数小数
   * @param str 字符串
   */
  static isNaturalNumber(str: string): boolean {
    return /^[0-9]+((.)[0-9]+)?$/.test(str)
  }

  /**
   * ## 字符串是否是自然整数数
   * @param str 字符串
   */
  static isNaturalInteger(str: string): boolean {
    return /^[0-9]+$/.test(str)
  }

  /**
   * ## 字符串是否是合法身份证
   * @param str 字符串
   */
  static isChineseIdCard(str: string): boolean {
    if (str.length !== 18 && str.length !== 15) {
      return false
    }
    switch (str.length) {
      case 18:
        const year = parseInt(str.substring(6), this.DEFAULT_RADIX)
        if (year > new Date().getFullYear() || year < 1900) {
          return false
        }
        const month = parseInt(str.substring(10, 12), this.DEFAULT_RADIX)
        if (month > 12 || month < 1) {
          return false
        }
        const day = parseInt(str.substring(12, 14), this.DEFAULT_RADIX)
        if (day > 31 || month < 1) {
          return false
        }
        const arr: Array<Array<number | 'X'>> = [[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]]
        let sum = 0
        for (let i = 0; i < 17; i += 1) {
          sum += parseInt(str[i], this.DEFAULT_RADIX) * (arr[0][i] as number)
        }
        // eslint-disable-next-line eqeqeq
        if (arr[1][(sum % 11)] == str[17]) {
          return true
        }
        break
      case 15:
        // 15位省份证校验
        const reg = /^[1-9]\d{5}((\d{2}(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[13456789]|1[012])(0[1-9]|[12][0-9]|30))|(02(0[1-9]|1[0-9]|2[0-8]))))|(((0[48]|[2468][048]|[13579][26])|(00))0229))\d{2}[0-9Xx]$/
        if (reg.test(str)) {
          return true
        }
        break
      default:
    }

    return false
  }

  /**
   * ## 是否满足如下的规则
   * @param str 被验证字符串
   * @param list 验证器
   */
  static validate(str: string, ...list: AirInputType[]) {
    let regString = ''
    for (let i = 0; i < list.length; i += 1) {
      regString += list[i]
    }
    try {
      return new RegExp(String.raw`^[${regString}]+$`).test(str)
    } catch (e) {
      return false
    }
  }
}
