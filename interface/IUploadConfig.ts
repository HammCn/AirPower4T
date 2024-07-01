import { ClassConstructor } from '../type/ClassConstructor'
import { IFile } from './IFile'
import { IJson } from './IJson'

/**
 * # 上传配置项
 * @author Hamm.cn
 */
export interface IUploadConfig {
  /**
   * # 对话框标题
   */
  title?: string

  /**
   * # 最大允许上传字节数
   */
  maxSize?: number

  /**
   * # 如传入数组包含 * 则直接允许所有格式
   * ---
   * ### 💡 允许上传文件后缀数组 不要加'.'
   */
  exts?: string[],

  /**
   * # 上传表单的字段名 默认 ```file```
   */
  uploadName?: string,

  /**
   * # 上传的地址 默认无需传入
   */
  uploadUrl?: string,

  /**
   * # 上传成功的文案提示
   */
  uploadSuccess?: string

  /**
   * # 上传右下角的确认按钮文字
   * ---
   * ### 💡 如传入 则显示 否则隐藏按钮
   */
  confirmText?: string

  /**
   * # 上传文件的接收实体类
   * ---
   * ### 💡 可通过 ```AirConfig.defaultFileEntity``` 配置, 默认为 ```AirFileEntity```
   */
  entity?: ClassConstructor<IFile>

  /**
   * # 自定义上传成功的回调
   * ---
   * ### 💡 如果传入了回调, ```AirDialog.showUpload()``` 将返回 ```null```
   * 请在此回调中接收数据
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCustomSuccess?: Function

  /**
   * # 上传文件时同时传输的body数据
   * ---
   * ### 💡 如为实体对象, 请自行 ```.toJson()```
   */
  data?: IJson

  /**
   * # 上传文件时同时传输的header数据
   */
  header?: IJson

  /**
   * # 显示的提示文字
   */
  tips?: string
}
