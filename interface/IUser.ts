import { IEntity } from './IEntity'

/**
 * # 标准用户接口
 * @author Hamm
 */
export interface IUser extends IEntity {
  /**
   * # 用户昵称
   */
  nickname: string

  /**
   * # 用户头像
   */
  avatar: string
}
