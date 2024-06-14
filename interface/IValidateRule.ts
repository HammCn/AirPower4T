import { AirValidator } from '../helper/AirValidator'

/**
 * # 表单验证规则
 * @author Hamm.cn
 */
export interface IValidateRule {
  /**
   * # 字段名:[验证器]
   */
  [key: string]: AirValidator[]
}
