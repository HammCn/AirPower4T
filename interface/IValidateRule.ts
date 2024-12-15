import { AirEntity } from '../base/AirEntity'
import { AirValidator } from '../helper/AirValidator'

/**
 * # 表单验证规则
 * @author Hamm.cn
 */
export type IValidateRule<E extends AirEntity = AirEntity> = {
  /**
   * ### 字段名:[验证器]
   */
  // eslint-disable-next-line no-unused-vars
  [K in keyof E]?: AirValidator[]
}
