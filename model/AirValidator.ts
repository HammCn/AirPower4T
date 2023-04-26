/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */

import { AirInputType } from '../enum/AirInputType'
import { AirValidatorHelper } from '../helper/AirValidatorHelper'

/**
 * # 表单验证配置
 * @author Hamm
 * */
export class AirValidator {
  /**
   * # 创建一个验证器规则
   * @param message 验证失败的提示
   */
  static show(message: string): AirValidator {
    return new AirValidator().show(message)
  }

  /**
   * # 类型 默认string
   * 可通过 ```toString``` ```toNumber``` ```toArray```设置
   */
  private type!: string

  /**
   * # 触发方式(默认blur)
   * 不建议直接设置哦~
   */
  private trigger: 'blur' | 'change' = 'change'

  /**
   * # 错误提醒
   * 请通过 ```.show()``` 传入
   */
  message!: string

  /**
   * # 是否必填
   * 可以调用 ```.ifEmpty()```
   */
  private required = false

  /**
   * # 自定义验证器
   * 请调用 ```.setCustomValidator()```
   */
  private validator!: (rule: any, value: any, callback: Function) => void

  /**
   * # 转换验证数据为数组
   */
  toArray(): this {
    this.type = 'array'
    return this
  }

  /**
   * # 转换验证数据为数字
   */
  toNumber(): this {
    this.type = 'number'
    return this
  }

  /**
   * # 转换验证数据为字符串
   */
  toString(): this {
    this.type = 'string'
    return this
  }

  /**
   * # 转换验证数据为日期
   */
  toDate(): this {
    this.type = 'date'
    return this
  }

  /**
   * # 显示错误信息
   * @param message 验证失败提醒文案
   */
  show(message?: string): this {
    if (message) {
      this.message = message
    }
    return this
  }

  /**
   * # 不允许的内容
   * @param str 内容
   */
  ifEquals(str: string): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && value === str) {
        callback(this.message || `输入的内容不能是${str}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 字符长度少于多少时报错
   * @param min 最小值
   */
  ifLengthLessThan(min: number): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && value.length < min) {
        callback(this.message || `最少请输入${min}个字符`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 字符长度超过多少时报错
   * @param max 最大值
   */
  ifLengthGreaterThan(max: number): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && value.length > max) {
        callback(this.message || `最多允许输入${max}个字符`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 不小于多少时报错 即必须大于
   * @param min 最小值
   */
  ifNotLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value <= min) {
        callback(this.message || `数字必须大于${min}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 不大于多少时报错 即必须小于
   * @param max 最大值
   */
  ifNotGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value >= max) {
        callback(this.message || `数字必须小于${max}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 小于多少时报错
   * @param min 最小值
   */
  ifLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value < min) {
        callback(this.message || `数字最小允许输入${min}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 大于多少时报错
   * @param max 最大值
   */
  ifGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: any, value: number, callback: Function) => {
      if (value > max) {
        callback(this.message || `数字最大允许输入${max}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 为空时报错
   */
  ifEmpty(): this {
    this.required = true
    if (!this.message) {
      this.message = '此项必须为必填项'
    }
    return this
  }

  /**
   * # 失去焦点时验证
   */
  whenBlur(): this {
    this.trigger = 'blur'
    return this
  }

  /**
   * # 设置自定义验证器
   * @param validator 验证方法
   */
  setCustomValidator(validator: (_: any, value: any, callback: Function) => void): this {
    this.validator = validator
    return this
  }

  /**
   * # 当不包含某些字符串时报错
   * @param whats 字符串数组
   */
  ifNotContain(...whats: string[]): this {
    let error = false
    this.validator = (_: any, value: string, callback: Function) => {
      error = false
      for (const what of whats) {
        if (!value || value.indexOf(what) < 0) {
          error = true
          break
        }
      }
      if (error) {
        callback(this.message || `输入中必须包含 ${whats.join(',')}`)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 当包含某些字符串时报错
   * @param whats 字符串数组
   */
  ifContain(...whats: string[]): this {
    let error = ''
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value) {
        callback()
        return
      }
      for (const what of whats) {
        error = ''
        if (value.indexOf(what) >= 0) {
          error = what
          break
        }
      }
      if (error !== '') {
        callback(this.message || `不允许输入中包含 ${error} `)
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 满足指定的正则表达式后报错
   * @param regx 正则
   */
  ifTest(regx: RegExp): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && regx.test(value)) {
        callback(this.message || '正则表达式校验失败')
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 不满足指定的正则表达式后报错
   * @param regx 正则
   */
  ifNotTest(regx: RegExp): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (value && !regx.test(value)) {
        callback(this.message || '正则表达式校验失败')
      } else {
        callback()
      }
    }
    return this
  }

  /**
   * # 如果不是手机号时报错
   */
  ifNotEmail(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isEmail(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的电子邮箱')
      }
    }
    return this
  }

  /**
   * # 如果不是手机号时报错
   */
  ifNotMobilePhone(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isMobilePhone(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的手机号')
      }
    }
    return this
  }

  /**
   * # 如果不是座机号时报错
   */
  ifNotTelPhone(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isTelphone(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的座机号')
      }
    }
    return this
  }

  /**
   * # 如果不是联系电话时报错
   */
  ifNotPhone(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isTelphoneOrMobilePhone(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的联系电话')
      }
    }
    return this
  }

  /**
   * # 如果不是纯字母时报错
   */
  ifNotOnlyLetter(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isOnlyLetter(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入字母')
      }
    }
    return this
  }

  /**
   * # 如果不是字母和数字报错
   */
  ifNotOnlyNumberAndLetter(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isOnlyNumberAndLetter(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入字母和数字')
      }
    }
    return this
  }

  /** ********************************************* 数学相关 */

  /**
   * # 如果不是自然整数(含0)时报错
   */
  ifNotNaturalInteger(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNaturalInteger(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入非负整数')
      }
    }
    return this
  }

  /**
   * # 如果不是自然整数(含0)时报错
   */
  ifNotNaturalNumber(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNaturalNumber(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入非负数字')
      }
    }
    return this
  }

  /**
   * # 如果不是整数时报错
   */
  ifNotInteger(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isInteger(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的整数')
      }
    }
    return this
  }

  /**
   * # 如果不是数字(含小数)时报错
   */
  ifNotNumber(): this {
    this.toNumber()
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isNumber(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的数字')
      }
    }
    return this
  }

  /**
   * # 如果不是有效身份证时报错
   */
  ifNotChineseIdCard(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isChineseIdCard(value)) {
        callback()
      } else {
        callback(this.message || '请输入有效的身份证号')
      }
    }
    return this
  }

  /**
   * # 如果不是纯汉字
   */
  ifNotChinese(): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.isChinese(value)) {
        callback()
      } else {
        callback(this.message || '只允许输入中文汉字')
      }
    }
    return this
  }

  /**
   * # 如果输入内容不在以下范围内报错
   * @param list 范围 枚举或字符
   */
  ifNot(...list: AirInputType[] | string[]): this {
    this.validator = (_: any, value: string, callback: Function) => {
      if (!value || AirValidatorHelper.validate(value, list as unknown as AirInputType)) {
        callback()
      } else {
        callback(this.message || '包含不允许输入的字符')
      }
    }
    return this
  }
}
