import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 禁用启用字典
 *
 * @author Hamm
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
