import {
  createRouter, createWebHistory, Router, RouteRecordRaw,
} from 'vue-router'

import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirCode } from '../enum/AirCode'
import { IFile } from '../interface/IFile'
import { INormalTreeProps } from '../interface/props/INormalTreeProps'
import { IUser } from '../interface/IUser'
import { AirFileEntity } from '../model/entity/AirFileEntity'
import { AirUserEntity } from '../model/entity/AirUserEntity'
import { AirCodeNumber, AirMoneyDirection, ClassConstructor } from '../type/AirType'
import { AirApi } from './AirApi'
import { AirConstant } from './AirConstant'

/**
 * # `AirPower` 全局配置
 * 可自行在 `main.ts` 中覆盖此类中的配置
 * @author Hamm.cn
 */
export class AirConfig {
  /**
   * ## `AirPower` 版本号
   */
  static readonly version = 'v3.0.0'

  /**
   * ## `AppKey`
   * 用于处理一些唯一场景做项目区分 以及 `Oauth2` 的 `AppKey`
   */
  static appKey = 'airpower'

  /**
   * ## `AppKey Header`
   */
  static appKeyHeader = 'appkey'

  /**
   * ## 项目名称
   * 会显示在浏览器标题上
   */
  static product = AirConstant.EMPTY_STRING

  /**
   * ## 接口根地址
   * 以 `/` 结尾
   */
  static apiUrl = import.meta.env.VITE_APP_API_URL || '/api/'

  /**
   * ## 静态资源根路径
   * 以 `/` 结尾
   */
  static staticUrl = import.meta.env.VITE_APP_STATIC_URL || '/static/'

  /**
   * ## 默认的文件上传地址
   */
  static uploadUrl = `${AirConfig.apiUrl}attach/upload`

  /**
   * ## 上传文件默认字段名称
   */
  static uploadFileName = 'file'

  /**
   * ## `AccessToken` 对应的 `Key`
   * `缓存的名称` 和 `Api传输的Header` 都叫这个名字
   */
  static authorizationHeaderKey = 'Authorization'

  /**
   * ## `Http` 返回状态码的字段
   */
  static httpCodeKey = 'code'

  /**
   * ## `Http` 返回错误信息的字段
   */
  static httpMessageKey = 'message'

  /**
   * ## `Http` 返回数据的字段
   */
  static httpDataKey = 'data'

  /**
   * ## 全局 `http` 请求返回 成功状态码
   */
  static successCode: AirCodeNumber = AirCode.SUCCESS

  /**
   * ## 全局 `http` 请求返回 继续状态码
   */
  static continueCode: AirCodeNumber = AirCode.CONTINUE

  /**
   * ## 全局 `http` 请求返回 登录状态码
   */
  static unAuthorizeCode: AirCodeNumber = AirCode.UNAUTHORIZED

  /**
   * ## 默认的格式化时间
   * `ADateTime` `ATable` 的格式化都将默认使用这个配置
   */
  static dateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss

  /**
   * ## 超时时间 毫秒
   * 超时后请求会自动断开并抛出异常
   */
  static timeout = 5000

  /**
   * ## 是否访问超时
   */
  static isTimeout = false

  /**
   * ## 标准错误提示标题
   */
  static errorTitle = '系统错误'

  /**
   * ## 标准错误提示内容
   */
  static errorMessage = '系统发生了一些错误，请稍候再试 :)'

  /**
   * ## 是否自动处理常用权限
   *
   * 如此项配置为 `false` , 则 `EntityConfig` 中的 `permissionPrefix` 将自动失效
   *
   * 若此时 `EntityConfig` 没有配置其他的权限标识, 则认为不校验权限
   */
  static autoPermission = true

  /**
   * ## 是否禁用权限
   *
   * - 如此项配置为 `true`, 则所有自动处理权限的功能都将失效。
   * - 如需处理权限，则需要手动通过 `v-if="AirConfig.hasPermission('')"` 来操作
   */
  static disablePermission = false

  /**
   * ## AES加解密使用默认向量
   */
  static aesCbcIvString = '0000000000000000'

  /**
   *  # 数字精度
   */
  static numberPrecision = 2

  /**
   * ## 金额的小数精度
   */
  static moneyPrecision = AirConfig.numberPrecision

  /**
   * ## 金额的舍弃方向
   */
  static moneyDirection: AirMoneyDirection = 'down'

  /**
   *  # 最大数字
   */
  static maxNumber = Number.MAX_SAFE_INTEGER

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
   * ## 文本域的最小行数
   */
  static textareaMinRows = 3

  /**
   * ## 文本域的最大行数
   */
  static textareaMaxRows = 6

  /**
   * ## 普通文本输入是否默认显示长度限制标签
   * `默认false` 此项仅为默认, 如在装饰器中配置, 此项将无效
   */
  static showLengthLimitInput = false

  /**
   * ## `TextArea` 是否默认显示长度限制标签
   * `默认true` 此项仅为默认, 如在装饰器中配置, 此项将无效
   */
  static showLengthLimitTextarea = true

  /**
   * ## 搜索框的提示文案
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static searchPlaceholder = '搜索...'

  /**
   * ## 默认的文件实现类
   */
  static fileEntityClass: ClassConstructor<IFile> = AirFileEntity

