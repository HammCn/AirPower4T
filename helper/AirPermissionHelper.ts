import { ClassConstructor } from 'class-transformer'
import { AirPermissionAction } from '../enum/AirPermissionAction'
import { getEntityConfig } from '../decorator/EntityConfig'
import { AirConfig } from '../AirConfig'
import { AirEntity } from '../dto/AirEntity'

/**
 * # 权限标识处理类
 * @author Hamm
 */
export class AirPermissionHelper {
  static getPermissionFlag(clazz: ClassConstructor<AirEntity> | null | undefined, action: AirPermissionAction): string {
    if (!clazz) {
      return ''
    }
    const entityConfig = getEntityConfig(clazz)
    if (!entityConfig) {
      return ''
    }
    if (AirConfig.autoPermission) {
      // 自动处理权限 但 没有配置前缀 从类中获取权限前缀
      entityConfig.permissionPrefix = clazz.name.replace('Entity', ':').toLocaleLowerCase()
    } else {
      // 如不自动配置权限, 则将权限前缀清空
      entityConfig.permissionPrefix = ''
    }

    switch (action) {
      case AirPermissionAction.ADD:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.addPermission, action)
      case AirPermissionAction.DELETE:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.deletePermission, action)
      case AirPermissionAction.EDIT:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.editPermission, action)
      case AirPermissionAction.DETAIL:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.detailPermission, action)
      case AirPermissionAction.ADD_CHILD:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.addChildPermission, action)
      case AirPermissionAction.EXPORT:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.exportPermission, action)
      case AirPermissionAction.IMPORT:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.importPermission, action)
      default:
    }
    return ''
  }

  /**
     * ## 根据配置获取权限后缀
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
