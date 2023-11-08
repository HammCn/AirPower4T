import { IEntityConfig } from '../interface/IEntityConfig'

/**
 * # 为类标记配置的实现类
 * @author Hamm
 */
export class AirEntityConfig implements IEntityConfig {
  showSearch?: boolean

  searchPlaceholder?: string

  showFilter?: boolean

  addTitle?: string

  addPermission = 'add'

  exportPermission = 'export'

  importPermission = 'import'

  tableEmptyText?: string

  addChildPermission = 'add'

  detailPermission = 'getDetail'

  deletePermission = 'delete'

  editPermission = 'update'

  hideFieldSelector = false

  permissionPrefix?: string
}
