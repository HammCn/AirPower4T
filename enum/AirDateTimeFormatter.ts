/**
 * # 标准时间格式化
 * @author Hamm.cn
 */
export enum AirDateTimeFormatter {
  /**
   * ### e.g. `2022-02-02 22:22:22`
   */
  YYYY_MM_DD_HH_mm_ss = 'YYYY-MM-DD HH:mm:ss',

  /**
   * ### e.g. `15061231312312`
   * 毫秒时间戳
   */
  TIMESTAMP = 'x',

  /**
   * ### e.g. `02-02 22:22`
   */
  MM_DD_HH_mm = 'MM-DD HH:mm',

  /**
   * ### e.g. `2022-02-02`
   */
  YYYY_MM_DD = 'YYYY-MM-DD',

  /**
   * ### e.g. `22:22:22`
   */
  HH_mm_ss = 'HH:mm:ss',
}
