import { PropType } from 'vue'
import { AirCrypto } from '../helper/AirCrypto'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirConfig } from './AirConfig'
import { AirTableFieldConfig } from './AirTableFieldConfig'
import { ITreeProps } from '../interface/ITreeProps'

/**
 * # `ATable`使用的`props`参数
 * @returns 表格参数
 */
export function airTableProps<E>() {
  return {
    /**
     * # 表格使用链接按钮
     */
    linkButton: {
      type: Boolean,
      default: AirConfig.tableLinkButton,
    },

    /**
     * # 行尾编辑按钮的权限标识
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```editPermission``` 配置
     */
    editPermission: {
      type: String,
      default: undefined,
    },

    /**
     * # 行尾禁用按钮的权限标识
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```disablePermission``` 配置
     */
    disablePermission: {
      type: String,
      default: undefined,
    },

    /**
     * # 行尾启用按钮的权限标识
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```enablePermission``` 配置
     */
    enablePermission: {
      type: String,
      default: undefined,
    },

    /**
     * # 行尾详情按钮的权限标识
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```detailPermission``` 配置
     */
    detailPermission: {
      type: String,
      default: undefined,
    },

    /**
     * # 行尾删除按钮的权限标识
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```deletePermission``` 配置
     */
    deletePermission: {
      type: String,
      default: undefined,
    },

    /**
     * # 行尾添加按钮的权限标识
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```addChildPermission``` 配置
     */
    addPermission: {
      type: String,
      default: undefined,
    },

    /**
     * # 表格显示的数据数组
     */
    dataList: {
      type: Array<E>,
      required: true,
    },

    /**
     * # 默认选中的数据数组
     */
    selectList: {
      type: Array<E>,
      default: () => [],
    },

    /**
     * # 显示字段列表
     * 如传入 则优先使用
     */
    fieldList: {
      type: Array<AirTableFieldConfig>,
      default: () => [],
    },

    /**
     * # 默认表格空文案
     * 如不传入 则默认使用 ```EntityConfig``` 的 ```tableEmptyText``` 配置
     */
    emptyText: {
      type: String,
      default: undefined,
    },

    /**
     * # 是否隐藏编辑按钮
     */
    hideEdit: {
      type: Boolean,
      default: false,
    },

    /**
     * # 控制是否禁用行内编辑按钮的回调方法
     */
    disableEdit: {
      type: Function,
      default: null,
    },

    /**
     * # 控制是否禁用行内添加按钮的回调方法
     */
    disableAdd: {
      type: Function,
      default: null,
    },

    /**
     * # 控制是否允许操作禁用启用
     */
    disableChangeStatus: {
      type: Function,
      default: null,
    },

    /**
     * # 控制是否禁用行内详情按钮的回调方法
     */
    disableDetail: {
      type: Function,
      default: null,
    },

    /**
     * # 控制是否禁用行内删除按钮的回调方法
     */
    disableDelete: {
      type: Function,
      default: null,
    },

    /**
     * # 是否隐藏删除按钮
     */
    hideDelete: {
      type: Boolean,
      default: false,
    },

    /**
     * # 控制是否禁用多选按钮的回调方法
     */
    selectable: {
      type: Function,
      default: null,
    },

    /**
     * # 是否显示多选框
     * ---
     * 💡 可触发 ```@on-select(selectList)``` 事件, 可配置 ```:select-list``` 默认选中
     */
    showSelect: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否显示禁用启用
     */
    showEnableAndDisable: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否隐藏序号
     */
    hideIndex: {
      type: Boolean,
      default: false,
    },

    /**
     * # 表格字段缓存Key
     */
    fieldCacheKey: {
      type: String,
      default: AirCrypto.base64Encode(window.location.pathname),
    },

    /**
     * # 是否隐藏字段选择
     * 如 ```EntityConfig``` 的 ```hideFieldSelector``` 设置为 ```true```, 则此项失效
     */
    hideFieldSelector: {
      type: Boolean,
      default: false,
    },

    /**
     * # 操作区宽度
     */
    ctrlWidth: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 'auto',
    },

    /**
     * # 自动撑起高度
     * 默认fix滚动
     */
    autoHeight: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否隐藏操作按钮
     */
    hideCtrl: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否显示详情按钮
     */
    showDetail: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否显示添加按钮
     */
    showAdd: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否自定义删除事件
     */
    customDelete: {
      type: Boolean,
      default: false,
    },

    /**
     * # 是否显示更多的下拉按钮
     */
    showMoreButton: {
      type: Boolean,
      default: false,
    },

    /**
     * # 在更多里显示删除
     * ---
     * 💡 仅在 `showMoreButton=true` 时有效，且 `deleteInMore=true` 时被收起到更多，否则保持表格行内显示
     */
    deleteInMore: {
      type: Boolean,
      default: true,
    },

    /**
     * # 在更多里显示编辑
     * ---
     * 💡 仅在 `showMoreButton=true` 时有效，且 `editInMore=true` 时被收起到更多，否则保持表格行内显示
     */
    editInMore: {
      type: Boolean,
      default: false,
    },

    /**
     * # 在更多里显示禁用启用
     * ---
     * 💡 仅在 `showMoreButton=true` 时有效，且 `enableAndDisableInMore=true` 时被收起到更多，否则保持表格行内显示
     */
    enableAndDisableInMore: {
      type: Boolean,
      default: true,
    },

    /**
     * # 在更多里显示详情
     * ---
     * 💡 仅在 `showMoreButton=true` 时有效，且 `detailInMore=true` 时被收起到更多，否则保持表格行内显示
     */
    detailInMore: {
      type: Boolean,
      default: true,
    },

    /**
     * # 是否懒加载
     */
    lazy: Boolean,

    /**
     * # 删除确认框提示标题
     */
    deleteTitle: {
      type: String,
      default: '',
    },

    /**
     * # 删除确认框提示内容
     */
    deleteContent: {
      type: String,
      default: '',
    },

    /**
     * # 表格绑定的数据实体
     */
    entity: {
      type: Function as unknown as PropType<ClassConstructor<E>>,
      required: true,
    },

    /**
     * # 树结构的标准配置
     */
    treeProps: {
      type: Object as PropType<ITreeProps>,
      default: () => ({}),
    },

    /**
     * # 懒加载的方法注入
     */
    load: {
      type: Function,
      default: null,
    },

    /**
     * # 是否展开树的所有项目
     */
    defaultExpandAll: {
      type: Boolean,
      default: true,
    },
  }
}
