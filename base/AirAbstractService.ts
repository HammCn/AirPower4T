import type { Ref } from 'vue'
import type { ClassConstructor } from '../type/AirType'
import { AirHttp } from '../helper/AirHttp'
import { AirModel } from './AirModel'

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
   * 你可以将这个传入的对象绑定到你需要 `Loading` 的 `DOM` 上
   */
  loading!: Ref<boolean>

  /**
   * ### 获取一个 `API` 服务实例
   * @param loading `可选` Loading
   */
  constructor(loading?: Ref<boolean>) {
    super()
    if (loading) {
      this.loading = loading
    }
  }

  /**
   * ### 静态创建一个 `API` 服务实例
   * @param loading `可选` Loading
   */
  static create<S extends AirAbstractService>(this: ClassConstructor<S>, loading?: Ref<boolean>): S {
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
  api(url: string, baseUrl?: string): AirHttp {
    const http = AirHttp.create(`${baseUrl || this.baseUrl}/${url}`)
    if (this.loading) {
      http.setLoading(this.loading)
    }
    return http
  }
}
