import { AirPermissionAction } from '../enum/AirPermissionAction'
import { AirConfig } from '../config/AirConfig'
import { AirEntity } from '../base/AirEntity'
import { AirConstant } from '../config/AirConstant'
import { getModelConfig } from '../decorator/Model'
import { ClassConstructor } from '../type/AirType'

/**
 * # 权限标识处理类
 * @author Hamm.cn
 */
export class AirPermission {
  /**
   * ## 获取指定实体类在某个场景的权限标识字符串
   * @param EntityClass 实体类
   * @param action 权限场景
   */
  static getPermission(EntityClass: ClassConstructor<AirEntity> | null | undefined, action: AirPermissionAction): string {
    if (!EntityClass) {
      return AirConstant.EMPTY_STRING
    }
    const modelConfig = getModelConfig(new EntityClass())
    if (!modelConfig) {
      return AirConstant.EMPTY_STRING
    }
    if (AirConfig.autoPermission) {
      // 自动处理权限
      if (!modelConfig.permissionPrefix) {
        // 没有配置前缀 从类中获取权限前缀
        const entityName = EntityClass.name.replace('Entity', AirConstant.EMPTY_STRING)
          .toString()
        modelConfig.permissionPrefix = entityName.slice(0, 1) + entityName.slice(1)
      }
    } else {
      // 如不自动配置权限, 则将权限前缀清空
      modelConfig.permissionPrefix = AirConstant.EMPTY_STRING
    }
    const permissionPrefix = modelConfig.permissionPrefix + AirConstant.UNDER_LINE

    switch (action) {
      case AirPermissionAction.ADD:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.addPermission, action)
      case AirPermissionAction.DELETE:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.deletePermission, action)
      case AirPermissionAction.EDIT:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.editPermission, action)
      case AirPermissionAction.DETAIL:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.detailPermission, action)
      case AirPermissionAction.ADD_CHILD:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.addChildPermission, action)
      case AirPermissionAction.EXPORT:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.exportPermission, action)
      case AirPermissionAction.IMPORT:
        return permissionPrefix + this.getAutoPermissionFlag(modelConfig.importPermission, action)
      default:
    }
    return AirConstant.EMPTY_STRING
  }

  /**
   * ## 根据配置获取权限后缀
   *
   * - `AirConfig.autoPermission=false` 只取 `EntityConfig` 配置的权限, 取不到则认为不校验权限
   * - `AirConfig.autoPermission=true`  取 `EntityConfig` 配置的权限, 取不到则按 `action` 自动取
   */
  private static getAutoPermissionFlag(permission: string | undefined, action: AirPermissionAction) {
    if (AirConfig.autoPermission) {
      return permission || action
    }
    return permission || AirConstant.EMPTY_STRING
  }
}
