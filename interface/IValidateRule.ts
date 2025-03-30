import type { AirEntity } from '../base/AirEntity'
import type { AirValidator } from '../helper/AirValidator'

/**
 * # 表单验证规则
 * @author Hamm.cn
 */
export type IValidateRule<E extends AirEntity = AirEntity> = {
  /**
   * ### 字段名:[验证器]
   */
  [K in keyof E]?: AirValidator[]
}
