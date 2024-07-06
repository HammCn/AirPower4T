import { IFieldConfig } from '../interface/decorators/IFieldConfig'

/**
 * # 字段配置基类
 * @author Hamm.cn
 */
export class AirFieldConfig implements IFieldConfig {
  key!: string

  label!: string

  constructor(key?: string) {
    if (key) {
      this.key = key
    }
  }
}
