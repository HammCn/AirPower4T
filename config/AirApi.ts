/**
 * # API兼容类
 * @author Hamm
 */
export class AirApi {
  /**
   * # 获取缓存的值
   * @param key 缓存的Key
   * @returns 缓存的值
   */
  public static getStorage(key: string): string {
    const value = my.getStorageSync({ key })
    return value ? value.toString() : ''
  }

  /**
   * # 设置缓存
   * @param key 缓存的Key
   * @param value 缓存的值
   */
  public static setStorage(key: string, value: string | number) {
    my.setStorageSync({ key: key, data: value.toString })
  }

  /**
   * # 移除缓存
   * @param key 缓存的Key
   */
  static removeStorage(key: string) {
    my.removeStorageSync({ key })
  }
}
