import {
  RouteRecordRaw, Router, createRouter, createWebHistory,
} from 'vue-router'
import { ClassConstructor } from 'class-transformer'
import { AirDateTimeFormatter } from './enum/AirDateTimeFormatter'
import { AirHttpStatus } from './enum/AirHttpStatus'
import { INormalTreeProps } from './interface/INormalTreeProps'
import { AirFileEntity } from './dto/AirFileEntity'
import { IFile } from './interface/IFile'
import { IUser } from './interface/IUser'
import { AirUserEntity } from './dto/AirUserEntity'

/**
 * # AirPower 全局配置
 * @author Hamm
 */
export class AirConfig {
  /**
   * # 当前版本号
   */
  static readonly version = 'v1.0.0'

  /**
   * # AES加解密使用的key
   */
  static cryptoKey = 'abcdef0123456789'

  /**
   * # AppID
   * 用于处理一些唯一场景做项目区分
   */
  static appId = 'airpower'

  /**
   * # 项目名称
   */
  static product = '你的项目名称'

  /**
   * # 😠超时时间 毫秒
   */
  static timeout = 5000

  /**
   * # Vue 路由
   */
  static router: Router

  /**
   * # 接口根地址
   */
  static apiRootUrl = import.meta.env.VITE_APP_API_URL || '/api/'

  /**
   * # 静态资源根路径
   */
  static staticUrl = import.meta.env.VITE_APP_STATIC_URL || '/static/'

  /**
   * # 标准错误提示标题
   */
  static errorTitle = '发生错误'

  /**
   * # 标准错误提示内容
   */
  static errorMessage = '系统发生了一些错误，请稍候再试 :)'

  /**
   * # AccessToken对应的Key
   * 缓存的名称和Api传输的Header都叫这个名字
   */
  static accessTokenKey = 'Authorization'

  /**
   * # 最近访问的路径
   */
  static lastPathKey = 'air_last_path'

  /**
   * # 是否允许切换企业 默认允许
   * 如设置false 则菜单不显示切换企业按钮
   */
  static allowChangeTenant = true

  /**
   * # 默认树结构配置数据
   */
  static defaultTreeProps: INormalTreeProps = {
    children: 'children',
    label: 'name',
  }

  /**
   *  # 默认数字精度 0为整数
   */
  static defaultPrecision = 0

  /**
   *  # 最大数字
   */
  static maxNumber = 999999999999999

  /**
   *  # 最小数字
   */
  static minNumber = 0

  /**
   *  # 文本域最大长度
   */
  static maxTextAreaLength = 200

  /**
   *  # 文本最大长度
   */
  static maxTextLength = 50

  /**
   * # 是否访问超时
   */
  static isTimeout = false

  /**
   * # 文本域的最小行数
   */
  static defaultTextareaMinRows = 3

  /**
   * # 文本域的最大行数
   */
  static defaultTextareaMaxRows = 6

  /**
   * # 全局http请求返回code的key
   * 默认 "code"
   */
  static defaultHttpGlobalCodeKey = 'code'

  /**
   * # 全局http请求返回message的key
   * 默认 "message"
   */
  static defaultHttpGlobalMessageKey = 'message'

  /**
   * # 全局http请求返回data的key
   * 默认 "data"
   */
  static defaultHttpGlobalDataKey = 'data'

  /**
   * # 全局http请求返回成功状态码
   * 默认 200
   */
  static defaultHttpSuccessCode: number = AirHttpStatus.OK

  /**
   * # 全局http请求返回登录状态码
   * 默认 401
   * @see AirHttpStatus
   */
  static defaultHttpUnauthorizedCode: number = AirHttpStatus.UNAUTHORIZED

  /**
   * # 默认的格式化时间
   * 如设置,则未格式化方式的地方将默认使用此方式
   * ```
   * AirConfig.defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD
   * @see AirDateTimeFormatter
   * ```
   */
  static defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss

  /**
   * # 权限列表
   */
  static permissionList: string[] = []

  /**
   * # 弹窗是否默认显示全屏按钮(默认true)
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultDialogFullable = true

  /**
   * # 弹窗是否默认隐藏取消按钮(默认false)
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultDialogHideCancel = true

  /**
   * # 普通文本输入是否默认显示长度限制标签(默认false)
   * 此项仅为默认, 如在装饰器中配置, 此项将无效
   */
  static defaultInputShowLimit = false

  /**
   * # TextArea是否默认显示长度限制标签(默认true)
   * 此项仅为默认, 如在装饰器中配置, 此项将无效
   */
  static defaultTextAreaShowLimit = true

