import { AirAlert } from '../feedback/AirAlert'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirHttp } from '../helper/AirHttp'
import { IJson } from '../interface/IJson'
import { AirRequest } from '../model/AirRequest'
import { AirResponsePage } from '../model/AirResponsePage'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirEntity } from './AirEntity'

/**
 * # 抽象服务超类
 * @author Hamm
 */
export abstract class AirAbstractBaseService<E extends AirEntity> {
  /**
   * # 接口请求的目录
   */
  abstract baseUrl: string

  /**
   * # 数据转换使用的类
   */
  abstract entityClass: ClassConstructor<E>

  /**
   * # 登录提示信息
   */
  private loading!: string

  /**
   * # 分页查询API地址的URL
   */
  protected urlForGetPage = 'getPage'

  /**
   * # 不分页查询API地址的URL
   */
  protected urlForGetList = 'getList'

  /**
   * # 不分页树查询API地址的URL
   */
  protected urlForGetTreeList = 'getTreeList'

  /**
   * # 查询详情API地址的URL
   */
  protected urlForGetDetail = 'getDetail'

  /**
   * # 添加API地址的URL
   */
  protected urlForAdd = 'add'

  /**
   * # 修改API地址的URL
   */
  protected urlForUpdate = 'update'

  /**
   * # 删除API地址的URL
   */
  protected urlForDelete = 'delete'

  /**
   * # 创建一个AirHttp实例
   * @param url 请求的接口地址
   * @param baseUrl [可选] 请求的接口目录
   */
  api(url: string, baseUrl?: string) {
    return new AirHttp(url, baseUrl || this.baseUrl).setLoading(this.loading)
  }

  /**
   * # 通过某个字段查询一条数据
   * @param key 字段名(别名前)
   * @param value 字段的值
   */
  async getBy(key: string, value: string): Promise<E> {
    const postData = this.newEntityInstance();
    (postData as any)[key] = value
    const json = await this.api('getBy').post(postData)
    return AirClassTransformer.parse(json, this.entityClass)
  }

  /**
   * # 创建一个Service实例
   * @param loading 显示加载状态
   */
  static create<T extends AirAbstractBaseService<AirEntity>>(
    this: new () => T,
    loading?: string,
  ): T {
    const service = Object.assign(new this()) as T
    if (loading) {
      service.loading = loading
    }
    return service
  }

  /**
   * # 查询分页数据列表
   * @param request 请求对象
   */
  async getPage(request: AirRequest<E>): Promise<AirResponsePage<E>> {
    const json = await this.api(this.urlForGetPage).post(request)
    const responsePage = AirClassTransformer.parse<AirResponsePage<E>>(
      json,
      AirResponsePage,
    )
    responsePage.list = AirClassTransformer.parseArray(
      responsePage.list as Record<string, unknown>[],
      this.entityClass,
    )
    return responsePage
  }

  /**
   * # 查询不分页数据列表
   * @param request 请求对象
   */
  async getList(request: AirRequest<E>): Promise<E[]> {
    const json = await this.api(this.urlForGetList).post(request) as IJson[]
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * # 查询树结构数据数组
   * @param request 请求对象
   */
  async getTreeList(request: AirRequest<E>): Promise<E[]> {
    const json = await this.api(this.urlForGetTreeList).post(request) as IJson[]
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * # 根据ID获取详情对象
   * @param id ID
   */
  async getDetail(id: number): Promise<E> {
    const json = await this.api(this.urlForGetDetail).post(this.newEntityInstance(id))
    return AirClassTransformer.parse<E>(json, this.entityClass)
  }

  /**
   * # 添加一条新的数据
   * @param data 保存的数据
   * @param message [可选]新增成功的消息提示内容
   */
  async add(data: E, message?: string): Promise<number> {
    const json = await this.api(this.urlForAdd).post(data)
    if (message) {
      AirNotification.success(message)
    }
    return AirClassTransformer.parse(json, this.entityClass).id
  }

  /**
   * # 修改一条数据
   * @param data 修改的数据实体
   * @param message [可选]修改成功的消息提示内容
   */
  async update(data: E, message?: string): Promise<void> {
    await this.api(this.urlForUpdate).post(data)
    if (message) {
      AirNotification.success(message)
    }
  }

  /**
   * # 保存一条数据并返回主键ID
   *
   * ## 💡 如包含ID 则更新 如不包含 则创建
   * ---
   *
   * @param data 保存的数据实体
   * @param message [可选]保存成功的消息提示内容
   */
  async save(data: E, message?: string): Promise<number> {
    if (data.id) {
      await this.update(data, message)
      return data.id
    }
    return this.add(data, message)
  }

  /**
   * # 根据ID删除一条数据
   * @param id 删除的数据ID
   * @param message [可选]删除成功的消息提示内容
   */
  async delete(id: number, message?: string): Promise<void> {
    return this.api(this.urlForDelete)
      .callbackError()
      .post(this.newEntityInstance(id))
      .then(() => {
        if (message) {
          AirNotification.success(message)
        }
      })
      .catch((err: Error) => {
        AirAlert.show('删除数据失败', err.message)
      })
  }

  /**
   * # 创建一个实体的实例
   * @param id [可选]ID
   */
  private newEntityInstance(id?: number): E {
    // eslint-disable-next-line new-cap
    const entity = new this.entityClass()
    if (id) {
      entity.id = id
    }
    return entity
  }
}
