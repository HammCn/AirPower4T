/**
 * # API兼容类
 * @author Hamm
 */
export class AirApi {
  /**
   * # 复制到剪切板
   * @param data 数据
   */
  static setClipboardData(data: string) {
    wx.setClipboardData({
      data,
    })
  }

  /**
   * # 跳转到页面
   * @param path 路径
   */
  static navigateTo(path: string) {
    wx.navigateTo({
      url: path,
    })
  }

  /**
   * # 停止下拉刷新
   */
  static stopPullDownRefresh() {
    wx.stopPullDownRefresh()
  }

  /**
   * # 返回上一页
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   */
  static navigateBack(delta?: number) {
    wx.navigateBack({
      delta,
    })
  }

  /**
   * # 隐藏返回首页按钮
   */
  static hideHomeButton() {
    wx.hideHomeButton()
  }

  /**
   * # 手机短震动
   */
  static vibrateShort() {
    wx.vibrateShort({
      type: 'heavy',
    })
  }

  /**
   * # 手机长震动
   */
  static vibrateLong() {
    wx.vibrateLong()
  }

  /**
   * # 手机震动
   */
  static vibrate() {
    wx.vibrateLong()
  }

  /**
   * # 替换到页面
   * @param path 路径
   */
  static redirect(path: string) {
    wx.redirectTo({
      url: path,
    })
  }

  /**
   * # 获取缓存的值
   * @param key 缓存的Key
   * @returns 缓存的值
   */
  public static getStorage(key: string): string {
    const value = wx.getStorageSync(key)
    return value ? value.toString() : ''
  }

  /**
   * # 设置缓存
   * @param key 缓存的Key
   * @param value 缓存的值
   */
  public static setStorage(key: string, value: string | number) {
    wx.setStorageSync(key, value.toString())
  }

  /**
   * # 移除缓存
   * @param key 缓存的Key
   */
  static removeStorage(key: string) {
    wx.removeStorageSync(key)
  }
}
