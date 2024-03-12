import { AirLanguage } from '../enum/AirLanguage'

/**
 * # 内置的一些i18n文案
 * @author Hamm
 */
export class AirI18nDefault {
  /**
   * # 缓存Key
   */
  protected static readonly languageCacheKey = 'air-language'

  /**
   * # 语言名称
   */
  language = (localStorage.getItem(AirI18nDefault.languageCacheKey) || AirLanguage.ChineseSimplified) as AirLanguage

  //! Start

  /** # 每页显示 */
  PageSize?: string

  /** # 跳转 */
  Jump?: string

  /**  */
  TotalRow?: string

  /** # 输入页码 */
  InputPageNumber?: string

  /** # 导出加载提示 */
  ExportLoadingAndWaitPlease?: string

  /** # 导出成功提示 */
  ExportSuccess?: string

  /** # 下载导出文件 */
  DownloadExportFile?: string

  /** # 无权操作 */
  NoPermissionToOperate?: string

  /** # 验证失败 */
  ValidError?: string

  /** # 上传图片 */
  UplpadImage?: string

  /** # 上传失败 */
  UploadError?: string

  /** # 文件上传失败,请重试 */
  FileUploadErrorAndRetryPlease?: string

  /** # 暂无图片 */
  NoPicture?: string

  /** # 图片格式不支持 */
  ImageExtNotSupported?: string

  /** # 支持的图片格式为 */
  ImageSupportExts?: string

  /** # 文件最大允许 */
  FileMaxSizeAllowed?: string

  /** # 点击复制 */
  ClickToCopy?: string

  /** # 复制成功 */
  CopySuccess?: string

  /** # 很抱歉,你可能无权访问此服务 */
  SorryButForbiddenToAccess?: string

  /** # 请确认你的身份权限 */
  CheckYourAccessPlease?: string

  /** # 服务器发生了一点小错误 */
  SorryButSomeInternalServerError?: string

  /** # 服务器可能正在维护中 */
  ServerMaintenancing?: string

  /** # 没有找到你想访问的资源 */
  SorryButResourceNotFound?: string

  /** # 请确认你的访问地址是否正确 */
  ConfirmYourAccessUrlPlease?: string

  /** # 服务可能依然还没有正确的响应 */
  SorryButServerBusyNow?: string

  /** # 检查你的网络后刷新重试 */
  CheckYourNetworkPlease?: string

  /** # 返回首页 */
  ReturnHome?: string

  /** # 删除成功 */
  DeleteSuccess?: string

  /** # 详情 */
  Detail?: string

  /** # 请选择 */
  SelectPlease?: string

  /** # 编辑 */
  Edit?: string

  /** # 编辑成功标题 */
  EditSuccess?: string

  /** # 添加 */
  Add?: string

  /** # 添加成功 */
  AddSuccess?: string

  /** # 系统错误 */
  SystemError?: string

  /** # 系统发生了一些错误，请稍候再试 */
  SystemErrorAndRetryPlease?: string

  /** # 继续操作 */
  ContinueOperate?: string

  /** # 部分操作成功，请继续操作 */
  SomeOperateSuccessAndContinuePlease?: string

  /** # 确定 */
  Confirm?: string

  /** # 取消 */
  Cancel?: string

  /** # 操作提醒 */
  OperateNotice?: string

  /** # 系统错误,请查看控制台错误信息 */
  ErrorAndSeeConsole?: string

  /** # 系统提示 */
  SystemNotice?: string

  /** # 通知内容 */
  NoErrorMessageGiven?: string

  /** # 加载中... */
  Loading?: string

  /** # 此项必须为必填项 */
  Required?: string

  /** # 正则表达式校验失败 */
  TestError?: string

  /** # 请输入有效的电子邮箱 */
  InvalidEmail?: string

  /** # 请输入有效的座机号 */
  InvalidTelPhone?: string

  /** # 请输入有效的联系电话 */
  InvalidPhone?: string

  /** # 请输入有效的手机号 */
  InvalidMobilePhone?: string

  /** # 只允许输入字母和数字 */
  InvalidNumberAndLetter?: string

  /** # 只允许输入字母 */
  InvalidLetter?: string

  /** # 只允许输入非负整数 */
  InvalidNaturalIntegerNumber?: string

  /** # 只允许输入非负数字 */
  InvalidNaturalNumber?: string

  /** # 请输入有效的整数 */
  InvalidIntegerNumber?: string

  /** # 请输入有效的数字 */
  InvalidNumber?: string

  /** # 请输入有效的身份证号 */
  InvalidChineseIdCard?: string

  /** # 只允许输入中文 */
  IfNotChinese?: string

  /** # 包含不允许输入的字符 */
  ContainLetterNotAllowed?: string

  /** # 文件过大 */
  FileTooLarge?: string

  /** # 未知的文件大小 */
  FileUnknownSize?: string
}
