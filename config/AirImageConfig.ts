/**
 * # 展示图片模型
 * @author Hamm.cn
 */
export class AirImageConfig {
  /**
   * ## 图片宽度
   */
  width = 100

  /**
   * ## 图片高度
   */
  height = 100

  /**
   * ## 设置宽度
   */
  setWidth(width: number): this {
    this.width = width
    return this
  }

  /**
   * ## 设置高度
   */
  setHeight(height: number): this {
    this.height = height
    return this
  }
}
