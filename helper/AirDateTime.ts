/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { AirConfig } from '../AirConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'

/**
 * # 时间日期时间戳格式化类
 * @author Hamm
 */
export class AirDateTime {
  /**
   * # 😜 睡会再起来干活
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
   * # 格式化到Unix秒时间戳(默认当前时间)
   * @param date [可选]Date对象/时间字符串
   */
  static getUnixTimeStamps(date?: Date | string): number {
    if (!date) {
      date = new Date()
    }
    return Math.round(this.getMilliTimeStamps(date) / 1000)
  }

  /**
   * # 格式化到毫秒时间戳(默认当前时间)
   * @param date [可选]Date对象/时间字符串
   */
  static getMilliTimeStamps(date?: Date | string): number {
    if (!date) {
      date = new Date()
    }
    switch (typeof date) {
      case 'string':
        return new Date(date).valueOf()
      case 'object':
        if (date instanceof Date) {
          return date.valueOf()
        }
        break
      default:
    }
    return 0
  }

  /**
   * # 从秒时间戳格式化时间
   * @param timeStamp 秒时间戳
   * @param formateString [可选]格式化模板
   */
  static formatFromSecond(timeStamp: number, formateString?: AirDateTimeFormatter | string): string {
    return this.formatFromDate(new Date(timeStamp * 1000), formateString)
  }

  /**
   * # 从毫秒时间戳格式化时间
   * @param timeStamp 毫秒时间戳
   * @param formateString [可选]格式化模板
   */
  static formatFromMilliSecond(timeStamp: number, formateString?: AirDateTimeFormatter | string): string {
    return this.formatFromDate(new Date(timeStamp), formateString)
  }

  /**
   * # 从字符串或对象格式化时间
   * @param date Date对象或字符串
   * @param formateString [可选]格式化模板
   */
  static formatFromDate(date: Date | string, formateString?: AirDateTimeFormatter | string): string {
    if (!formateString) {
      formateString = AirConfig.defaultDateTimeFormatter
    }
    switch (typeof date) {
      case 'string':
        date = new Date(date)
        break
      case 'object':
        if (!(date instanceof Date)) {
          date = new Date()
        }
        break
      default:
    }
    const dict: Record<string, string | number> = {
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
    return formateString.replace(/(YYYY|MM|DD|HH|ss|mm)/g, (arg) => dict[arg].toString())
  }

  /**
   * # 格式化到友好字符串显示
   * @param date Date对象或时间字符串
   */
  static getFriendlyDateTime(date: Date | string | number): string {
    const nowTimeStamps: number = this.getUnixTimeStamps(new Date())
    let oldTimeStamp = 0
    if (typeof date === 'number') {
      oldTimeStamp = parseInt((date / 1000).toString())
    } else {
      oldTimeStamp = this.getUnixTimeStamps(date)
    }
    const diffTimeStamp = Math.abs(nowTimeStamps - oldTimeStamp)
    if (oldTimeStamp > nowTimeStamps) {
      // after
      if (diffTimeStamp > 86400 * 36500) {
        return `${Math.floor(diffTimeStamp / 86400 / 100 / 31)}世纪后`
      }
      if (diffTimeStamp > 86400 * 365) {
        return `${Math.floor(diffTimeStamp / 86400 / 365)}年后`
      }
      if (diffTimeStamp > 86400 * 31) {
        return `${Math.floor(diffTimeStamp / 86400 / 31)}月后`
      }
      if (diffTimeStamp > 86400 * 7) {
        return `${Math.floor(diffTimeStamp / 86400 / 7)}周后`
      }
      if (diffTimeStamp > 86400) {
        return `${Math.floor(diffTimeStamp / 86400)}天后`
      }
      if (diffTimeStamp > 3600) {
        return `${Math.floor(diffTimeStamp / 3600)}小时后`
      }
      if (diffTimeStamp > 60) {
        return `${Math.floor(diffTimeStamp / 60)}分钟后`
      }
      if (diffTimeStamp > 0) {
        return `${diffTimeStamp}秒后`
      }
    } else {
      // before
      if (diffTimeStamp > 86400 * 36500) {
        return `${Math.floor(diffTimeStamp / 86400 / 100 / 365)}世纪前`
      }
      if (diffTimeStamp > 86400 * 365) {
        return `${Math.floor(diffTimeStamp / 86400 / 365)}年前`
      }
      if (diffTimeStamp > 86400 * 30) {
        return `${Math.floor(diffTimeStamp / 86400 / 30)}月前`
      }
      if (diffTimeStamp > 86400 * 7) {
        return `${Math.floor(diffTimeStamp / 86400 / 7)}周前`
      }
      if (diffTimeStamp > 86400) {
        return `${Math.floor(diffTimeStamp / 86400)}天前`
      }
      if (diffTimeStamp > 3600) {
        return `${Math.floor(diffTimeStamp / 3600)}小时前`
      }
      if (diffTimeStamp > 60) {
        return `${Math.floor(diffTimeStamp / 60)}分钟前`
      }
      if (diffTimeStamp >= 0) {
        return '刚刚'
      }
    }
    return '未知时间'
  }
}
