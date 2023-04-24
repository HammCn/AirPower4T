import { Expose } from 'class-transformer'
import { AirEntity } from './AirEntity'
import { IUser } from '../interface/IUser'

/**
 * # 内置用户实体
 * ---
 * 💡 如需扩展, 请自行实现 ```IUser```, 使用 ```AirConfig.defaultUserEntity``` 配置默认实现类
 * @author Hamm
 */
export class AirUserEntity extends AirEntity implements IUser {
  /**
   * # 用户昵称
   */
  @Expose() nickname!: string

  /**
   * # 用户头像
   */
  @Expose() avatar!: string
}
