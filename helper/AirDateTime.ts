import { AirConfig } from '../config/AirConfig'
import { AirConstant } from '../config/AirConstant'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { IDictionary } from '../interface/IDictionary'
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
    return Math.round(this.getMilliTimeStamps(date) / AirConstant.MILLISECONDS_PER_SECOND)
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
    return this.formatFromDate(new Date(timeStamp * AirConstant.MILLISECONDS_PER_SECOND), formatString)
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
      MM: `${date.getMonth() + 101}`.substring(1),
      DD: `${date.getDate() + 100}`.substring(1),
      HH: `${date.getHours() + 100}`.substring(1),
      mm: `${date.getMinutes() + 100}`.substring(1),
      ss: `${date.getSeconds() + 100}`.substring(1),
    }
    return formatString.replace(/(YYYY|MM|DD|HH|ss|mm)/g, (arg) => dict[arg].toString())
  }

  /**
   * ### 格式化到友好字符串显示
   * @param date Date对象或时间字符串
   */
  static getFriendlyDateTime(date: Date | string | number): string {
    const currentTimestamp: number = this.getUnixTimeStamps(new Date())
    let timestamp: number
    if (typeof date === 'number') {
      timestamp = parseInt((date / AirConstant.MILLISECONDS_PER_SECOND).toString(), 10)
    } else {
      timestamp = this.getUnixTimeStamps(date)
    }
    const diff = Math.abs(currentTimestamp - timestamp)

    const suffix = timestamp > currentTimestamp ? '后' : '前'

    const stepDictionary: IDictionary<number>[] = [
      {
        key: 0,
        label: '秒',
      },
      {
        key: AirConstant.SECOND_PER_MINUTE,
        label: '分钟',
      },
      {
        key: AirConstant.SECOND_PER_MINUTE ** 2,
        label: '小时',
      },
      {
        key: AirConstant.SECONDS_PER_DAY,
        label: '天',
      },
      {
        key: AirConstant.SECONDS_PER_DAY * AirConstant.DAY_PER_WEEK,
        label: '周',
      },
      {
        key: AirConstant.SECONDS_PER_DAY * AirConstant.DAY_PER_MONTH,
        label: '月',
      },
      {
        key: AirConstant.SECONDS_PER_DAY * AirConstant.DAY_PER_YEAR,
        label: '年',
      },
    ]
    for (let i = stepDictionary.length - 1; i >= 0; i -= 1) {
      const step = stepDictionary[i]
      if (timestamp <= currentTimestamp && diff < AirConstant.SECOND_PER_MINUTE) {
        // 过去时间，且小于60s
        return '刚刚'
      }
      if (diff > step.key) {
        if (step.key === 0) {
          return `${Math.floor(diff)}${step.label}${suffix}`
        }
        return `${Math.floor(diff / step.key)}${step.label}${suffix}`
      }
    }
    return '未知时间'
  }
}
