<script generic="M extends AirModel" lang="ts" setup>
import type { PropType, Ref } from 'vue'
import type { AirModel } from '../base/AirModel'

import type { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import type { IDictionary } from '../interface/IDictionary'
import type { IJson } from '../interface/IJson'
import type { ITree } from '../interface/ITree'
import type { ClassConstructor } from '../type/AirType'
import { CircleClose } from '@element-plus/icons-vue'
import { computed, ref, useSlots, watch } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirConfig } from '../config/AirConfig'
import { AirConstant } from '../config/AirConstant'
import { AirColor } from '../enum/AirColor'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { AirTrim } from '../enum/AirTrim'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AirDecorator } from '../helper/AirDecorator'
import { AirI18n } from '../helper/AirI18n'
import { AirValidator } from '../helper/AirValidator'
import { AirDictionaryArray } from '../model/extend/AirDictionaryArray'

const props = defineProps({
  modelValue: {
    type: [String, Boolean, Number, Array, Object],
    default: undefined,
  },
  modelModifiers: {
    type: Object,
    default: () => ({}),
  },

  /**
   * # 如果是循环, 则此项必须传入
   * 字段名
   */
  modifier: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否禁用输入
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否只读
   */
  readonly: {
    type: Boolean,
    default: false,
  },

  /**
   * # 禁用时显示的值
   * 如果被禁用时传入了这个值, 则会显示这个值.
   */
  disabledValue: {
    type: [String, Boolean, Number, Array, Object],
    default: undefined,
  },

  /**
   * # 显示的格式化方式
   */
  dateShowFormatter: {
    type: String,
    default: undefined,
  },

  /**
   * # 传入的实体类
   * 如同时传入了 `modifier` 或 `v-model` 指令的 `modifier` 则自动生成兜底的 `placeholder` 等信息
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<M>>,
    default: undefined,
  },

  /**
   * # 自定义提示文字
   * 优先级: `AInput` 传入 > `@Form` > 自动生成
   */
  placeholder: {
    type: String,
    default: '',
  },

  /**
   * # 可选数组
   * 优先级: `AInput` 传入 > `@Form`
   */
  list: {
    type: Array<IDictionary>,
    default: undefined,
  },

  /**
   * # 可选树结构
   * 优先级: `AInput` 传入 > `@Form`
   */
  tree: {
    type: Array<ITree>,
    default: undefined,
  },

  /**
   * # 是否显示清空的图标
   * 仅在普通输入框的 `readonly` 下有效
   */
  showClear: {
    type: Boolean,
    default: false,
  },

  /**
   * # 远程搜索的回调方法
   * 如传入 则会回调此方法进行自定义搜索
   */
  onSearch: {
    type: Function,
    default: null,
  },
})
const emits = defineEmits([
  'blur',
  'onBlur',
  'focus',
  'onFocus',
  'onChange',
  'change',
  'update:modelValue',
  'onClear',
  'clear',
])
const slots: IJson = useSlots()

/**
 * 绑定的数据
 */
const value: Ref<string | number | boolean | Array<unknown> | IJson | undefined> = ref(props.modelValue)

/**
 * # 触发 change 事件
 */
function emitChange() {
  emits('onChange', value.value)
  emits('change', value.value)
}

/**
 * # 触发 blur 事件
 */
function emitBlur() {
  emits('blur')
  emits('onBlur')
}

/**
 * # 触发 clear 事件
 */
function emitClear() {
  emits('clear')
  emits('onClear')
}

/**
 * # 实体的实例
 */
const entityInstance = computed(() => {
  if (props.entity) {
    return AirClassTransformer.parse({}, props.entity)
  }
  return new AirEntity()
})

/**
 * # 是否显示清空按钮
 */
const isClearButtonShow = ref(props.showClear)

/**
 * # 占位内容
 */
const placeholderRef = ref(props.placeholder)

/**
 * # 字段的表单配置信息
 */
const fieldConfig: Ref<AirFormFieldConfig | null> = ref(null)

/**
 * # 字段名称
 */
const fieldName = ref('')

/**
 * # 枚举数据
 */
const dictionary = computed(() => {
  if (props.list) {
    return AirDictionaryArray.create(props.list)
  }
  if (fieldConfig.value && fieldConfig.value.dictionary) {
    return AirDecorator.getDictionary(fieldConfig.value.dictionary)
  }
  return undefined
})

