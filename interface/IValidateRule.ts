import { AirValidator } from '../model/AirValidator'

/**
 * # 表单验证规则
 * @author Hamm
 */
export interface IValidateRule {
  /**
   * # 字段名:[验证器]
   */
  [key: string]: AirValidator[]
}
