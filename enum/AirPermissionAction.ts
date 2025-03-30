/**
 * # 常用权限标识枚举
 * @author Hamm.cn
 */
export enum AirPermissionAction {
  /**
   * ### 添加
   */
  ADD = 'add',

  /**
   * ### 修改
   */
  EDIT = 'update',

  /**
   * ### 删除
   */
  DELETE = 'delete',

  /**
   * ### 详情
   */
  DETAIL = 'getDetail',

  /**
   * ### 添加下级数据
   */
  ADD_CHILD = 'addChild',

  /**
   * ### 导出
   */
  EXPORT = 'export',

  /**
   * ### 导入
   */
  IMPORT = 'import',

  /**
   * ### 禁用
   */
  DISABLE = 'disable',

  /**
   * ### 启用
   */
  ENABLE = 'enable',
}
