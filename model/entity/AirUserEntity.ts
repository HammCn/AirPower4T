import { IUser } from '../../interface/IUser'
import { AirEntity } from '../../base/AirEntity'

/**
 * # 内置用户实体
 * 如需扩展, 请自行实现 `IUser`, 使用 `AirConfig.userEntityClass` 配置默认实现类
 * @author Hamm.cn
 */
export class AirUserEntity extends AirEntity implements IUser {
  /**
   * ### 用户昵称
   */
  nickname!: string

  /**
   * ### 用户头像
   */
  avatar!: string
}
