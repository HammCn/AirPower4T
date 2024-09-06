import { AirAlert } from '../feedback/AirAlert'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirRequest } from '../model/AirRequest'
import { AirResponsePage } from '../model/AirResponsePage'
import { IJson } from '../interface/IJson'
import { AirAbstractService } from './AirAbstractService'
import { AirEntity } from './AirEntity'

/**
 * # 实体 `API` 服务超类
 * 包含了常用的增删改查等方法
 *
 * @param E 泛型实体类
 * @author Hamm.cn
 */
export abstract class AirAbstractEntityService<E extends AirEntity> extends AirAbstractService {
  /**
   * ## 为基类提供当前的实体类
   * 请求时会通过这个类进行数据转换
   */
  abstract entityClass: ClassConstructor<E>

  /**
   * ## 分页查询默认 `URL`
   */
  protected urlForGetPage = 'getPage'

  /**
   * ## 不分页查询默认 `URL`
   */
  protected urlForGetList = 'getList'

  /**
   * ## 不分页树查询默认 `URL`
   */
  protected urlForGetTreeList = 'getTreeList'

  /**
   * ## 查询详情默认 `URL`
   */
  protected urlForGetDetail = 'getDetail'

  /**
   * ## 添加默认 `URL`
   */
  protected urlForAdd = 'add'

  /**
   * ## 启用默认 `URL`
   */
  protected urlForEnable = 'enable'

  /**
   * ## 禁用默认 `URL`
   */
  protected urlForDisable = 'disable'

  /**
   * ## 修改默认 `URL`
   */
  protected urlForUpdate = 'update'

  /**
   * ## 删除默认 `URL`
   */
  protected urlForDelete = 'delete'

  /**
   * ## 查询分页数据列表
   * @param request 请求对象
   * @param apiUrl `可选` 自定义请求URL
   */
  async getPage(request: AirRequest<E>, apiUrl = this.urlForGetPage): Promise<AirResponsePage<E>> {
    const json = await this.api(apiUrl)
      .post(request)
    const responsePage = AirClassTransformer.parse<AirResponsePage<E>>(json, AirResponsePage)
    responsePage.list = AirClassTransformer.parseArray(responsePage.list as IJson[], this.entityClass)
    return responsePage
  }

  /**
   * ## 查询不分页数据列表
   * @param request 请求对象
   * @param apiUrl `可选` 自定义请求URL
   */
  async getList(request: AirRequest<E>, apiUrl = this.urlForGetList): Promise<E[]> {
    const json = await this.api(apiUrl)
      .post(request) as IJson[]
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * ## 查询树结构数据数组
   * @param request 请求对象
   * @param apiUrl `可选` 自定义请求URL
   */
  async getTreeList(request: AirRequest<E>, apiUrl = this.urlForGetTreeList): Promise<E[]> {
    const json = await this.api(apiUrl)
      .post(request) as IJson[]
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * ## 根据 `ID` 获取详情对象
   * @param id ID
   * @param apiUrl `可选` 自定义请求URL
   */
  async getDetail(id: number, apiUrl = this.urlForGetDetail): Promise<E> {
    const json = await this.api(apiUrl)
      .post(this.newEntityInstance(id))
    return AirClassTransformer.parse(json, this.entityClass)
  }

  /**
   * ## 添加一条新的数据
   * @param data 保存的数据
   * @param message `可选` 添加成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async add(data: E, message?: string, apiUrl = this.urlForAdd): Promise<number> {
    const json = await this.api(apiUrl).post(data)
    if (message) {
      AirNotification.success(message)
    }
    return AirClassTransformer.parse(json, this.entityClass).id
  }

  /**
   * ## 修改一条数据
   * @param data 修改的数据实体
   * @param message `可选` 修改成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async update(data: E, message?: string, apiUrl = this.urlForUpdate): Promise<void> {
    await this.api(apiUrl).post(data)
    if (message) {
      AirNotification.success(message)
    }
  }

  /**
   * ## 保存一条数据并返回主键 `ID`
   *
   * 如包含 `ID` 则更新 如不包含 则创建
   * @param data 保存的数据实体
   * @param message `可选` 保存成功的消息提示内容
   */
  async save(data: E, message?: string): Promise<number> {
    if (data.id) {
      await this.update(data, message)
      return data.id
    }
    return this.add(data, message)
  }

  /**
   * ## 根据 `ID` 删除一条数据
   * @param id 删除的数据 `ID`
   * @param message `可选` 删除成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async delete(id: number, message?: string, apiUrl = this.urlForDelete): Promise<void> {
    await this.api(apiUrl).callbackError()
      .post(this.newEntityInstance(id))
      .then(async () => {
        if (message) {
          AirNotification.success(message)
        }
      })
      .catch(async (err) => {
        await AirAlert.show((err as Error).message, '删除失败')
      })
  }

  /**
   * ## 根据 `ID` 禁用一条数据
   * @param id 禁用的数据 `ID`
   * @param message `可选` 禁用成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async disable(id: number, message?: string, apiUrl = this.urlForDisable): Promise<void> {
    try {
      await this.api(apiUrl)
        .callbackError()
        .post(this.newEntityInstance(id))
      if (message) {
        AirNotification.success(message)
      }
    } catch (err) {
      await AirAlert.show((err as Error).message, '禁用失败')
    }
  }

  /**
   * ## 根据 `ID` 启用一条数据
   * @param id 启用的数据 `ID`
   * @param message `可选` 启用成功的消息提示内容
   * @param apiUrl `可选` 自定义请求URL
   */
  async enable(id: number, message?: string, apiUrl = this.urlForEnable): Promise<void> {
    try {
      await this.api(apiUrl)
        .callbackError()
        .post(this.newEntityInstance(id))
      if (message) {
        AirNotification.success(message)
      }
    } catch (err) {
      await AirAlert.show((err as Error).message, '启用失败')
    }
  }

  /**
   * ## 创建一个实体的实例
   * @param id `可选` `ID`
   */
  protected newEntityInstance(id?: number): E {
    // eslint-disable-next-line new-cap
    const entity = new this.entityClass()
    if (id) {
      entity.id = id
    }
    return entity
  }
}
