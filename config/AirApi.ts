/**
 * # API兼容类
 * @author Hamm.cn
 */
export class AirApi {
  /**
   * # 复制到剪切板
   * @param data 数据
   */
  static setClipboardData(data: string) {
    uni.setClipboardData({
      data,
    })
  }

  /**
   * # 跳转到页面
   * @param path 路径
   */
  static navigateTo(path: string) {
    uni.navigateTo({
      url: path,
    })
  }

  /**
   * # 停止下拉刷新
   */
  static stopPullDownRefresh() {
    uni.stopPullDownRefresh()
  }

  /**
   * # 返回上一页
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   */
  static navigateBack(delta?: number) {
    uni.navigateBack({
      delta,
    })
  }

  /**
   * # 隐藏返回首页按钮
   */
  static hideHomeButton() {
    uni.hideHomeButton()
  }

  /**
   * # 手机短震动
   */
  static vibrateShort() {
    uni.vibrateShort({
      type: 'heavy',
    })
  }

  /**
   * # 手机长震动
   */
  static vibrateLong() {
    uni.vibrateLong()
  }

  /**
   * # 手机震动
   */
  static vibrate() {
    uni.vibrateLong()
  }

  /**
   * # 替换到页面
   * @param path 路径
   */
  static redirect(path: string) {
    uni.redirectTo({
      url: path,
    })
  }

  /**
   * # 获取缓存的值
   * @param key 缓存的Key
   * @returns 缓存的值
   */
  public static getStorage(key: string): string {
    const value = uni.getStorageSync(key)
    return value ? value.toString() : ''
  }

  /**
   * # 设置缓存
   * @param key 缓存的Key
   * @param value 缓存的值
   */
  public static setStorage(key: string, value: string | number) {
    uni.setStorageSync(key, value.toString())
  }

  /**
   * # 移除缓存
   * @param key 缓存的Key
   */
  static removeStorage(key: string) {
    uni.removeStorageSync(key)
  }
}