/**
 * # Props的value变化
 */
function onPropsValueUpdated(newProps?: typeof props) {
  if (newProps) {
    if (newProps.disabled) {
      // disabled
      value.value = newProps.disabledValue === undefined ? newProps.modelValue : newProps.disabledValue
    }
    else {
      value.value = newProps.modelValue
    }
  }
  else {
    value.value = props.modelValue
  }
}

/**
 * # 获取显示的格式化
 */
const getShowFormatter = computed(() => {
  if (fieldConfig.value) {
    switch (fieldConfig.value?.dateType) {
      case AirDateTimeType.DATE:
        return AirDateTimeFormatter.YYYY_MM_DD
      case AirDateTimeType.WEEK:
        return '第ww周'
      case AirDateTimeType.YEAR:
        return 'YYYY'
      case AirDateTimeType.MONTH:
        return 'YYYY-MM'
    }
  }
  return AirConfig.dateTimeFormatter
})

/**
 * # 获取switch的颜色
 * @param status
 */
function getSwitchColor(status: boolean): string {
  return dictionary.value?.find(item => item.key === status)?.color || AirConstant.STRING_EMPTY
}

/**
 * # 获取Switch的文案
 * @param status
 */
function getSwitchLabel(status: boolean): string {
  return dictionary.value?.find(item => item.key === status)?.label || AirConstant.STRING_EMPTY
}

/**
 * # 获取是否显示字符长度的显示label
 */
function getShowWordLimit(): boolean {
  if (!fieldConfig.value) {
    // 没有配置装饰器 直接不显示
    return false
  }
  if (fieldConfig.value.showLimit !== undefined) {
    // 配置了装饰器 且配置了属性 直接返回
    return fieldConfig.value.showLimit
  }
  // 配置了装饰器 但没配置属性 读取默认值
  return fieldConfig.value.textarea ? AirConfig.showLengthLimitTextarea : AirConfig.showLengthLimitInput
}

/**
 * # 获取输入类型的字符串
 */
const getInputType = computed(() => {
  if (fieldConfig.value?.textarea) {
    return 'textarea'
  }
  if (fieldConfig.value?.password) {
    return 'password'
  }
  if (fieldConfig.value?.number) {
    return 'number'
  }
  return 'text'
})

/**
 * # 监听Props变化, 同步数据
 */
watch(props, (newProps) => {
  isClearButtonShow.value = props.showClear
  onPropsValueUpdated(newProps)
})

/**
 * # 验证输入的值
 */
function checkNumberValue() {
  if (fieldConfig.value?.number) {
    // 数字输入
    let tempValue = value.value as number | string | undefined | null
    const max = Math.min(fieldConfig.value.max ?? AirConfig.maxNumber, Number.MAX_SAFE_INTEGER)
    const min = Math.max(fieldConfig.value.min ?? AirConfig.minNumber, Number.MIN_SAFE_INTEGER)
    if (
      tempValue !== ''
      && tempValue !== undefined
      && tempValue !== null
      && AirValidator.isNumber(tempValue.toString())
    ) {
      tempValue = Number.parseFloat(tempValue.toString())
      // 按最大值最小值做边界处理
      tempValue = Math.max(tempValue, min)
      tempValue = Math.min(tempValue, max)
      tempValue = Number.parseFloat(tempValue.toFixed(fieldConfig.value.precision ?? AirConfig.numberPrecision))
      value.value = tempValue
      value.value = Number.parseFloat(value.value?.toString() || '0')
    }
    value.value = Number.parseFloat(value.value?.toString() || '0')
  }
}

/**
 * # 清空事件
 */
function onClear() {
  emitClear()
  emitChange()
}

/**
 * # 将数据丢出去
 */
function emitValue() {
  if (fieldConfig.value && value.value) {
    switch (fieldConfig.value.trim) {
      case AirTrim.ALL:
        value.value = value.value.toString().trim()
        break
      case AirTrim.END:
        value.value = value.value.toString().trimEnd()
        break
      default:
    }
  }
  emits('update:modelValue', value.value)
  emitChange()
}

/**
 * # 输入键盘按下事件
 * @param event
 */
function onKeyDown(event: KeyboardEvent) {
  switch (event.code) {
    case 'KeyE':
      if (fieldConfig.value?.number) {
        // 数字类型输入不允许输入科学计数的e
        event.preventDefault()
      }
      break
    case 'Escape':
      if (fieldConfig.value?.clearable) {
        value.value = undefined
        emitValue()
      }
      break
    default:
  }
}

