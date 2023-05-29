import { AirEntity } from '../dto/AirEntity'

export interface IUser extends AirEntity {
    /**
     * # 用户昵称
     */
    nickname: string

    /**
     * # 用户头像
     */
    avatar: string
}
