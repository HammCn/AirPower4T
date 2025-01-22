/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirHttp } from '../helper/AirHttp'
import { AirModel } from './AirModel'
import { ClassConstructor } from '../type/AirType'

/**
 * # `API` 服务超类
 * @author Hamm.cn
 */
export abstract class AirAbstractService extends AirModel {
  /**
   * ### `API` 目录地址
   * 一般对应后端的 `分组/控制器/目录` 等
   */
  abstract baseUrl: string

  /**
   * ### `Loading`
   */
  public loading = ''

  /**
   * ### 获取一个 `API` 服务实例
   * @param loading `可选` Loading
   */
  constructor(loading?: string) {
    super()
    if (loading) {
      this.loading = loading
    }
  }

  /**
   * ### 静态创建一个 `API` 服务实例
   * @param loading `可选` Loading
   */
  static create<S extends AirAbstractService>(this: ClassConstructor<S>, loading?: string): S {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const service = Object.assign(new this()) as S
    if (loading) {
      service.loading = loading
    }
    return service
  }

  /**
   * ### 创建一个 `AirHttp` 实例
   * @param url 请求的接口地址
   * @param baseUrl `可选` 请求的接口目录
   */
  api(url: string, baseUrl?: string) {
    if (baseUrl) {
      url = `${baseUrl}/${url}`
    } else {
      url = `${this.baseUrl}/${url}`
    }
    return new AirHttp(url).setLoading(this.loading)
  }
}