/**
 * # 输入框失去焦点
 */
function onBlur() {
  if (fieldConfig.value && value.value) {
    switch (fieldConfig.value.trim) {
      case AirTrim.ALL:
        value.value = value.value.toString().trim()
        break
      case AirTrim.START:
        value.value = value.value.toString().trimStart()
        break
      case AirTrim.END:
        value.value = value.value.toString().trimEnd()
        break
      default:
    }
  }
  checkNumberValue()
  emitValue()
  emitBlur()
}

/**
 * # 监听Value变化, 同步数据
 */
watch(value, () => {
  emitValue()
})

/**
 * # 初始化
 */
function init() {
  if (props.modifier) {
    // 如传入了自定义的modifier 则优先使用
    fieldName.value = props.modifier
  }
  else {
    for (const key in props.modelModifiers) {
      fieldName.value = key
    }
  }

  // 初始化配置信息
  if (props.entity && fieldName.value) {
    fieldConfig.value = entityInstance.value.getCustomFormFieldConfig(fieldName.value)

    if (!placeholderRef.value) {
      const field = fieldConfig.value?.label || entityInstance.value.getFieldName(fieldName.value)
      // 默认生成输入的placeholder
      placeholderRef.value = `请输入${field}...`

      if (fieldConfig.value) {
        // 装饰了FormField
        if (
          dictionary.value
          || fieldConfig.value.dictionary
          || props.list
          || props.tree
          || fieldConfig.value.dateType !== undefined
        ) {
          // 传入了枚举值
          placeholderRef.value = AirI18n.get().SelectPlease || '请选择'
        }
        if (fieldConfig.value.placeholder) {
          // 传入了自定义placeholder
          placeholderRef.value = fieldConfig.value.placeholder
        }
      }
    }
  }
  if (props.modelValue === undefined && fieldConfig.value?.defaultValue !== undefined) {
    // 没有初始化的值 但装饰器设置了默认值
    value.value = fieldConfig.value.defaultValue
    emitValue()
    return
  }
  // 初始化同步值
  onPropsValueUpdated(props)
}

init()
</script>

