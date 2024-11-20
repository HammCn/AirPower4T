<template>
  <div class="air-tool-bar">
    <div class="air-tool-bar--left">
      <slot name="beforeButton" />
      <AButton
        v-if="props.entity && !hideAdd"
        :permission="addPermission || AirPermission.getPermission(entity, AirPermissionAction.ADD)"
        primary
        type="ADD"
        @click="emits('onAdd')"
      >
        {{ addTitle }}
      </AButton>
      <AButton
        v-if="showImport"
        :permission="importPermission || AirPermission.getPermission(entity, AirPermissionAction.IMPORT)"
        type="IMPORT"
        @click="onImport()"
      >
        {{ AirI18n.get().Import || '导入' }}
      </AButton>
      <slot name="afterButton" />
    </div>
    <div class="air-tool-bar--right">
      <slot name="beforeSearch" />
      <template v-if="isSearchEnabled">
        <template
          v-for=" item in searchFieldList "
          :key="item.key"
        >
          <div
            v-if="!item.hide"
            :style="{ width: item.width + 'px' }"
            class="item"
          >
            <slot
              :data="data"
              :name="item.key"
            >
              <template v-if="item.between">
                <el-date-picker
                  v-if="item.betweenType === AirBetweenType.DATE"
                  v-model="data[item.key]"
                  :default-time="defaultTime"
                  :editable="false"
                  :end-placeholder="AirI18n.get().End || LABEL_END"
                  :format="YYYY_MM_DD"
                  :range-separator="AirI18n.get().To || LABEL_TO"
                  :start-placeholder="item.label + ''"
                  type="daterange"
                  value-format="x"
                  @change="onSearch()"
                  @clear=" data[item.key] = undefined"
                />
                <el-time-picker
                  v-if="item.betweenType === AirBetweenType.TIME"
                  v-model="data[item.key]"
                  :editable="false"
                  :end-placeholder="AirI18n.get().End || LABEL_END"
                  :range-separator="AirI18n.get().To || LABEL_TO"
                  :start-placeholder="item.label + ''"
                  :value-format="HH_MM_SS"
                  arrow-control
                  is-range
                  @change="onSearch()"
                  @clear=" data[item.key] = undefined"
                />
                <el-date-picker
                  v-if="item.betweenType === AirBetweenType.DATETIME"
                  v-model="data[item.key]"
                  :default-time="defaultTime"
                  :editable="false"
                  :end-placeholder="AirI18n.get().End || LABEL_END"
                  :format="YYYY_MM_DD+' '+HH_MM_SS"
                  :range-separator="AirI18n.get().To || LABEL_TO"
                  :start-placeholder="item.label + ''"
                  type="datetimerange"
                  value-format="x"
                  @change="onSearch()"
                  @clear=" data[item.key] = undefined"
                />
              </template>
              <el-select
                v-else-if="AirDecorator.getDictionary(item.dictionary)"
                v-model="data[item.key]"
                :clearable="item.clearable"
                :filterable="item.filterable"
                :placeholder="item.label + '...'"
                @change="onSearch()"
                @clear=" data[item.key] = undefined"
              >
                <template v-for="enumItem of AirDecorator.getDictionary(item.dictionary)">
                  <el-option
                    v-if="!enumItem.disabled"
                    :key="enumItem.key.toString()"
                    :label="enumItem.label"
                    :value="enumItem.key"
                  />
                </template>
              </el-select>
              <el-input
                v-else
                v-model="data[item.key]"
                :clearable="item.clearable"
                :placeholder="item.label + '...'"
                @blur="onSearch()"
                @clear="onSearch"
                @keydown.enter="onSearch"
              />
            </slot>
          </div>
        </template>
      </template>
      <AButton
        v-if="showExport"
        :permission="exportPermission || AirPermission.getPermission(entity, AirPermissionAction.EXPORT)"
        custom-class="export-button"
        type="EXPORT"
        @click=" onExport()"
      >
        {{ AirI18n.get().Export || '导出' }}
      </AButton>
      <slot name="afterSearch" />
    </div>
  </div>
</template>

<script generic="E extends AirEntity,S extends AirAbstractEntityService<E>" lang="ts" setup>
import {
  computed, PropType, Ref, ref,
} from 'vue'

import { AButton } from '../component'
import { AirDialog } from '../helper/AirDialog'
import { AirConfig } from '../config/AirConfig'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirBetweenType } from '../enum/AirBetweenType'
import { AirPermissionAction } from '../enum/AirPermissionAction'
import { AirPermission } from '../helper/AirPermission'
import { IFile } from '../interface/IFile'
import { AirEntity } from '../base/AirEntity'
import { AirRequestPage } from '../model/AirRequestPage'
import { AirRequest } from '../model/AirRequest'
import { IJson } from '../interface/IJson'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { AirI18n } from '../helper/AirI18n'
import { AirExportModel } from '../model/AirExportModel'
import { AirDecorator } from '../helper/AirDecorator'
import { getModelConfig } from '../decorator/Model'
import { ClassConstructor } from '../type/AirType'
import { AirConstant } from '@/airpower/config/AirConstant'

