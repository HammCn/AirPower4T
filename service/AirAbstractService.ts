/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor } from 'class-transformer'
import { Ref } from 'vue'
import { AirRequest } from '../dto/AirRequest'
import { AirAlert } from '../feedback/AirAlert'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirHttp } from '../helper/AirHttp'
import { AirEntity } from '../dto/AirEntity'
import { AirResponsePage } from '../dto/AirResponsePage'

/**
 * # Service超类
 * @author Hamm
 */
export abstract class AirAbstractService<E extends AirEntity> {
  /**
   * # API目录地址
   */
  abstract baseUrl: string

  /**
   * # 为基类提供当前的实体类
   */
  abstract entityClass: ClassConstructor<E>

  /**
   * # Loading的ref对象
   */
  protected loading!: Ref<boolean>

  /**
   * # 获取一个Service实例
   * @param loading [可选]Loading的Ref对象
   */
  constructor(loading?: Ref<boolean>) {
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
    if (request.filter) {
      request.filter = AirClassTransformer.parse(request.filter, this.entityClass)
    }
    const json = await this.api('getPage').post(request.toJson())
    const responsePage = AirClassTransformer.parse<AirResponsePage<E>>(json, AirResponsePage)
    responsePage.list = AirClassTransformer.parseArray(responsePage.list, this.entityClass)
    return responsePage
  }

  /**
   * # 查询不分页数据列表
   * @param request 请求对象
   */
  async getList(request: AirRequest<E>): Promise<E[]> {
    if (request.filter) {
      request.filter = AirClassTransformer.parse(request.filter, this.entityClass)
    }
    const json = await this.api('getList').post(request.toJson())
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * # 查询树结构数据数组
   * @param request 请求对象
   */
  async getTreeList(request: AirRequest<E>): Promise<E[]> {
    if (request.filter) {
      request.filter = AirClassTransformer.parse(request.filter, this.entityClass)
    }
    const json = await this.api('getTreeList').post(request.toJson())
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * # 根据ID获取详情对象
   * @param id ID
   */
  async getDetail(id: number): Promise<E> {
    const json = await this.api('getDetail').post(new AirEntity(id))
    return AirClassTransformer.parse(json, this.entityClass)
  }

  /**
   * # 添加一条新的数据
   * @param data 保存的数据
   * @param message [可选]新增成功的消息提示内容
   * @param title [可选]新增成功的消息提示标题 默认 '新增成功'
   */
  async add(data: E, message?: string, title = '添加成功'): Promise<number> {
    const json = await this.api('add').post(data.toJson())
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
    await this.api('update').post(data.toJson())
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
    return this.api('delete').withOutError()
      .post(new AirEntity(id))
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
   * # 带Loading状态创建一个Service实例
   * @param loading Loading的Ref对象
   */
  static loading<T>(this: new () => T, loading?: Ref<boolean>): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.assign(new this(), loading) as T
  }
}