<template>
  <div class="air-input">
    <template v-if="fieldConfig && fieldConfig.dateType !== undefined">
      <el-date-picker
        v-if="fieldConfig.dateType !== AirDateTimeType.TIME"
        v-model="value"
        :clearable="fieldConfig?.clearable"
        :disabled="disabled"
        :format="fieldConfig.dateShowFormatter || getShowFormatter"
        :placeholder="placeholderRef"
        :prefix-icon="fieldConfig?.prefixIcon"
        :readonly="readonly"
        :suffix-icon="fieldConfig?.suffixIcon"
        :type="fieldConfig.dateType"
        :value-format="fieldConfig.dateFormatter"
        style="width: 100%"
        @clear="onClear"
        @focus="emits('focus')"
        @keydown="onKeyDown"
      />
      <el-time-picker
        v-else
        v-model="value"
        :clearable="fieldConfig?.clearable"
        :disabled="disabled"
        :format="fieldConfig.dateShowFormatter || AirDateTimeFormatter.HH_mm_ss"
        :placeholder="placeholderRef"
        :prefix-icon="fieldConfig?.prefixIcon"
        :readonly="readonly"
        :suffix-icon="fieldConfig?.suffixIcon"
        :value-format="fieldConfig.dateFormatter"
        style="width: 100%"
        @clear="onClear"
        @focus="emits('focus')"
        @keydown="onKeyDown"
      />
    </template>
    <template v-else-if="list || dictionary">
      <el-switch
        v-if="fieldConfig?.switch"
        v-model="value"
        :active-text="getSwitchLabel(true)"
        :inactive-text="getSwitchLabel(false)"
        :readonly="readonly"
        :style="{
          '--el-switch-on-color': getSwitchColor(true),
          '--el-switch-off-color': getSwitchColor(false),
        }"
      />
      <el-radio-group
        v-else-if="fieldConfig?.radioButton"
        v-model="value"
        :readonly="readonly"
      >
        <el-radio-button
          v-for="item in dictionary"
          :key="item.key"
          :value="item.key"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
      <el-radio-group
        v-else-if="fieldConfig?.radio"
        v-model="value"
        :readonly="readonly"
      >
        <el-radio
          v-for="item in dictionary"
          :key="item.key"
          :value="item.key"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-select
        v-else
        v-model="value"
        :clearable="fieldConfig?.clearable"
        :collapse-tags="fieldConfig?.collapseTags"
        :disabled="disabled"
        :filterable="fieldConfig?.filterable"
        :multiple="fieldConfig?.multiple"
        :multiple-limit="fieldConfig?.multipleLimit"
        :placeholder="placeholderRef"
        :prefix-icon="fieldConfig?.prefixIcon"
        :readonly="readonly"
        :remote="!!onSearch"
        :remote-method="onSearch"
        :suffix-icon="fieldConfig?.suffixIcon"
        collapse-tags-tooltip
        fit-input-width
        @clear="onClear"
        @focus="emits('focus')"
        @keydown="onKeyDown"
      >
        <el-option
          v-for="item in dictionary"
          :key="item.key.toString()"
          :disabled="item.disabled"
          :label="item.label"
          :value="item.key"
        >
          <div
            v-if="fieldConfig?.showColor"
            class="air-input-select"
          >
            <span class="label">{{ item.label }}</span>
            <span
              :style="{ backgroundColor: item.color || AirColor.NORMAL }"
              class="light"
            />
          </div>
        </el-option>
      </el-select>
    </template>

    <el-cascader
      v-else-if="fieldConfig && tree"
      v-model="value"
      :clearable="fieldConfig?.clearable"
      :collapse-tags="fieldConfig?.collapseTags"
      :disabled="disabled"
      :options="tree"
      :placeholder="placeholderRef"
      :props="{
        value: 'id',
        label: 'name',
        multiple: fieldConfig?.multiple,
        emitPath: fieldConfig?.emitPath,
        checkStrictly: fieldConfig?.checkStrictly,
      }"
      :readonly="readonly"
      :show-all-levels="fieldConfig?.showAllLevels"
      class="air-input-cascader"
      collapse-tags-tooltip
      popper-class="air-input-cascader-popper"
      @clear="onClear"
      @focus="emits('focus')"
      @keydown="onKeyDown"
    />
    <el-input
      v-else
      v-model="value"
      :autosize="fieldConfig?.autoSize ? { minRows: fieldConfig.minRows, maxRows: fieldConfig.maxRows } : false"
      :clearable="fieldConfig?.clearable"
      :disabled="disabled"
      :max="fieldConfig?.max"
      :maxlength="
        fieldConfig?.maxLength || (fieldConfig?.textarea ? AirConfig.maxTextAreaLength : AirConfig.maxTextLength)
      "
      :min="fieldConfig?.min ?? 0"
      :placeholder="placeholderRef"
      :prefix-icon="fieldConfig?.prefixIcon"
      :readonly="readonly"
      :rows="fieldConfig?.textarea ? AirConfig.textareaMinRows : 0"
      :show-word-limit="getShowWordLimit()"
      :suffix-icon="fieldConfig?.suffixIcon"
      :type="getInputType"
      @blur="onBlur"
      @change="checkNumberValue"
      @clear="onClear"
      @focus="emits('focus')"
      @keydown="onKeyDown"
    >
      <template
        v-for="(index, name) in slots"
        #[name]
      >
        <slot :name="name">
          <template v-if="name === 'append'">
            {{ fieldConfig?.suffixText }}
          </template>
          <template v-if="name === 'suffix'">
            <el-icon
              v-if="isClearButtonShow"
              @click="onClear()"
            >
              <CircleClose />
            </el-icon>
          </template>
        </slot>
      </template>
      <template
        v-if="!slots.append && fieldConfig?.suffixText"
        #append
      >
        {{ fieldConfig.suffixText }}
      </template>
    </el-input>
  </div>
</template>

<style lang="scss">
.air-input {
  width: 100%;

  .air-input-cascader {
    display: inline;
    width: 100%;
  }

  .air-input-cascader-popper {
    margin-top: 8px !important;

    .el-cascader-menu__list {
      width: 100%;
    }
  }

  .air-input-number {
    .el-input__inner {
      text-align: left;
    }
  }
}

.air-input-select {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .label {
    width: 0;
    flex: 1;
  }

  .light {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: -15px;
    border-radius: 100%;
  }
}
</style>
