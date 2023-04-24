import { IEntity } from './IEntity'

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
