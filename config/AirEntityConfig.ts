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

  addPermission?: string

  exportPermission?: string

  importPermission?: string

  tableEmptyText?: string

  addChildPermission?: string

  detailPermission?: string

  deletePermission?: string

  editPermission?: string

  hideFieldSelector = false

  permissionPrefix?: string
}
