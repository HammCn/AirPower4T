/* eslint-disable @typescript-eslint/no-explicit-any */
import { AirHttp } from '../helper/AirHttp'
import { AirModel } from './AirModel'

/**
 * # API服务超类
 * @author Hamm.cn
 */
export abstract class AirAbstractService extends AirModel {
  /**
   * # API目录地址
   * ---
   * ### 💡 一般对应后端的分组/控制器/目录等
   */
  abstract baseUrl: string

  /**
   * # Loading提示信息
   * ---
   * ### 💡 你可以将这个传入的对象绑定到你需要Loading的DOM上
   */
  loading!: string

  /**
   * # 获取一个API服务实例
   * @param loading (可选)Loading的Ref对象
   */
  constructor(loading?: string) {
    super()
    if (loading) {
      this.loading = loading
    }
  }

  /**
   * # 创建一个AirHttp实例
   * @param url 请求的接口地址
   * @param baseUrl (可选) 请求的接口目录
   */
  api(url: string, baseUrl?: string) {
    if (baseUrl) {
      url = `${baseUrl}/${url}`
    } else {
      url = `${this.baseUrl}/${url}`
    }
    return new AirHttp(url).setLoading(this.loading)
  }

  /**
   * # 静态创建一个API服务实例
   * @param loading [可选]Loading的提示文案
   */
  static create<S extends AirAbstractService>(this: new () => S, loading?: string): S {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const service = Object.assign(new this()) as S
    if (loading) {
      service.loading = loading
    }
    return service
  }
}
