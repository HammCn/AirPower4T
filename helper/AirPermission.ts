import { AirPermissionAction } from '../enum/AirPermissionAction'
import { AirConfig } from '../config/AirConfig'
import { AirEntity } from '../base/AirEntity'
import { AirConstant } from '../config/AirConstant'
import { getModelConfig } from '../decorator/Model'
import { ClassConstructor } from '../type/AirType'
import { AirApi } from '../config/AirApi'

/**
 * # 权限标识处理类
 * @author Hamm.cn
 */
export class AirPermission {
  /**
   * ### 权限列表
   */
  private static permissionList: string[] = []

  /**
   * ### 权限缓存 `Key`
   */
  private static readonly permissionKey = '_permissions'

  /**
   * ### 获取指定实体类在某个场景的权限标识字符串
   * @param EntityClass 实体类
   * @param action 权限场景
   */
  static get(EntityClass: ClassConstructor<AirEntity> | null | undefined, action: AirPermissionAction): string {
    if (!EntityClass) {
      return AirConstant.STRING_EMPTY
    }
    const modelConfig = getModelConfig(new EntityClass())
    if (!modelConfig) {
      return AirConstant.STRING_EMPTY
    }
    if (AirConfig.autoPermission) {
      // 自动处理权限
      if (!modelConfig.permissionPrefix) {
        // 没有配置前缀 从类中获取权限前缀
        const entityName = EntityClass.name.replace('Entity', AirConstant.STRING_EMPTY)
          .toString()
        modelConfig.permissionPrefix = entityName.slice(0, 1) + entityName.slice(1)
      }
    } else {
      // 如不自动配置权限, 则将权限前缀清空
      modelConfig.permissionPrefix = AirConstant.STRING_EMPTY
    }
    const permissionPrefix = modelConfig.permissionPrefix + AirConstant.STRING_UNDERLINE

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
    return AirConstant.STRING_EMPTY
  }

  /**
   * ### 保存权限列表
   * @param permissions 权限列表
   */
  static saveList(permissions: string[]) {
    this.permissionList = permissions.map((permission) => permission.toLocaleLowerCase())
    AirApi.setStorage(AirConfig.appKey + this.permissionKey, JSON.stringify(this.permissionList))
  }

  /**
   * ### 获取缓存的权限列表
   */
  static getList(): string[] {
    const str = AirApi.getStorage(AirConfig.appKey + this.permissionKey) || '[]'
    try {
      return JSON.parse(str)
    } catch (e) {
      return []
    }
  }

  /**
   * ### 是否有权限
   * @param permission 权限标识
   */
  static has(permission: string): boolean {
    return this.permissionList.includes(permission.toLowerCase())
  }

  /**
   * ### 根据配置获取权限后缀
   *
   * - `AirConfig.autoPermission=false` 只取 `EntityConfig` 配置的权限, 取不到则认为不校验权限
   * - `AirConfig.autoPermission=true`  取 `EntityConfig` 配置的权限, 取不到则按 `action` 自动取
   */
  private static getAutoPermissionFlag(permission: string | undefined, action: AirPermissionAction) {
    if (AirConfig.autoPermission) {
      return permission || action
    }
    return permission || AirConstant.STRING_EMPTY
  }
}
