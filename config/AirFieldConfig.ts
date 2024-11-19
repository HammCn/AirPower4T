import { IField } from '../interface/decorators/IField'

/**
 * # 字段配置基类
 * @author Hamm.cn
 */
export class AirFieldConfig implements IField {
  key!: string

  label!: string

  constructor(key?: string) {
    if (key) {
      this.key = key
    }
  }
}
