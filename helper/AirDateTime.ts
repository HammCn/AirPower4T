import { AirConfig } from '../config/AirConfig'
import { AirConstant } from '../config/AirConstant'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { IJson } from '../interface/IJson'

/**
 * # 时间日期时间戳格式化类
 * @author Hamm.cn
 */
export class AirDateTime {
  /**
   * ### 睡会再起来干活
   * 不要忘了`await`，否则没睡醒就起来干活了 :)
   * @param milliSeconds 毫秒数
   */
  static async sleep(milliSeconds: number): Promise<void> {
    return new Promise((success) => {
      setTimeout(() => {
        success()
      }, milliSeconds)
    })
  }

  /**
   * ### 格式化到`Unix`秒时间戳
   * @param date `可选` Date对象/时间字符串 (默认当前时间)
   */
  static getUnixTimeStamps(date?: Date | string): number {
    return Math.round(this.getMilliTimeStamps(date) / AirConstant.THOUSAND)
  }

  /**
   * ### 格式化到毫秒时间戳
   * @param date `可选` Date对象/时间字符串 (默认当前时间)
   */
  static getMilliTimeStamps(date?: Date | string): number {
    if (!date) {
      return new Date().valueOf()
    }
    if (typeof date === 'object') {
      return date.valueOf()
    }
    return new Date(date).valueOf()
  }

  /**
   * ### 从秒时间戳格式化时间
   * @param timeStamp 秒时间戳
   * @param formatString `可选` 格式化模板 默认为`AirConfig.dateTimeFormatter`
   */
  static formatFromSecond(timeStamp: number, formatString?: AirDateTimeFormatter | string): string {
    return this.formatFromDate(new Date(timeStamp * AirConstant.THOUSAND), formatString)
  }

  /**
   * ### 从毫秒时间戳格式化时间
   * @param timeStamp 毫秒时间戳
   * @param formatString `可选` 格式化模板 默认为`AirConfig.dateTimeFormatter`
   */
  static formatFromMilliSecond(timeStamp: number, formatString?: AirDateTimeFormatter | string): string {
    return this.formatFromDate(new Date(timeStamp), formatString)
  }

  /**
   * ### 从字符串或对象格式化时间
   * @param date Date对象或字符串
   * @param formatString `可选` 格式化模板 默认为`AirConfig.dateTimeFormatter`
   */
  static formatFromDate(date: Date | string, formatString?: AirDateTimeFormatter | string): string {
    if (!formatString) {
      formatString = AirConfig.dateTimeFormatter
    }
    if (typeof date !== 'object') {
      date = new Date(date)
    }
    const dict: IJson = {
      YYYY: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate(),
      H: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      MM: (`${date.getMonth() + 101}`).substring(1),
      DD: (`${date.getDate() + 100}`).substring(1),
      HH: (`${date.getHours() + 100}`).substring(1),
      mm: (`${date.getMinutes() + 100}`).substring(1),
      ss: (`${date.getSeconds() + 100}`).substring(1),
    }
    return formatString.replace(/(YYYY|MM|DD|HH|ss|mm)/g, (arg) => dict[arg].toString())
  }

  /**
   * ### 格式化到友好字符串显示
   * @param date Date对象或时间字符串
   */
  static getFriendlyDateTime(date: Date | string | number): string {
    const nowTimeStamps: number = this.getUnixTimeStamps(new Date())
    let oldTimeStamp: number
    if (typeof date === 'number') {
      oldTimeStamp = parseInt((date / AirConstant.THOUSAND).toString(), 10)
    } else {
      oldTimeStamp = this.getUnixTimeStamps(date)
    }
    const diffTimeStamp = Math.abs(nowTimeStamps - oldTimeStamp)
    const secondOfYear = AirConstant.SECONDS_OF_DAY * AirConstant.DAY_OF_YEAR
    const secondOfMonth = AirConstant.SECONDS_OF_DAY * AirConstant.DAY_OF_MONTH
    const secondOfWeek = AirConstant.SECONDS_OF_DAY * AirConstant.DAY_OF_WEEK
    const secondOfHour = AirConstant.TIME_RADIX * AirConstant.TIME_RADIX
    if (oldTimeStamp > nowTimeStamps) {
      // after
      if (diffTimeStamp > secondOfYear) {
        return `${Math.floor(diffTimeStamp / secondOfYear)}年后`
      }
      if (diffTimeStamp > secondOfMonth) {
        return `${Math.floor(diffTimeStamp / secondOfMonth)}月后`
      }
      if (diffTimeStamp > secondOfWeek) {
        return `${Math.floor(diffTimeStamp / secondOfWeek)}周后`
      }
      if (diffTimeStamp > AirConstant.SECONDS_OF_DAY) {
        return `${Math.floor(diffTimeStamp / AirConstant.SECONDS_OF_DAY)}天后`
      }
      if (diffTimeStamp > secondOfHour) {
        return `${Math.floor(diffTimeStamp / secondOfHour)}小时后`
      }
      if (diffTimeStamp > AirConstant.TIME_RADIX) {
        return `${Math.floor(diffTimeStamp / AirConstant.TIME_RADIX)}分钟后`
      }
      if (diffTimeStamp > 0) {
        return `${diffTimeStamp}秒后`
      }
    } else {
      // before
      if (diffTimeStamp > secondOfYear) {
        return `${Math.floor(diffTimeStamp / secondOfYear)}年前`
      }
      if (diffTimeStamp > secondOfMonth) {
        return `${Math.floor(diffTimeStamp / secondOfMonth)}月前`
      }
      if (diffTimeStamp > secondOfWeek) {
        return `${Math.floor(diffTimeStamp / secondOfWeek)}周前`
      }
      if (diffTimeStamp > AirConstant.SECONDS_OF_DAY) {
        return `${Math.floor(diffTimeStamp / AirConstant.SECONDS_OF_DAY)}天前`
      }
      if (diffTimeStamp > secondOfHour) {
        return `${Math.floor(diffTimeStamp / secondOfHour)}小时前`
      }
      if (diffTimeStamp > AirConstant.TIME_RADIX) {
        return `${Math.floor(diffTimeStamp / AirConstant.TIME_RADIX)}分钟前`
      }
      if (diffTimeStamp >= 0) {
        return '刚刚'
      }
    }
    return '未知时间'
  }
}
