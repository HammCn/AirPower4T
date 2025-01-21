import { AirEntity } from '../base/AirEntity'

/**
 * # 标准用户接口
 * @author Hamm.cn
 */
export interface IUser extends AirEntity {
  /**
   * ### 用户昵称
   */
  nickname: string

  /**
   * ### 用户头像
   */
  avatar: string
}
