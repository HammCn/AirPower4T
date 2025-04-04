import { AirConstant } from './AirConstant'

/**
 * # `API` 兼容类
 * @author Hamm.cn
 */
export class AirApi {
  /**
   * ### 获取缓存的值
   * @param key 缓存的Key
   * @returns 缓存的值
   */
  public static getStorage(key: string): string {
    const value = localStorage.getItem(key)
    return value ? value.toString() : AirConstant.STRING_EMPTY
  }

  /**
   * ### 设置缓存
   * @param key 缓存的Key
   * @param value 缓存的值
   */
  public static setStorage(key: string, value: string | number) {
    localStorage.setItem(key, value.toString())
  }

  /**
   * ### 移除缓存
   * @param key 缓存的Key
   */
  static removeStorage(key: string) {
    localStorage.removeItem(key)
  }
}
