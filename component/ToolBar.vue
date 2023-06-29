<template>
  <div class="air-tool-bar">
    <div class="air-tool-bar--left">
      <slot name="beforeButton" />
      <slot name="customButton">
        <AButton
          v-if="props.entity && !hideAdd"
          :permission="addPermission || AirPermission.getPermission(entity, AirPermissionAction.ADD)"
          primary
          type="ADD"
          @click="emits('onAdd')"
        >
          {{ addTitle }}
        </AButton>
      </slot>
      <AButton
        v-if="showImport"
        :permission="importPermission || AirPermission.getPermission(entity, AirPermissionAction.IMPORT)"
        type="IMPORT"
        @click="importIt()"
      >
        导入
      </AButton>
    </div>
    <div class="air-tool-bar--right">
      <slot name="beforeSearch" />
      <template v-if="isKeywordSearchEnabled">
        <el-input
          v-model="keyword"
          v-tip="searchPlaceholder"
          :placeholder="keywordSearchPlaceholder"
          class="keyword"
          @keydown.enter="searchKeyword"
        >
          <template #suffix>
            <el-icon
              v-if="keyword"
              style="margin-right:6px;"
              @click="keyword = ''; searchKeyword()"
            >
              <CircleClose />
            </el-icon>
            <el-icon
              style="vertical-align: middle"
              @click="searchKeyword"
            >
              <Search />
            </el-icon>
          </template>
        </el-input>
      </template>
      <slot name="customSearch" />
      <template v-if="isAdvanceSearchEnabled">
        <div class="advance-search">
          <el-button
            :class="searchAnimation"
            @click.stop=" keyword = ''; showDialog = !showDialog"
          >
            <i class="airpower icon-commonicon_gengduoshaixuan" />{{ searchTitle }}
          </el-button>
          <div
            v-if="showDialog"
            class="advance-search-bg"
            :title="'点击关闭' + searchTitle"
            @click="hideAdvanceSearchDialog"
          />
          <transition name="search">
            <div
              v-if="showDialog"
              class="advance-search-dialog"
            >
              <div class="advance-search-title">
                <div class="advance-search-title-label">
                  {{ searchTitle }}
                </div>
                <div
                  class="advance-search-title-close"
                  @click="hideAdvanceSearchDialog"
                >
                  <i class="airpower icon-commonicon_guanbi" />
                </div>
              </div>
              <div class="advance-search-form">
                <el-form
                  ref="formRef"
                  label-width="auto"
                  :model="filter"
                >
                  <template
                    v-for=" item in searchFieldList "
                    :key="item.key"
                  >
                    <el-form-item
                      v-if="!item.hide"
                      :label="item.label"
                    >
                      <slot
                        :name="item.key"
                        :data="filter"
                      >
                        <template v-if="item.between">
                          <el-date-picker
                            v-if="item.betweenType === AirBetweenType.DATE"
                            v-model="filter[item.key]"
                            :editable="false"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="YYYY/MM/DD"
                            value-format="x"
                            :default-time="[
                              new Date(1991, 10, 3, 0, 0, 0),
                              new Date(1991, 10, 3, 23, 59, 59),
                            ]
                            "
                          />
                          <el-time-picker
                            v-if="item.betweenType === AirBetweenType.TIME"
                            v-model="filter[item.key]"
                            is-range
                            arrow-control
                            :editable="false"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            value-format="HH:mm:ss"
                          />
                          <el-date-picker
                            v-if="item.betweenType === AirBetweenType.DATETIME"
                            v-model="filter[item.key]"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            format="YYYY/MM/DD HH:mm:ss"
                            :editable="false"
                            value-format="x"
                            :default-time="[
                              new Date(1991, 10, 3, 0, 0, 0),
                              new Date(1991, 10, 3, 23, 59, 59),
                            ]
                            "
                          />

                          <el-slider
                            v-if="item.betweenType === AirBetweenType.NUMBER"
                            v-model="filter[item.key]"
                            range
                            :min="item.betweenMin || 0"
                            :max="item.betweenMax || 100"
                          />
                        </template>

                        <el-select
                          v-else-if="item.enumRecord && item.enumRecord.length > 0"
                          v-model="filter[item.key]"
                          :placeholder="'请选择' + item.label + '...'"
                          clearable
                          :filterable="item.filterable"
                          @clear=" filter[item.key] = undefined"
                        >
                          <template v-for=" enumItem of item.enumRecord ">
                            <el-option
                              v-if="!enumItem.disabled"
                              :key="(enumItem.key as string)"
                              :value="enumItem.key"
                              :label="enumItem.label"
                            />
                          </template>
                        </el-select>

                        <el-select
                          v-else-if="getEnumRecord(entityInstance, item.key)"
                          v-model="filter[item.key]"
                          :placeholder="'请选择' + item.label + '...'"
                          clearable
                          :filterable="item.filterable"
                          @clear=" filter[item.key] = undefined"
                        >
                          <template v-for=" enumItem of getEnumRecord(entityInstance, item.key) ">
                            <el-option
                              v-if="!enumItem.disabled"
                              :key="(enumItem.key as string)"
                              :value="enumItem.key"
                              :label="enumItem.label"
                            />
                          </template>
                        </el-select>
                        <el-input-number
                          v-else-if="item.dataType === AirSearchDataType.NUMBER"
                          v-model.number="filter[item.key]"
                          :placeholder="'请输入' + item.label + '...'"
                          :type="getInputType(item)"
                          :controls="false"
                        />
                        <el-input
                          v-else
                          v-model="filter[item.key]"
                          :placeholder="'请输入' + item.label + '...'"
                          clearable
                          :type="getInputType(item)"
                          @clear=" filter[item.key] = undefined"
                        />
                      </slot>
                    </el-form-item>
                  </template>
                </el-form>
              </div>
              <div class="advance-search-footer">
                <el-button
                  type="primary"
                  @click="advanceSearch"
                >
                  确定筛选
                </el-button>
                <el-button
                  @click="
                    resetSearch();
                    hideAdvanceSearchDialog()
                  "
                >
                  重置筛选
                </el-button>
              </div>
            </div>
          </transition>
        </div>
      </template>

      <AButton
        v-if="showExport"
        :permission="exportPermission || AirPermission.getPermission(entity, AirPermissionAction.EXPORT)"
        type="EXPORT"
        custom-class="export-button"
        @click=" exportIt()"
      >
        导出
      </AButton>
      <slot name="toolbarExtend" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  PropType, ref, computed,
} from 'vue'