const emits = defineEmits<{
  onSearch: [request: AirRequestPage<E>],
  onAdd: [],
  onReset: []
}>()

const props = defineProps({
  /**
   * # 左侧添加按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `addPermission` 配置
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 右侧导出按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `exportPermission` 配置
   */
  exportPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 左侧导入按钮的权限标识
   * 则默认使用 `EntityConfig` 的 `importPermission` 配置
   */
  importPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 搜索的对象
   * 则覆盖自动生成的条件
   */
  searchParams: {
    type: Array<AirSearchFieldConfig>,
    default: undefined,
  },

  /**
   * # 加载的状态
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 实体类
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<E>>,
    required: true,
  },

  /**
   * # 是否显示搜索框
   * 优先级: `Entity` 配置 > 组件传入
   */
  showSearch: {
    type: Boolean,
    default: undefined,
  },

  /**
   * # 是否显示更多筛选器
   * 优先级: 组件传入 > `EntityConfig` 配置
   */
  showFilter: {
    type: Boolean,
    default: undefined,
  },

  /**
   * # 隐藏添加按钮
   */
  hideAdd: {
    type: Boolean,
    default: undefined,
  },

  /**
   * # 导出的请求参数
   */
  exportParam: {
    type: Object as PropType<AirRequest>,
    default: undefined,
  },

  /**
   * # 是否显示导出按钮
   * 如传入 则需要再传入 `:service`
   */
  showExport: {
    type: Boolean,
    default: false,
  },

  /**
   * # 导入接口地址
   * 默认按传入的 `service` 自动生成
   */
  importUrl: {
    type: String,
    default: undefined,
  },

  /**
   * # 导入模板下载地址
   * 默认按传入的 `service` 自动生成
   */
  importTemplateUrl: {
    type: String,
    default: undefined,
  },

  /**
   * # 导入上传的标题
   * 默认按传入的 `service` 自动生成
   */
  importTitle: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否显示导入按钮
   * - `import-url` `可选` 导入的API接口地址
   * - `import-title` `可选` 指定上传框的标题
   */
  showImport: {
    type: Boolean,
    default: false,
  },

  /**
   * # 导入的文件实体类
   * 可通过 `AirConfig.fileEntityClass` 配置, 默认为 `AirFileEntity`
   */
  fileEntity: {
    type: Function as unknown as PropType<ClassConstructor<IFile>>,
    default: AirConfig.fileEntityClass,
  },

  /**
   * # 接口服务类
   */
  service: {
    type: Function as unknown as PropType<ClassConstructor<S>>,
    required: true,
  },

  /**
   * # 搜索框提示文案
   * 优先级: 组件传入 > `EntityConfig` 配置 > `AirConfig` 默认值
   */
  searchPlaceholder: {
    type: String,
    default: undefined,
  },

  /**
   * # 默认的筛选器
   */
  defaultFilter: {
    type: Object as PropType<E>,
    default: undefined,
  },
})

/**
 * # 默认时间
 */
const defaultTime = ref([
  new Date(1991, 10, 3, 0, 0, 0),
  new Date(1991, 10, 3, 23, 59, 59),
])

/**
 * # 格式化年月日
 */
const YYYY_MM_DD = 'YYYY/MM/DD'

/**
 * # 格式化时分秒
 */
const HH_MM_SS = 'HH:mm:ss'

const LABEL_TO = '至'
const LABEL_END = '结束'

/**
 * # `Entity` 的实例
 */
const entityInstance = computed(() => {
  if (props.entity) {
    try {
      return AirClassTransformer.newInstance(props.entity)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('AToolBar创建实体的实例失败')
    }
  }
  return new AirEntity()
})

/**
 * # 查询数据
 */
const data = ref<IJson>(props.defaultFilter ? (props.defaultFilter as IJson) : {})

/**
 * # 内部使用的配置
 */
const modelConfig = computed(() => getModelConfig(entityInstance.value))

/**
 * # 查询对象
 */
const request = ref(new AirRequestPage(props.entity)) as Ref<AirRequestPage<E>>

/**
 * # 添加按钮的标题
 */
const addTitle = computed(() => modelConfig.value.addTitle || (AirI18n.get().Add || '添加'))

/**
 * # 是否显示搜索框
 */
const isSearchEnabled = computed(() => props.showSearch ?? modelConfig.value.showSearch ?? true)

