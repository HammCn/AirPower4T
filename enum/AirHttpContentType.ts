/* eslint-disable no-unused-vars */
/**
 * # HTTP ContentType
 * @author Hamm
 */
export enum AirHttpContentType {
  /**
   * # 使用JSON提交
   */
  JSON = 'application/json',

  /**
   * # 使用Form表单提交
   */
  X_WWW_FORM_URLENCODE = 'application/x-www-form-urlencoded',

  /**
   * # 带文件的POST提交
   * ! 不建议使用,请直接使用 ```AirDialog.showUpload``` 上传
   * @deprecated
   */
  MULTIPART_FORM_DATA = 'multipart/form-data',

  /**
   * # 使用XML格式提交
   */
  XML = 'application/xml',

  /**
   * # 纯文本方式提交
   */
  PLAIN = 'text/plain'
}