  /**
   * # 是否默认隐藏高级搜索(默认false)
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultHideAdvanceSearch = false

  /**
   * # 普通关键词搜索的提示文本
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultKeywordSearchPlaceholder = '请输入关键词搜索...'

  /**
   * # 分页组件默认使用的页码列表
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static defaultPageSizes = [20, 30, 50]

  /**
   * # 默认的表格空数据兜底字符串
   * \@TableField 装饰器中可以单独配置 ```emptyValue```,
   */
  static defaultTableEmptyValue = '-'

  /**
   * # 默认的表格数组显示分割字符
   * \@TableField 装饰器中可以单独配置 ```arraySplitor```,
   */
  static defaultArraySplitor = ','

  /**
   * # 默认的文件上传地址
   */
  static defaultUploadUrl = `${AirConfig.apiRootUrl}attach/upload`

  /**
   * # 默认的导入数据的URL
   *
   * ---
   * #### 😈 请注意 不包含 ```baseUrl``` 和 ```apiRoot```
   *
   * ---
   * 将自动拼接 ```apiRoot``` + ```baseUrl``` + ```defaultImportUrl```
   */
  static defaultImportUrl = 'importData'

  /**
   * # 默认下载导入模板的URL
   *
   * ---
   * #### 😈 请注意 不包含 ```baseUrl``` 和 ```apiRoot```
   *
   * ---
   * 将自动拼接 ```apiRoot``` + ```baseUrl``` + ```defaultTemplateUrl```
   */
  static defaultTemplateUrl = 'downloadTemplate'

  /**
   * # 默认同步导出URL
   *
   * ---
   * #### 😈 请注意 不包含 ```baseUrl``` 和 ```apiRoot```
   *
   * ---
   * 将自动拼接 ```apiRoot``` + ```baseUrl``` + ```defaultExportSyncUrl```
   */
  static defaultExportSyncUrl = 'exportSync'

  /**
   * # 默认异步导出URL
   *
   * ---
   * #### 😈 请注意 不包含 ```baseUrl``` 和 ```apiRoot```
   *
   * ---
   * 将自动拼接 ```apiRoot``` + ```baseUrl``` + ```defaultExportAsyncUrl```
   */
  static defaultExportAsyncUrl = 'export'

  /**
   * # 设置上次访问的路径
   * @param path
   */
  static setLastPath(path: string): void {
    localStorage.setItem(this.lastPathKey, path)
  }

  /**
   * # 获取上次访问的路径
   */
  static getLastPath(): string {
    return localStorage.getItem(this.lastPathKey) || ''
  }

  /**
   * # 获取AccessToken
   */
  static getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) || ''
  }

  /**
   * # 存储AccessToken
   * @param accessToken AccessToken
   */
  static saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken)
  }

  /**
   * # 移除本地存储的AccessToken
   */
  static removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey)
  }

  /**
   * # 是否有权限
   * @param permission 权限标识
   */
  static hasPermission(permission: string): boolean {
    return this.permissionList.includes(permission)
  }

  /**
   * # 创建路径
   * @param routes 路由配置文件
   * @param ignoreGuard 不使用守卫
   */
  static createRouter(routes: RouteRecordRaw[], ignoreGuard = false) {
    // 创建路由
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })
    router.afterEach(() => {
      window.scrollTo(0, 0)
    })
    if (!ignoreGuard) {
      router.beforeEach((to, _, next) => {
        if (to.meta.name || to.name) {
          window.document.title = `${to.meta.name || to.name} - ${AirConfig.product}` || AirConfig.product
        }
        next()
      })
    }
    AirConfig.router = router
    return router
  }

  /**
   * # 是否自动处理常用权限
   *
   * 如此项配置为 ```false``` , 则 ```EntityConfig``` 中的 ```permissionPrefix``` 将自动失效
   *
   * 若此时 ```EntityConfig``` 没有配置其他的权限标识, 则认为不校验权限
   */
  static autoPermission = true

  /**
   * # 默认的文件实现类
   */
  static defaultFileEntity: ClassConstructor<IFile> = AirFileEntity

  /**
   * # 默认的用户实现类
   */
  static defaultUserEntity: ClassConstructor<IUser> = AirUserEntity

  /**
   * # 弹窗遮罩层是否可以关闭
   *
   * ---
   * 默认不允许遮罩层关闭 设置为 ```true``` 即允许遮罩层关闭
   */
  static dialogHoverCloseEnabled = false
}
