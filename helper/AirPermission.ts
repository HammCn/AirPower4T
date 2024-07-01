import { AirPermissionAction } from '../enum/AirPermissionAction'
import { getEntityConfig } from '../decorator/EntityConfig'
import { AirConfig } from '../config/AirConfig'
import { AirEntity } from '../base/AirEntity'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * # 权限标识处理类
 * @author Hamm.cn
 */
export class AirPermission {
  /**
   * # 下划线
   */
  private static readonly UNDER_LINE = '_'

  /**
   * # 获取指定实体类在某个场景的权限标识字符串
   * @param EntityClass 实体类
   * @param action 权限场景
   */
  static getPermission(EntityClass: ClassConstructor<AirEntity> | null | undefined, action: AirPermissionAction): string {
    if (!EntityClass) {
      return ''
    }
    const entityConfig = getEntityConfig(new EntityClass())
    if (!entityConfig) {
      return ''
    }
    if (AirConfig.autoPermission) {
      // 自动处理权限
      if (!entityConfig.permissionPrefix) {
        // 没有配置前缀 从类中获取权限前缀
        const entityName = EntityClass.name.replace('Entity', '').toString()
        entityConfig.permissionPrefix = entityName.slice(0, 1) + entityName.slice(1)
      }
    } else {
      // 如不自动配置权限, 则将权限前缀清空
      entityConfig.permissionPrefix = ''
    }
    const permissionPrefix = entityConfig.permissionPrefix + this.UNDER_LINE

    switch (action) {
      case AirPermissionAction.ADD:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.addPermission, action)
      case AirPermissionAction.DELETE:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.deletePermission, action)
      case AirPermissionAction.EDIT:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.editPermission, action)
      case AirPermissionAction.DETAIL:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.detailPermission, action)
      case AirPermissionAction.ADD_CHILD:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.addChildPermission, action)
      case AirPermissionAction.EXPORT:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.exportPermission, action)
      case AirPermissionAction.IMPORT:
        return permissionPrefix + this.getAutoPermissionFlag(entityConfig.importPermission, action)
      default:
    }
    return ''
  }

  /**
   * # 根据配置获取权限后缀
   *
   * - ```AirConfig.autoPermission=false``` 只取 ```EntityConfig``` 配置的权限, 取不到则认为不校验权限
   * - ```AirConfig.autoPermission=true```  取 ```EntityConfig``` 配置的权限, 取不到则按 ```action``` 自动取
   */
  private static getAutoPermissionFlag(permission: string | undefined, action: AirPermissionAction) {
    if (AirConfig.autoPermission) {
      return permission || action
    }
    return permission || ''
  }
}
