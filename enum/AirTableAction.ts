import { AirEnum } from '../base/AirEnum'

export class AirTableAction extends AirEnum {
  static readonly DETAIL = new AirTableAction(1, '详情')

  static readonly EDIT = new AirTableAction(2, '编辑')

  static readonly DELETE = new AirTableAction(3, '删除')

  static readonly DISABLE = new AirTableAction(4, '禁用')

  static readonly ENABLE = new AirTableAction(5, '启用')
}
