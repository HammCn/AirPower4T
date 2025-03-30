import { AirColor } from '../enum/AirColor'
import { AirDictionaryArray } from './extend/AirDictionaryArray'

/**
 * # 禁用启用字典
 *
 * @author Hamm.cn
 */
export const AirDisableDictionary = AirDictionaryArray.create([
  {
    key: false,
    label: '正常',
    color: AirColor.SUCCESS,
  },
  {
    key: true,
    label: '禁用',
    color: AirColor.DANGER,
  },
])
