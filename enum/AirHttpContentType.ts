/**
 * # `ContentType`
 * @author Hamm.cn
 */
export enum AirHttpContentType {
  /**
   * ### 使用 `JSON` 提交
   */
  JSON = 'application/json',

  /**
   * ### 使用 `Form` 表单提交
   */
  X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded',

  /**
   * ### 带文件的 `POST` 提交
   * ! 不建议使用,请直接使用 `AirDialog.showUpload` 上传
   * @deprecated
   */
  MULTIPART_FORM_DATA = 'multipart/form-data',

  /**
   * ### 使用 `XML` 格式提交
   */
  XML = 'application/xml',

  /**
   * ### 纯文本方式提交
   */
  PLAIN = 'text/plain',
}