  /**
   * ## 默认的用户实现类
   */
  static userEntityClass: ClassConstructor<IUser> = AirUserEntity

  /**
   * ## `ESC` 是否可关闭掉所有的弹窗
   */
  static dialogCloseByEsc = true

  /**
   * ## 弹窗是否默认显示全屏按钮
   * 此项仅为默认, 如手动传入, 此项将无效 (默认true)
   */
  static dialogAllowFullscreen = true

  /**
   * ## 弹窗是否隐藏取消按钮
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static dialogHideCancel = true

  /**
   * ## 弹窗遮罩层是否可以关闭
   * 默认不允许遮罩层关闭 设置为 `true` 即允许遮罩层关闭
   */
  static dialogCloseByCover = false

  /**
   * ## 默认树结构配置数据
   */
  static treeProps: INormalTreeProps = {
    children: AirConstant.CHILDREN,
    label: 'name',
  }

  /**
   * ## 分页组件默认使用的页码列表
   * 此项仅为默认, 如手动传入, 此项将无效
   */
  static pageSizes = [20, 30, 50]

  /**
   * ## 是否开启表格列字段缓存
   */
  static tableFieldCacheEnabled = true

  /**
   * ## 表格是否使用链接按钮
   */
  static tableLinkButton = true

  /**
   * ## 默认的表格空数据兜底字符串
   * `@Table` 装饰器中可以单独配置 `emptyValue`,
   */
  static tableEmptyValue = AirConstant.HYPHEN

  /**
   * ## 表格是否默认开启禁用和启用按钮
   */
  static tableShowEnableAndDisable = false

  /**
   * ## 是否默认显示表格斑马纹
   */
  static tableStripe = false

  /**
   * ## 默认的表格数组显示分割字符
   * `@Table` 装饰器中可以单独配置 `arraySeparator`
   */
  static arraySeparator = AirConstant.COMMA

  /**
   * ## 隐藏表格序号列
   * 如设置为 `true`， 则全局隐藏, `ATable` 传入的 `hideIndex` 失效
   */
  static hideTableIndex = false

  /**
   * ## `Vue` 路由对象
   */
  static router: Router

  /**
   * ## 最近访问的路径
   */
  static lastPathKey = 'air_last_path'

  /**
   * ## `WebSocketUrl`
   * 以 `/` 结尾
   */
  static websocketUrl = import.meta.env.VITE_APP_WEBSOCKET_URL

  /**
   * ## `Oauth2` 的 `authorize` 地址
   */
  static oauthUrl = import.meta.env.VITE_APP_OAUTH_URL || '/oauth2/authorize'

  /**
   * ## 默认的导入数据的 `URL`
   *
   * 请注意 请勿包含 `baseUrl` 和 `apiUrl`
   *
   * 将自动拼接 `apiUrl` + `baseUrl` + `importUrl`
   */
  static importUrl = 'import'

  /**
   * ## 默认下载导入模板的 `URL`
   *
   * 请注意 请勿包含 `baseUrl` 和 `apiUrl`
   *
   * 将自动拼接 `apiUrl` + `baseUrl` + `importTemplateUrl`
   */
  static importTemplateUrl = 'importTemplate'

  /**
   * ## 权限列表
   */
  private static permissionList: string[] = []

  /**
   * ## 权限缓存 `Key`
   */
  private static readonly permissionKey = '_permissions'

  /**
   * ## 保存权限列表
   * @param permissions 权限列表
   */
  static savePermissionList(permissions: string[]) {
    this.permissionList = permissions.map((permission) => permission.toLocaleLowerCase())
    AirApi.setStorage(this.appKey + this.permissionKey, JSON.stringify(this.permissionList))
  }

  /**
   * ## 获取缓存的权限列表
   */
  static getPermissionList(): string[] {
    const str = AirApi.getStorage(this.appKey + this.permissionKey) || '[]'
    try {
      return JSON.parse(str)
    } catch (e) {
      return []
    }
  }

  /**
   * ## 是否有权限
   * @param permission 权限标识
   */
  static hasPermission(permission: string): boolean {
    return this.permissionList.includes(permission.toLowerCase())
  }

  /**
   * ## 保存身份令牌
   * @param accessToken 身份令牌
   */
  static saveAccessToken(accessToken: string): void {
    AirApi.setStorage(this.authorizationHeaderKey, accessToken)
  }

  /**
   * ## 获取身份令牌
   */
  static getAccessToken(): string {
    return AirApi.getStorage(this.authorizationHeaderKey)
  }

  /**
   * ## 移除本地存储的身份令牌
   */
  static removeAccessToken(): void {
    AirApi.removeStorage(this.authorizationHeaderKey)
  }

  /**
   * ## 设置上次访问的路径
   * @param path
   */
  static setLastPath(path: string): void {
    AirApi.setStorage(this.lastPathKey, path)
  }

  /**
   * ## 获取上次访问的路径
   */
  static getLastPath(): string {
    return AirApi.getStorage(this.lastPathKey)
  }

  /**
   * ## 创建 `Vue` 路由实例
   * @param routes 路由配置文件
   * @param ignoreGuard 不使用守卫
   */
  static createRouter(routes: RouteRecordRaw[], ignoreGuard = false): Router {
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
}
