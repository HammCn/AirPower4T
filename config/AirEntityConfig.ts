import { IEntityConfig } from '../interface/IEntityConfig'

/**
 * # 为类标记配置的实现类
 * @author Hamm
 */
export class AirEntityConfig implements IEntityConfig {
  hideKeywordSearch = false

  keywordSearchPlaceholder?: string

  hideAdvanceSearch = false

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
