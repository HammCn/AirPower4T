/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ref } from 'vue'
import { AirAlert } from '../feedback/AirAlert'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirHttp } from '../helper/AirHttp'
import { IValidateRule } from '../interface/IValidateRule'
import { AirValidator } from '../helper/AirValidator'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirEntity } from '../base/AirEntity'
import { AirModel } from '../base/AirModel'
import { AirRequest } from '../model/AirRequest'
import { AirResponsePage } from '../model/AirResponsePage'
import { IJson } from '../interface/IJson'

/**
 * # Service超类
 * @param E 泛型实体类 ```AirEntity``` 的子类
 * @author Hamm
 */
export abstract class AirAbstractService<E extends AirEntity> extends AirModel {
  /**
   * # API目录地址
   * ---
   * ### 💡 一般对应后端的分组/控制器/目录等
   */
  abstract baseUrl: string

  /**
   * # 为基类提供当前的实体类
   * ---
   * ### 💡 请求时会通过这个类进行数据转换
   */
  abstract entityClass: ClassConstructor<E>

  /**
   * # Loading的ref对象
   * ---
   * ### 💡 你可以将这个传入的对象绑定到你需要Loading的DOM上
   */
  protected loading!: Ref<boolean>

  /**
   * # 分页查询API地址的默认URL
   */
  protected urlForGetPage = 'getPage'

  /**
   * # 不分页查询API地址的默认URL
   */
  protected urlForGetList = 'getList'

  /**
   * # 不分页树查询API地址的默认URL
   */
  protected urlForGetTreeList = 'getTreeList'

  /**
   * # 查询详情API地址的默认URL
   */
  protected urlForGetDetail = 'getDetail'

  /**
   * # 添加API地址的默认URL
   */
  protected urlForAdd = 'add'

  /**
   * # 修改API地址的默认URL
   */
  protected urlForUpdate = 'update'

  /**
   * # 删除API地址的默认URL
   */
  protected urlForDelete = 'delete'

  /**
   * # 获取一个Service实例
   * @param loading [可选]Loading的Ref对象
   */
  constructor(loading?: Ref<boolean>) {
    super()
    if (loading) {
      this.loading = loading
    }
  }

  /**
   * # 发起一个API网络请求
   * @param url 请求的API地址
   * @param customBaseUrl [可选] API地址前缀,无需 ```/``` 结尾
   */
  api(url: string, customBaseUrl?: string): AirHttp {
    if (customBaseUrl) {
      url = `${customBaseUrl}/${url}`
    } else {
      url = `${this.baseUrl}/${url}`
    }
    if (this.loading) {
      return AirHttp.create(url).setLoading(this.loading)
    }
    return AirHttp.create(url)
  }

  /**
   * # 查询分页数据列表
   * @param request 请求对象
   */
  async getPage(request: AirRequest<E>): Promise<AirResponsePage<E>> {
    const json = await this.api(this.urlForGetPage).post(request)
    const responsePage = AirClassTransformer.parse<AirResponsePage<E>>(json, AirResponsePage)
    responsePage.list = AirClassTransformer.parseArray(responsePage.list as IJson[], this.entityClass)
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
    return AirClassTransformer.parse(json, this.entityClass)
  }

  /**
   * # 添加一条新的数据
   * @param data 保存的数据
   * @param message [可选]新增成功的消息提示内容
   * @param title [可选]新增成功的消息提示标题 默认 '新增成功'
   */
  async add(data: E, message?: string, title = '添加成功'): Promise<number> {
    const json = await this.api(this.urlForAdd).post(data)
    if (message) {
      AirNotification.success(message, title)
    }
    return AirClassTransformer.parse(json, this.entityClass).id
  }

  /**
   * # 修改一条数据
   * @param data 修改的数据实体
   * @param message [可选]修改成功的消息提示内容
   * @param title [可选]修改成功的消息提示标题 默认 '修改成功'
   */
  async update(data: E, message?: string, title = '修改成功'): Promise<void> {
    await this.api(this.urlForUpdate).post(data)
    if (message) {
      AirNotification.success(message, title)
    }
  }

  /**
   * # 保存一条数据并返回主键ID
   *
   * ### 💡 如包含ID 则更新 如不包含 则创建
   * ---
   *
   * @param data 保存的数据实体
   * @param message [可选]保存成功的消息提示内容
   * @param title [可选]保存成功的消息提示标题 默认 '保存成功'
   */
  async save(data: E, message?: string, title = '保存成功'): Promise<number> {
    if (data.id) {
      await this.update(data, message, title)
      return data.id
    }
    return this.add(data, message, title)
  }

  /**
   * # 根据ID删除一条数据
   * @param id 删除的数据ID
   * @param message [可选]删除成功的消息提示内容
   * @param title [可选]删除成功的消息提示标题 默认 '删除成功'
   */
  async delete(id: number, message?: string, title = '删除成功'): Promise<void> {
    return this.api(this.urlForDelete).callbackError()
      .post(this.newEntityInstance(id))
      .then(() => {
        if (message) {
          AirNotification.success(message, title)
        }
      })
      .catch((err: Error) => {
        AirAlert.error(err.message, '删除失败')
      })
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
   * @param loading [可选]Loading的Ref对象
   */
  static create<S extends AirAbstractService<AirEntity>>(this: new () => S, loading?: Ref<boolean>): S {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.assign(new this(), loading) as S
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

  /**
   * # 创建验证器
   * @param form 表单对象
   * @param moreRule [可选] 更多的验证规则
   */
  static createValidator<E extends AirEntity>(form: E, moreRule: IValidateRule = {}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return AirValidator.createRules(form, this.newInstance(), moreRule)
  }
}
