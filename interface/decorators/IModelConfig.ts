/**
 * # 模型配置
 * @author Hamm.cn
 */
export interface IModelConfig {
  /**
   * ## 模型名称
   */
  label?: string;

  /**
   * ## 模型属性前缀
   */
  fieldPrefix?: string

  /**
   * ## 是否显示搜索框
   * 优先级: 组件传入 > `Model` 配置
   */
  showSearch?: boolean;

  /**
   * ## 搜索框提示文案
   * 优先级: 组件传入 > `Model` 配置 > `AirConfig` 默认值
   */
  searchPlaceholder?: string;

  /**
   * ## 是否显示更多筛选器
   * 优先级: 组件传入 > `Model` 配置
   */
  showFilter?: boolean;

  /**
   * ## 添加按钮的标题
   * 优先级: 组件传入 > 自动生成
   */
  addTitle?: string;

  /**
   * ## 添加权限标识
   * 如 `AToolBar` 传入 `addPermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  addPermission?: string;

  /**
   * ## 导出权限标识
   * 如 `AToolBar` 传入 `exportPermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  exportPermission?: string;

  /**
   * ## 导入权限标识
   * 如 `AToolBar` 传入 `importPermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  importPermission?: string;

  /**
   * ## 表格的没有数据时的提示文本
   *  如 `ATable` 传入 `emptyText` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  tableEmptyText?: string;

  /**
   * ## 编辑权限标识
   * 如 `ATable` 传入 `editPermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  editPermission?: string;

  /**
   * ## 详情权限标识
   * 如 `ATable` 传入 `detailPermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  detailPermission?: string;

  /**
   * ## 删除权限标识
   * 如 `ATable` 传入 `deletePermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  deletePermission?: string;

  /**
   * ## 添加子项目权限标识
   * 如 `ATable` 传入 `addPermission` , 则此项失效，否则:
   * - 如同时传入 `permissionPrefix`, 则会在此项前面加上 `permissionPrefix` 的配置
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  addChildPermission?: string;

  /**
   * ## 全局隐藏字段列选择器
   * 如设置 `true`, 则 `ATable` 传入的 `hideFieldSelector` 失效
   */
  hideFieldSelector?: boolean;

  /**
   * ## 权限标识前缀
   * 如指定了此项,则当前配置装饰器中不再需要手动写前缀
   *
   * - 如配置 `AirConfig.autoPermission=false`, 则传入 `permissionPrefix` 失效
   */
  permissionPrefix?: string
}