import { AButton } from '../component'
import { AirDialog } from '../helper/AirDialog'
import { getEntityConfig } from '../decorator/EntityConfig'
import { AirConfig } from '../config/AirConfig'
import { AirSearchDataType } from '../enum/AirSearchDataType'
import { AirNotification } from '../feedback/AirNotification'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirFormInstance } from '../type/AirType'
import { AirBetweenType } from '../enum/AirBetweenType'
import { AirPermissionAction } from '../enum/AirPermissionAction'
import { AirPermission } from '../helper/AirPermission'
import { IFile } from '../interface/IFile'
import { AirEntity } from '../base/AirEntity'
import { AirRequestPage } from '../model/AirRequestPage'
import { ClassConstructor } from '../type/ClassConstructor'
import { AirRequest } from '../model/AirRequest'
import { AirAbstractService } from '../base/AirAbstractService'
import { IJson } from '../interface/IJson'
import { getEnumRecord } from '../decorator/Custom'

const emits = defineEmits(['onSearch', 'onAdd', 'onReset'])

const props = defineProps({
  /**
   * # 左侧新增按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```addPermission``` 配置
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 右侧导出按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```exportPermission``` 配置
   */
  exportPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 左侧导入按钮的权限标识
   * 如不传入 则默认使用 ```EntityConfig``` 的 ```importPermission``` 配置
   */
  importPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 搜索的对象
   * 如传入 则覆盖 search-entity 自动生成的条件
   */
  searchParams: {
    type: Array as unknown as PropType<AirSearchFieldConfig[]>,
    default: () => [],
  },

  /**
   * # 加载的状态
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 选择框宽度
   */
  labelWidth: {
    type: String,
    default: '150px',
  },

  /**
   * # 返回的搜索实体类型
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<AirEntity>>,
    required: true,
  },

  /**
   * # 隐藏关键词搜索
   * 如 ```EntityConfig``` 中 ```hideKeywordSearch``` 设置为 ```true``` , 则此项无效
   */
  hideSearch: {
    type: Boolean,
    default: false,
  },

  /**
   * # 隐藏高级搜索功能
   * 如 ```EntityConfig``` 中 ```hideAdvanceSearch``` 设置为 ```true``` , 则此项无效
   */
  hideAdvanceSearch: {
    type: Boolean,
    default: AirConfig.defaultHideAdvanceSearch,
  },

  /**
   * # 隐藏新增按钮
   */
  hideAdd: {
    type: Boolean,
    default: false,
  },

  /**
   * # 导出接口地址 如传入则优先使用
   * 默认按传入的service自动生成
   */
  exportUrl: {
    type: String,
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
   * 如传入 则需要再传入 ```:service``` 或 ```:export-url```
   */
  showExport: {
    type: Boolean,
    default: false,
  },

  /**
   * # 🎉🎉🎉异步下载
   * 后期可能会默认此项为 ```true```
   *
   * 🎉 使用异步弹窗下载 如不配置或者 ```false``` 则传统直接下载
   *
   * 建议数据量大的导出功能都使用这个方法
   */
  exportAsync: {
    type: Boolean,
    default: false,
  },

  /**
   * # 导入接口地址 如传入则优先使用
   * 默认按传入的service自动生成
   */
  importUrl: {
    type: String,
    default: undefined,
  },

  /**
   * # 导入模板下载地址 如传入则优先使用
   * 默认按传入的service自动生成
   */
  importTemplateUrl: {
    type: String,
    default: undefined,
  },

  /**
   * # 导入上传的标题 如传入则优先使用
   * 默认按传入的service自动生成
   */
  importTitle: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否显示导入按钮
   * 如传入 则需要再传入 :service 或 :import-url
   *
   * :import-title 可指定上传框的标题
   */
  showImport: {
    type: Boolean,
    default: false,
  },

  /**
   * # 导入的文件实体类
   * ---
   * #### 💡 可通过 ```AirConfig.defaultFileEntity``` 配置, 默认为 ```AirFileEntity```
   */
  fileEntity: {
    type: Function as unknown as PropType<ClassConstructor<IFile>>,
    default: AirConfig.defaultFileEntity,
  },

  /**
   * # 接口服务类
   * ```
   * 如 :service="UserService"
   * ```
   */
  service: {
    type: Function as unknown as PropType<ClassConstructor<AirAbstractService<AirEntity>>>,
    default: null,
  },

  /**
   * # 关键词搜索的提示文案
   * 如传入, 将覆盖 ```EntityConfig``` 的 ```keywordSearchPlaceholder``` 配置
   */
  searchPlaceholder: {
    type: String,
    default: '',
  },
})

/**
 * # Entity的实例
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
 * 表单
 */
const formRef = ref<AirFormInstance>()

/**
 * 是否显示高级搜索表单
 */
const showDialog = ref(false)

/**
 * 高级搜索按钮动画
 */
const searchAnimation = ref('')

/**
 * 内部使用的配置
 */
const entityConfig = computed(() => getEntityConfig(entityInstance.value))

/**
 * 高级搜索按钮标题
 */
const searchTitle = ref('更多筛选')

/**
 * 查询对象
 */
const request = ref(new AirRequestPage(props.entity))

/**
 * 新增按钮的标题
 */
// eslint-disable-next-line new-cap
const addTitle = computed(() => entityConfig.value.addTitle || (`新增${entityInstance.value.getCustomClassName()}`))

/**
 * 关键词搜索提示文字
 */
const keywordSearchPlaceholder = computed(() => {
  if (props.searchPlaceholder) {
    return props.searchPlaceholder
  }
  return entityConfig.value.keywordSearchPlaceholder
    || props.searchPlaceholder
    || AirConfig.defaultKeywordSearchPlaceholder
})

/**
 * 是否显示关键词搜索
 */
const isKeywordSearchEnabled = computed(() => {
  if (entityConfig.value.hideKeywordSearch) {
    // entityConfig设置隐藏 则全局隐藏
    return false
  }
  // 兜底使用传入的配置
  return !props.hideSearch
})

/**
 * 是否显示高级搜索
 */
const isAdvanceSearchEnabled = computed(() => {
  if (entityConfig.value.hideAdvanceSearch) {
    // entityConfig设置隐藏 则全局隐藏
    return false
  }
  // 兜底使用传入的配置
  return !props.hideAdvanceSearch
})

/**
 * 为URL拼接AccessToken
 * @param url
 */
function getUrlWithAccessToken(url: string) {
  const accessToken = AirConfig.getAccessToken()
  url = url.replace('authorization', 'Authorization')
  if (url.indexOf('?Authorization=') < 0 && url.indexOf('&Authorization=') < 0) {
    if (url.indexOf('?') < 0) {
      url += `?Authorization=${accessToken}`
    } else {
      url += `&Authorization=${accessToken}`
    }
  }
  return url
}

/**
 * 导出方法
 */
function exportIt() {
  let url = props.exportUrl
  if (!url) {
    // 没有自定义传入 则自动生成
    if (!props.service) {
      AirNotification.error('请为ToolBar传入service或者exportUrl', '导出失败')
      return
    }
    const service = AirClassTransformer.newInstance(props.service)
    url = `${service.baseUrl}/${props.exportAsync ? AirConfig.defaultExportAsyncUrl : AirConfig.defaultExportSyncUrl}`
  }
  if (props.exportAsync) {
    AirDialog.createExportTask(url, request.value)
    return
  }
  window.open(AirConfig.apiUrl + getUrlWithAccessToken(url))
}

/**
 * # 下载导入的模板
 */
function downloadTemplate() {
  let url = props.importTemplateUrl
  if (!url) {
    // 没有自定义传入 则自动生成
    if (!props.service) {
      AirNotification.error('请为ToolBar传入service或者importTemplateUrl', '下载失败')
      return false
    }
    const service = AirClassTransformer.newInstance(props.service)
    url = `${service.baseUrl}/${AirConfig.defaultTemplateUrl}`
  }
  window.open(AirConfig.apiUrl + getUrlWithAccessToken(url))
  return true
}

/**
 * 高级搜索字段列表
 */
const searchFieldList = computed(() => {
  // 如果传入searchParams 优先使用searchParams

  if (props.searchParams.length > 0) {
    return props.searchParams
  }
  return entityInstance.value.getSearchFieldConfigList()
})

/**
 * 查询用的临时JSON
 */
const filter = ref({} as IJson)

/**
 * 查询用的关键词
 */
const keyword = ref('')

/**
 * 高级搜索
 */
function advanceSearch() {
  // 删除关键词搜索数据
  keyword.value = ''
  request.value.keyword = keyword.value
  request.value.filter = AirClassTransformer.newInstance(props.entity).recoverBy(filter.value)
  emits('onSearch', request.value)
}

/**
 * 关键词搜索
 */
function searchKeyword() {
  // 删除高级搜索的数据
  filter.value = {}
  request.value.keyword = keyword.value
  request.value.exclude('filter')
  emits('onReset')
  emits('onSearch', request.value)
}

/**
 * 重置表单
 */
function resetSearch() {
  filter.value = {}
  keyword.value = ''
  request.value = new AirRequestPage(props.entity)
  request.value.exclude('filter')
  emits('onReset')
  emits('onSearch', request.value)
}

/**
 * 导入
 */
async function importIt() {
  let url = props.importUrl
  if (!url) {
    // 没有自定义传入 则自动生成
    if (!props.service) {
      AirNotification.error('请为ToolBar传入service或者importUrl', '导入失败')
      return
    }
    const service = AirClassTransformer.newInstance(props.service)
    url = `${service.baseUrl}/${AirConfig.defaultImportUrl}`
  }
  await AirDialog.showUpload(
    {
      uploadUrl: AirConfig.apiUrl + url,
      exts: ['xls', 'xlsx'],
      title: props.importTitle || '导入数据',
      uploadSuccess: '数据导入成功',
      confirmText: '下载模板',
      entity: AirConfig.defaultFileEntity,
    },
    () => {
      downloadTemplate()
    },
  )
  resetSearch()
}

/**
 * 获取输入的类型
 */
function getInputType(item: AirSearchFieldConfig) {
  switch (item.dataType) {
    case AirSearchDataType.TEXTAREA:
      return 'textarea'
    case AirSearchDataType.NUMBER:
      return 'number'
    default:
      return 'text'
  }
}

/**
 * 隐藏高级搜索(触发动画)
 */
function hideAdvanceSearchDialog() {
  showDialog.value = false
  searchAnimation.value = 'search-button-animation'
  setTimeout(() => {
    searchAnimation.value = ''
  }, 500)
}

/**
 * 暴露一个重置搜索的方法
 */
defineExpose({ resetSearch })

</script>

<style lang="scss">
.air-tool-bar {
  padding: 0 0 20px 0;
  display: flex;

  .el-button+.el-button {
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
    flex: 1;

    .airpower {
      margin-right: 5px;
    }
  }

  &--right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .keyword {
      cursor: pointer;
      width: 300px;
      margin-right: 5px;

      .el-icon {
        transition: all 0.3s;
      }

      .el-icon:hover {
        color: var(--primary-color);
      }
    }

    .advance-search-bg {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.05);
      z-index: 10001;
    }

    .search-button-animation {
      animation: jump-in 0.2s infinite;
      animation-delay: 0.3s;
    }

    .advance-search {
      position: relative;

      .airpower {
        margin-right: 5px;
      }

      .advance-search-dialog {
        position: absolute;
        right: 0px;
        top: 0px;
        z-index: 10002;
        background: white;
        box-shadow: 0px 0px 20px rgb(0 0 0 / 20%);
        border-radius: 6px;
        max-height: 500px;
        display: flex;
        flex-direction: column;
        min-width: 500px;

        .advance-search-title {
          padding: 15px 15px 20px 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .advance-search-title-label {
          flex: 1;
        }

        .advance-search-title-close {
          transition: all 0.3s;
          cursor: pointer;
          font-size: 18px;
        }

        .advance-search-title-close:hover {
          color: var(--primary-color);
        }

        .advance-search-form {
          flex: 1;
          height: 0;
          overflow: hidden;
          overflow-y: auto;
          padding: 20px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;

          .el-input,
          .el-input-number {
            max-width: 100% !important;
          }

        }

        .advance-search-footer {
          padding: 15px;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
      }
    }

    .el-button-group {
      display: inline-flex;
    }

    &--search {
      width: 300px;

      .el-input-group__append {
        background-color: transparent;

        &:hover {
          color: #f39800;
        }
      }

      .el-input__inner {
        &:focus {
          border-color: var(--el-input-hover-border,
              var(--el-border-color-hover)) !important;
        }
      }
    }
  }

  .search-btn {
    margin: 0 10px;
  }

  .reset-btn {
    margin-left: 0px;
  }
}
</style>