/**
 * # 为URL拼接AccessToken
 * @param url
 */
function getUrlWithAccessToken(url: string): string {
  const accessToken = AirConfig.getAccessToken()
  if (url.indexOf(`?${AirConfig.authorizationHeaderKey}=`) < 0 && url.indexOf(`&${AirConfig.authorizationHeaderKey}=`) < 0) {
    if (url.indexOf('?') < 0) {
      url += `?${AirConfig.authorizationHeaderKey}=${accessToken}`
    } else {
      url += `&${AirConfig.authorizationHeaderKey}=${accessToken}`
    }
  }
  return url
}

/**
 * # 导出方法
 */
function onExport() {
  if (!props.service) {
    AirNotification.error('请为ToolBar传入service', '导出失败')
    return
  }

  const service = AirClassTransformer.newInstance(props.service)
  const exportModel = new AirExportModel()
  exportModel.param = request.value
  exportModel.createExportTaskUrl = `${service.baseUrl}/export`
  exportModel.queryExportUrl = `${service.baseUrl}/queryExport`
  AirDialog.createExportTask(exportModel)
}

/**
 * # 获取API地址
 * @param url
 */
function getApiUrl(url: string): string {
  if (url.indexOf(AirConstant.PREFIX_HTTP) < 0 && url.indexOf(AirConstant.PREFIX_HTTPS) <= 0) {
    url = AirConfig.apiUrl + url
  }
  return url
}

/**
 * # 下载导入的模板
 */
function onDownloadTemplate() {
  let url = props.importTemplateUrl
  if (url) {
    window.open(AirConfig.apiUrl + getUrlWithAccessToken(url))
    return
  }

  // 没有自定义传入 则自动生成
  if (!props.service) {
    AirNotification.error('请为ToolBar传入service或者importTemplateUrl', '下载失败')
    return
  }

  const service = AirClassTransformer.newInstance(props.service)
  url = `${service.baseUrl}/${AirConfig.importTemplateUrl}`
  url = getApiUrl(url)
  window.open(getUrlWithAccessToken(url))
}

/**
 * # 高级搜索字段列表
 */
const searchFieldList = computed(() => (props.searchParams || entityInstance.value.getSearchFieldConfigList()))

/**
 * # 查询用的临时JSON
 */
const filter = ref<IJson>({})

/**
 * # 查询事件
 */
function onSearch() {
  request.value = new AirRequestPage(props.entity)
  const keys = Object.keys(data.value)
  keys.forEach((key) => {
    if (data.value[key] === '') {
      data.value[key] = undefined
    }
  })
  request.value.filter = AirClassTransformer.newInstance(props.entity)
    .recoverBy(data.value)
  if (request.value.page) {
    request.value.page.pageNum = 1
  }
  emits('onSearch', request.value)
}

/**
 * # 重置表单
 */
function onResetSearch() {
  filter.value = {}
  request.value = new AirRequestPage(props.entity)
  request.value.exclude('filter')
  emits('onReset')
  emits('onSearch', request.value)
}

/**
 * # 导入
 */
async function onImport() {
  let url = props.importUrl
  if (!url) {
    // 没有自定义传入 则自动生成
    if (!props.service) {
      AirNotification.error('请为ToolBar传入service或者importUrl', '导入失败')
      return
    }
    const service = AirClassTransformer.newInstance(props.service)
    url = `${service.baseUrl}/${AirConfig.importUrl}`
    url = getApiUrl(url)
  }
  await AirDialog.showUpload(
    {
      uploadUrl: url,
      extensions: ['xls', 'xlsx'],
      title: props.importTitle || AirI18n.get().Import || '导入',
      uploadSuccess: AirI18n.get().ImportSuccess || '数据导入成功',
      confirmText: AirI18n.get().DownloadTemplate || '下载模板',
      entity: AirConfig.fileEntityClass,
    },
    () => {
      onDownloadTemplate()
    },
  )
  onResetSearch()
}

/**
 * # 暴露一个重置搜索的方法
 */
defineExpose({
  resetSearch: onResetSearch,
  search: onSearch,
})
</script>

<style lang="scss">
.air-tool-bar {
  padding: 0 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .el-button + .el-button {
    margin-left: 5px;
  }

  .export-button {
    margin-left: 5px;
  }

  .el-input-number {
    .el-input__inner {
      text-align: left;
    }
  }

  &--left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .airpower {
      margin-right: 5px;
    }
  }

  &--right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap-reverse;

    > * {
      margin: 0 2px 5px;
    }

    .el-input,
    .el-select {
      cursor: pointer;
      border: none;
    }

    .item {
      display: flex;
      width: 200px;
    }

    .el-date-editor--datetimerange,
    .el-date-editor--daterange {
      flex: 1;
    }
  }
}
</style>
