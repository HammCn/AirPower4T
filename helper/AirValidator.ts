/* eslint-disable regexp/no-super-linear-backtracking */
/* eslint-disable regexp/no-unused-capturing-group */
import type { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import type { AirEntity } from '../base/AirEntity'
import type { IJson } from '../interface/IJson'
import type { IValidateRule } from '../interface/IValidateRule'
import type { AirAny, AirValidatorCallback, AirValidatorRule, AirValidatorTrigger, AirValidatorType } from '../type/AirType'
import { AirConstant } from '../config/AirConstant'
import { AirInputType } from '../enum/AirInputType'
import { AirClassTransformer } from './AirClassTransformer'
import { AirI18n } from './AirI18n'

/**
 * # 表单验证工具
 * @author Hamm.cn
 */
export class AirValidator {
  /**
   * ### 错误提醒
   * 请通过 `.show()` 传入
   */
  message!: string

  /**
   * ### 类型
   * 可通过 `toString` `toNumber` `toArray` 设置 (默认`string`)
   */
  private type!: AirValidatorType

  /**
   * ### 触发方式
   * 不建议直接设置哦~ (默认blur)
   */
  private trigger: AirValidatorTrigger = 'change'

  /**
   * ### 是否必填
   * 可以调用 `.ifEmpty()`
   */
  private required = false

  /**
   * ### 自定义验证器
   * 请调用 `.setCustomValidator()`
   */
  private validator!: (rule: AirValidatorRule, value: AirAny, callback: AirValidatorCallback) => void

  /**
   * ### 通过指定错误信息来创建一个验证器
   * @param message `可选` 验证失败的提示
   */
  static show(message?: string): AirValidator {
    return new AirValidator().show(message)
  }

  /**
   * ### 验证是否手机号或座机号
   * @param phoneNumber 号码
   */
  static isTelephoneOrMobilePhone(phoneNumber: string): boolean {
    return this.isMobilePhone(phoneNumber) || this.isTelephone(phoneNumber)
  }

  /**
   * ### 验证是否邮箱
   * @param email
   */
  static isEmail(email: string): boolean {
    return /^[a-z0-9]+(\.([a-z0-9]+))*@[a-z0-9]+(\.([a-z0-9]+))+$/i.test(email)
  }

  /**
   * ### 验证是否手机号里
   * @param num 号码
   */
  static isMobilePhone(num: string): boolean {
    return /^(\+(\d{1,4}))?1[3-9](\d{9})$/.test(num)
  }

  /**
   * ### 验证是否座机号
   * @param num 号码
   */
  static isTelephone(num: string): boolean {
    return /^(((0\d{2,3})-)?((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4}))?)$/.test(num)
  }

  /**
   * ### 是否是纯汉字
   *
   * @param str 字符串
   */
  static isChinese(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.CHINESE}]+$`).test(str)
  }

  /**
   * ### 字符串是否只包含了字母
   * @param str 字符串
   */
  static isOnlyLetter(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.LETTER}]+$`).test(str)
  }

  /**
   * ### 字符串是否只包含了数字
   * @param str 字符串
   */
  static isOnlyNumberAndLetter(str: string): boolean {
    return new RegExp(String.raw`^[${AirInputType.LETTER + AirInputType.NUMBER}]+$`).test(str)
  }

  /**
   * ### 字符串是否是数字 正负整数小数和0
   * @param str 字符串
   */
  static isNumber(str: string): boolean {
    return /^(-)?\d+((.)\d+)?$/.test(str)
  }

  /**
   * ### 字符串是否是整数
   * @param str 字符串
   */
  static isInteger(str: string): boolean {
    return /^(-)?\d+$/.test(str)
  }

  /**
   * ### 字符串是否是自然整数小数
   * @param str 字符串
   */
  static isNaturalNumber(str: string): boolean {
    return /^\d+((.)\d+)?$/.test(str)
  }

  /**
   * ### 字符串是否是自然整数数
   * @param str 字符串
   */
  static isNaturalInteger(str: string): boolean {
    return /^\d+$/.test(str)
  }

  /**
   * ### 字符串是否是合法身份证
   * @param str 字符串
   */
  static isChineseIdCard(str: string): boolean {
    if (str.length !== 18 && str.length !== 15) {
      return false
    }

    const validArray: Array<Array<number | 'X'>> = [
      [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2],
    ]

    if (str.length === 15) {
      // 15位身份证校验
      // eslint-disable-next-line regexp/no-dupe-disjunctions
      return /^[1-9]\d{5}((\d{2}(((0[13578]|1[02])(0[1-9]|[12]\d|3[01]))|((0[13-9]|1[012])(0[1-9]|[12]\d|30))|(02(0[1-9]|1\d|2[0-8]))))|(((0[48]|[2468][048]|[13579][26])|(00))0229))\d{2}[0-9X]$/i.test(
        str,
      )
    }
    if (str.length !== 18) {
      return false
    }

    const year = Number.parseInt(str.substring(6), AirConstant.DEFAULT_RADIX)
    if (year > new Date().getFullYear() || year < 1900) {
      return false
    }
    const month = Number.parseInt(str.substring(10, 12), AirConstant.DEFAULT_RADIX)
    if (month > 12 || month < 1) {
      return false
    }
    const day = Number.parseInt(str.substring(12, 14), AirConstant.DEFAULT_RADIX)
    if (day > 31 || month < 1) {
      return false
    }
    let sum = 0
    for (let i = 0; i < 17; i += 1) {
      sum += Number.parseInt(str[i], AirConstant.DEFAULT_RADIX) * (validArray[0][i] as number)
    }
    // eslint-disable-next-line eqeqeq
    return validArray[1][sum % 11] == str[17]
  }

  /**
   * ### 是否满足如下的规则
   * @param str 被验证字符串
   * @param list 验证器
   */
  static validate(str: string, ...list: AirInputType[]) {
    let regString = AirConstant.STRING_EMPTY
    for (let i = 0; i < list.length; i += 1) {
      regString += list[i]
    }
    try {
      return new RegExp(String.raw`^[${regString}]+$`).test(str)
    }
    catch (e) {
      console.error(e)
      // 抛出错误的正则表达式
      throw new Error('What the fuck your regexp is?')
    }
  }

  /**
   * ### 创建一个验证器
   * @param rule 验证规则
   */
  static create(rule: IValidateRule): IValidateRule {
    return rule
  }

  /**
   * ### 创建验证器
   * @param form 表单对象
   * @param service 接口服务对象
   * @param rules `可选` 表单验证规则
   */
  static createRules<T extends AirEntity, S extends AirAbstractEntityService<T>>(
    form: T,
    service: S,
    rules: IValidateRule<T> = {},
  ) {
    const formRules: IJson = rules
    const entity = AirClassTransformer.newInstance(service.entityClass)
    const formFieldList = entity.getFormFieldConfigList()
    for (let i = 0; i < formFieldList.length; i += 1) {
      const config = formFieldList[i]
      const fieldKey = config.key
      if (!formRules[fieldKey]) {
        formRules[fieldKey] = []
      }
      if (config.requiredString) {
        formRules[fieldKey].push(this.getValidator(config.requiredString).ifEmpty())
      }
      if (config.requiredNumber) {
        formRules[fieldKey].push(this.getValidator(config.requiredNumber).toNumber().ifEmpty())
      }
      if (config.requiredPayload) {
        formRules[fieldKey].push(this.getValidator(config.requiredPayload).ifPayloadEmpty())
      }
      if (config.minLength) {
        formRules[fieldKey].push(AirValidator.show().ifLengthLessThan(config.minLength))
      }
      if (config.number) {
        if (config.min) {
          formRules[fieldKey].push(AirValidator.show().ifLessThan(config.min))
        }
        if (config.max) {
          formRules[fieldKey].push(AirValidator.show().ifGreaterThan(config.max))
        }
      }
      if (config.chinese) {
        formRules[fieldKey].push(this.getValidator(config.chinese).ifNotChinese())
      }
      if (config.telPhone) {
        formRules[fieldKey].push(this.getValidator(config.telPhone).ifNotTelPhone())
      }
      if (config.mobilePhone) {
        formRules[fieldKey].push(this.getValidator(config.mobilePhone).ifNotMobilePhone())
      }
      if (config.phone) {
        formRules[fieldKey].push(this.getValidator(config.phone).ifNotPhone())
      }
      if (config.email) {
        formRules[fieldKey].push(this.getValidator(config.email).ifNotEmail())
      }
      if (config.regExp) {
        formRules[fieldKey].push(AirValidator.show(AirConstant.STRING_EMPTY).ifNotTest(config.regExp))
      }
    }
    return formRules as IValidateRule<T>
  }

  /**
   * ### 获取一个验证器
   * @param configValue 验证器配置的值
   */
  private static getValidator(configValue: string | boolean): AirValidator {
    return AirValidator.show(typeof configValue === 'string' ? configValue : AirConstant.STRING_EMPTY)
  }

  /**
   * ### 转换验证数据为数组
   */
  toArray(): this {
    this.type = 'array'
    return this
  }

  /**
   * ### 转换验证数据为数字
   */
  toNumber(): this {
    this.type = 'number'
    return this
  }

  /**
   * ### 转换验证数据为字符串
   */
  toString(): this {
    this.type = 'string'
    return this
  }

  /**
   * ### 转换验证数据为日期
   */
  toDate(): this {
    this.type = 'date'
    return this
  }

  /**
   * ### 显示错误信息
   * @param message 验证失败提醒文案
   */
  show(message?: string): this {
    if (message) {
      this.message = message
    }
    return this
  }

  /**
   * ### 不允许的内容
   * @param str 内容
   */
  ifEquals(str: string): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (value && value === str) {
        callback(this.message || `输入的内容不能是${str}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 字符长度少于多少时报错
   * @param min 最小值
   */
  ifLengthLessThan(min: number): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (value && value.length < min) {
        callback(this.message || `最少请输入${min}个字符`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 字符长度超过多少时报错
   * @param max 最大值
   */
  ifLengthGreaterThan(max: number): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (value && value.length > max) {
        callback(this.message || `最多允许输入${max}个字符`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 不小于多少时报错 即必须大于
   * @param min 最小值
   */
  ifNotLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: number, callback: AirValidatorCallback) => {
      if (value <= min) {
        callback(this.message || `数字必须大于${min}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /** ********************************************* 数学相关 */

  /**
   * ### 不大于多少时报错 即必须小于
   * @param max 最大值
   */
  ifNotGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: number, callback: AirValidatorCallback) => {
      if (value >= max) {
        callback(this.message || `数字必须小于${max}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 小于多少时报错
   * @param min 最小值
   */
  ifLessThan(min: number): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: number, callback: AirValidatorCallback) => {
      if (value < min) {
        callback(this.message || `数字最小允许输入${min}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 大于多少时报错
   * @param max 最大值
   */
  ifGreaterThan(max: number): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: number, callback: AirValidatorCallback) => {
      if (value > max) {
        callback(this.message || `数字最大允许输入${max}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 为空时报错
   */
  ifEmpty(): this {
    this.required = true
    if (!this.message) {
      this.message = AirI18n.get().Required || '此项为必填项'
    }
    return this
  }

  /**
   * ### 失去焦点时验证
   */
  whenBlur(): this {
    this.trigger = 'blur'
    return this
  }

  /**
   * ### 设置自定义验证器
   * @param validator 验证方法
   */

  setCustomValidator(validator: (_: AirAny, value: unknown, callback: AirValidatorCallback) => void): this {
    this.validator = validator
    return this
  }

  /**
   * ### 当不包含某些字符串时报错
   * @param whats 字符串数组
   */
  ifNotContain(...whats: string[]): this {
    let error = false
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      error = false
      for (const what of whats) {
        if (!value || !value.includes(what)) {
          error = true
          break
        }
      }
      if (error) {
        callback(this.message || `输入中必须包含 ${whats.join(',')}`)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 当包含某些字符串时报错
   * @param whats 字符串数组
   */
  ifContain(...whats: string[]): this {
    let error = AirConstant.STRING_EMPTY
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value) {
        callback()
        return
      }
      for (const what of whats) {
        error = AirConstant.STRING_EMPTY
        if (value.includes(what)) {
          error = what
          break
        }
      }
      if (error !== AirConstant.STRING_EMPTY) {
        callback(this.message || `不允许输入中包含 ${error} `)
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 满足指定正则表达式后报错
   * @param regx 正则
   */
  ifTest(regx: RegExp): this {
    this.validator = (_: AirAny, value: string, callback: AirValidatorCallback) => {
      if (value && regx.test(value)) {
        callback(this.message || AirI18n.get().TestError || '正则表达式校验失败')
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 不满足指定正则表达式后报错
   * @param regx 正则
   */
  ifNotTest(regx: RegExp): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (value && !regx.test(value)) {
        callback(this.message || AirI18n.get().TestError || '正则表达式校验失败')
      }
      else {
        callback()
      }
    }
    return this
  }

  /**
   * ### 如果不是邮箱时报错
   */
  ifNotEmail(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isEmail(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidEmail || '请输入有效的电子邮箱')
      }
    }
    return this
  }

  /**
   * ### 如果不是手机号时报错
   */
  ifNotMobilePhone(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isMobilePhone(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidMobilePhone || '请输入有效的手机号')
      }
    }
    return this
  }

  /**
   * ### 如果不是座机号时报错
   */
  ifNotTelPhone(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isTelephone(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidTelPhone || '请输入有效的座机号')
      }
    }
    return this
  }

  /**
   * ### 如果不是联系电话时报错
   */
  ifNotPhone(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isTelephoneOrMobilePhone(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidPhone || '请输入有效的联系电话')
      }
    }
    return this
  }

  /**
   * ### 如果不是纯字母时报错
   */
  ifNotOnlyLetter(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isOnlyLetter(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidLetter || '只允许输入字母')
      }
    }
    return this
  }

  /**
   * ### 如果不是字母和数字报错
   */
  ifNotOnlyNumberAndLetter(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isOnlyNumberAndLetter(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidNumberAndLetter || '只允许输入字母和数字')
      }
    }
    return this
  }

  /**
   * ### 如果不是自然整数(含0)时报错
   */
  ifNotNaturalInteger(): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isNaturalInteger(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidNaturalIntegerNumber || '只允许输入非负整数')
      }
    }
    return this
  }

  /**
   * ### 如果不是自然整数(含0)时报错
   */
  ifNotNaturalNumber(): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isNaturalNumber(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidNaturalNumber || '只允许输入非负数字')
      }
    }
    return this
  }

  /**
   * ### 如果不是整数时报错
   */
  ifNotInteger(): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isInteger(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidIntegerNumber || '请输入有效的整数')
      }
    }
    return this
  }

  /**
   * ### 如果不是数字(含小数)时报错
   */
  ifNotNumber(): this {
    this.toNumber()
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isNumber(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidNumber || '请输入有效的数字')
      }
    }
    return this
  }

  /**
   * ### 如果不是有效身份证时报错
   */
  ifNotChineseIdCard(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isChineseIdCard(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().InvalidChineseIdCard || '请输入有效的身份证号')
      }
    }
    return this
  }

  /**
   * ### 如果不是纯汉字
   */
  ifNotChinese(): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.isChinese(value)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().IfNotChinese || '只允许输入中文汉字')
      }
    }
    return this
  }

  /**
   * ### 如果输入内容不在以下范围内报错
   * @param list 范围 枚举或字符
   */
  ifNot(...list: AirInputType[] | string[]): this {
    this.validator = (_: AirValidatorRule, value: string, callback: AirValidatorCallback) => {
      if (!value || AirValidator.validate(value, list as unknown as AirInputType)) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().ContainLetterNotAllowed || '包含不允许输入的字符')
      }
    }
    return this
  }

  /**
   * ### 如果输入内容不在以下范围内报错
   */
  ifPayloadEmpty(): this {
    this.required = true
    this.trigger = 'change'
    this.validator = (_: AirValidatorRule, value: object, callback: AirValidatorCallback) => {
      if (value) {
        callback()
      }
      else {
        callback(this.message || AirI18n.get().Required || '请先选择此项')
      }
    }
    return this
  }
}
