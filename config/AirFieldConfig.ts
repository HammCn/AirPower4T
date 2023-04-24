import { IFieldConfig } from '../interface/IFieldConfig'

/**
 * # 字段配置基类
 * @author Hamm
 */
export class AirFieldConfig implements IFieldConfig {
  key!: string

  label!: string
}
