import { AirEnum } from '../base/AirEnum'

/**
 * # 脱敏类型
 */
export class AirDesensitizeType extends AirEnum {
  /**
   * ### 座机号码
   */
  static TELEPHONE = new AirDesensitizeType(0, '座机号码', 3, 4)
  /**
   * ### 手机号码
   */
  static MOBILE = new AirDesensitizeType(1, '手机号码', 3, 4)
  /**
   * ### 身份证号
   */
  static ID_CARD = new AirDesensitizeType(2, '身份证号', 6, 4)
  /**
   * ### 银行卡号
   */
  static BANK_CARD = new AirDesensitizeType(3, '银行卡号', 4, 4)
  /**
   * ### 车牌号
   */
  static CAR_NUMBER = new AirDesensitizeType(4, '车牌号', 2, 1)
  /**
   * ### 邮箱
   */
  static EMAIL = new AirDesensitizeType(5, '邮箱', 2, 2)
  /**
   * ### 中文姓名
   */
  static CHINESE_NAME = new AirDesensitizeType(6, '中文名', 1, 1)
  /**
   * ### 地址
   */
  static ADDRESS = new AirDesensitizeType(7, '地址', 3, 0)
  /**
   * ### IPv4地址
   */
  static IP_V4 = new AirDesensitizeType(8, 'IPv4地址', 0, 0)
  /**
   * ### 自定义
   */
  static CUSTOM = new AirDesensitizeType(9, '自定义', 0, 0)
  /**
   * ### 脱敏头部保留
   */
  head!: number
  /**
   * ### 脱敏尾部保留
   */
  tail!: number

  constructor(key: number, label: string, head: number, tail: number) {
    super(key, label)
    this.head = head
    this.tail = tail
  }
}
