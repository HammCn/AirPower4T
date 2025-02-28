/**
 * # `AirPower` 内置常量
 *
 * @author Hamm.cn
 */
export class AirConstant {
  /**
   * ### `id`
   */
  static readonly STRING_ID = 'id'

  /**
   * ### `http://`
   */
  static readonly PREFIX_HTTP = 'http://'

  /**
   * ### `https://`
   */
  static readonly PREFIX_HTTPS = 'https://'

  /**
   * ### 空字符串
   */
  static readonly STRING_EMPTY = ''

  /**
   * ### `Content-Type`
   */
  static readonly CONTENT_TYPE = 'Content-Type'

  /**
   * ### 半角问号 `?`
   */
  static readonly STRING_QUESTION = '?'

  /**
   * ### 连接符号 `&`
   */
  static readonly STRING_AND = '&'

  /**
   * ### 星号 `*`
   */
  static readonly STRING_ASTERISK = '*'

  /**
   * ### `AirModel`
   */
  static readonly AIR_MODEL = 'AirModel'

  /**
   * ### 下划线 `_`
   */
  static readonly STRING_UNDERLINE = '_'

  /**
   * ### 默认进制
   */
  static readonly DEFAULT_RADIX = 10

  /**
   * ### `.` 点
   */
  static readonly STRING_DOT = '.'

  /**
   * ### `children`
   */
  static readonly STRING_CHILDREN = 'children'

  /**
   * ### `'0'`
   */
  static readonly STRING_ZERO = '0'

  /**
   * ### 半角逗号 `,`
   */
  static readonly STRING_COMMA = ','

  /**
   * ### 横线 `-`
   */
  static readonly STRING_LINE = '-'

  /**
   * ### 时间进制
   */
  static readonly SECOND_OF_MINUTE = 60

  /**
   * ### 每秒的毫秒数
   */
  static readonly MILLISECONDS_OF_SECOND = 1000

  /**
   * ### 文件大小进制
   * 😄
   */
  static readonly RADIX_FILE_SIZE = 1024

  /**
   * ### 每天小时
   */
  static readonly HOUR_OF_DAY = 24

  /**
   * ### 每月天数
   */
  static readonly DAY_OF_MONTH = 30

  /**
   * ### 每年月份
   */
  static readonly MONTH_OF_YEAR = 12

  /**
   * ### 每年天数
   */
  static readonly DAY_OF_YEAR = 365

  /**
   * ### 每周天数
   */
  static readonly DAY_OF_WEEK = 7

  /**
   * ### 每年平均周
   */
  static readonly WEEK_OF_YEAR = 52

  /**
   * ### 每月平均周
   */
  static readonly WEEK_OF_MONTH = 4

  /**
   * ### 每天秒数
   */
  static readonly SECONDS_OF_DAY = this.HOUR_OF_DAY * this.SECOND_OF_MINUTE * this.SECOND_OF_MINUTE
}
