import { AirAlert } from '../feedback/AirAlert'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { IValidateRule } from '../interface/IValidateRule'
import { AirValidator } from '../helper/AirValidator'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirEntity } from '../base/AirEntity'
import { AirRequest } from '../model/AirRequest'
import { AirResponsePage } from '../model/AirResponsePage'
import { IJson } from '../interface/IJson'
import { AirAbstractService } from './AirAbstractService'

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
   */
  async getPage(request: AirRequest<E>): Promise<AirResponsePage<E>> {
    const json = await this.api(this.urlForGetPage)
      .post(request)
    const responsePage = AirClassTransformer.parse<AirResponsePage<E>>(json, AirResponsePage)
    responsePage.list = AirClassTransformer.parseArray(responsePage.list as IJson[], this.entityClass)
    return responsePage
  }

  /**
   * ## 查询不分页数据列表
   * @param request 请求对象
   */
  async getList(request: AirRequest<E>): Promise<E[]> {
    const json = await this.api(this.urlForGetList)
      .post(request) as IJson[]
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * ## 查询树结构数据数组
   * @param request 请求对象
   */
  async getTreeList(request: AirRequest<E>): Promise<E[]> {
    const json = await this.api(this.urlForGetTreeList)
      .post(request) as IJson[]
    return AirClassTransformer.parseArray(json, this.entityClass)
  }

  /**
   * ## 根据 `ID` 获取详情对象
   * @param id ID
   */
  async getDetail(id: number): Promise<E> {
    const json = await this.api(this.urlForGetDetail)
      .post(this.newEntityInstance(id))
    return AirClassTransformer.parse(json, this.entityClass)
  }

  /**
   * ## 添加一条新的数据
   * @param data 保存的数据
   * @param message `可选` 添加成功的消息提示内容
   * @param title `可选` 添加成功的消息提示标题 默认 `添加成功`
   */
  async add(data: E, message?: string, title = '添加成功'): Promise<number> {
    const json = await this.api(this.urlForAdd)
      .post(data)
    if (message) {
      AirNotification.success(message, title)
    }
    return AirClassTransformer.parse(json, this.entityClass).id
  }

  /**
   * ## 修改一条数据
   * @param data 修改的数据实体
   * @param message `可选` 修改成功的消息提示内容
   * @param title `可选` 修改成功的消息提示标题 默认 `修改成功`
   */
  async update(data: E, message?: string, title = '修改成功'): Promise<void> {
    await this.api(this.urlForUpdate)
      .post(data)
    if (message) {
      AirNotification.success(message, title)
    }
  }

  /**
   * ## 保存一条数据并返回主键 `ID`
   *
   * 如包含 `ID` 则更新 如不包含 则创建
   * @param data 保存的数据实体
   * @param message `可选` 保存成功的消息提示内容
   * @param title `可选` 保存成功的消息提示标题 默认 `保存成功`
   */
  async save(data: E, message?: string, title = '保存成功'): Promise<number> {
    if (data.id) {
      await this.update(data, message, title)
      return data.id
    }
    return this.add(data, message, title)
  }

  /**
   * ## 根据 `ID` 删除一条数据
   * @param id 删除的数据 `ID`
   * @param message `可选` 删除成功的消息提示内容
   * @param title `可选` 删除成功的消息提示标题 默认 `删除成功`
   */
  async delete(id: number, message?: string, title = '删除成功'): Promise<void> {
    try {
      await this.api(this.urlForDelete)
        .callbackError()
        .post(this.newEntityInstance(id))
      if (message) {
        AirNotification.success(message, title)
      }
    } catch (err) {
      await AirAlert.error((err as Error).message, '删除失败')
    }
  }

  /**
   * ## 根据 `ID` 禁用一条数据
   * @param id 禁用的数据 `ID`
   * @param message `可选` 禁用成功的消息提示内容
   * @param title `可选` 禁用成功的消息提示标题 默认 `禁用成功`
   */
  async disable(id: number, message?: string, title = '禁用成功'): Promise<void> {
    try {
      await this.api(this.urlForDisable)
        .callbackError()
        .post(this.newEntityInstance(id))
      if (message) {
        AirNotification.success(message, title)
      }
    } catch (err) {
      await AirAlert.error((err as Error).message, '禁用失败')
    }
  }

  /**
   * ## 根据 `ID` 启用一条数据
   * @param id 启用的数据 `ID`
   * @param message `可选` 启用成功的消息提示内容
   * @param title `可选` 启用成功的消息提示标题 默认 `启用成功`
   */
  async enable(id: number, message?: string, title = '启用成功'): Promise<void> {
    try {
      await this.api(this.urlForEnable)
        .callbackError()
        .post(this.newEntityInstance(id))
      if (message) {
        AirNotification.success(message, title)
      }
    } catch (err) {
      await AirAlert.error((err as Error).message, '启用失败')
    }
  }

  /**
   * ## 创建一个实体的实例
   * @param id `可选` `ID`
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
   * ## 创建验证器
   * @param form 表单对象
   * @param moreRule `可选` 更多的验证规则
   */
  static createValidator<E extends AirEntity>(form: E, moreRule: IValidateRule<E> = {}) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return AirValidator.createRules(form, this.newInstance(), moreRule)
  }

  /**
   * ## `内部使用`
   * @deprecated
   */
  createValidator<E extends AirEntity>(form: E, moreRule: IValidateRule<E> = {}) {
    return AirValidator.createRules(form, this, moreRule)
  }
}
