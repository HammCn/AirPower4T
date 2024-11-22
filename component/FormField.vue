<template>
  <template v-if="fieldList.length === 0">
    <el-form-item
      :label="entityInstance.getFormFieldLabel(field)"
      :prop="field"
    >
      <slot>
        <AInput
          v-model="formData[field]"
          :entity="entityClass"
          :model-modifiers="{ field }"
          :modifier="field"
          :disabled="disabled"
          :disabled-value="disabledValue"
          :readonly="readonly"
          :list="list"
          :tree="tree"
          @change="onChange($event)"
          @blur="emits('blur'); emits('onBlur')"
          @focus="emits('focus'); emits('onFocus')"
          @clear="emits('clear'); emits('onClear');"
        />
      </slot>
    </el-form-item>
  </template>
  <template v-else>
    <AFormField
      v-for="item in fieldList"
      :key="item"
      :field="item"
      :disabled="disabled"
      :disabled-value="disabledValue"
      :readonly="readonly"
      @blur="emits('blur'); emits('onBlur')"
      @focus="emits('focus'); emits('onFocus')"
      @clear="emits('clear'); emits('onClear');"
      @change="onChange($event)"
    />
  </template>
</template>

<script setup lang="ts" generic="E extends AirEntity">
import {
  computed, inject, PropType, ref,
} from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AFormField, AInput } from '.'
import { IJson } from '../interface/IJson'
import { IDictionary } from '../interface/IDictionary'
import { ITree } from '../interface/ITree'
import { ClassConstructor } from '../type/AirType'

const props = defineProps({
  /**
   * # 实体类
   * 传入表单内容的类型，如传入则覆盖自动注入的类
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<E>>,
    default: null,
  },

  /**
   * # 字段的名称
   * `field` 和 `fieldList` 必传一个
   */
  field: {
    type: String,
    default: '',
  },

  /**
   * # 手动绑定的表单对象
   */
  modelValue: {
    type: Object as PropType<E>,
    default: null,
  },

  /**
   * # 字段的名称数组
   * `field` 和 `fieldList` 必传一个
   */
  fieldList: {
    type: Array<string>,
    default: () => [],
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
   * # 可选数组
   * 优先级: `AInput`传入 > `@Form`
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
})

const emits = defineEmits<{
  onChange: [value: E],
  change: [value: E],
  'update:modelValue': [value: E],
  blur: [],
  onBlur: [],
  focus: [],
  onFocus: [],
  onClear: [],
  clear: [],
}>()

if (props.fieldList.length === 0 && !props.field) {
  throw new Error('field和fieldList必传一个！！！')
}

/**
 * # 注入的表单数据
 */
const injectFormData = inject<IJson>('formData')

/**
 * # 手动绑定的 v-model 覆盖 自动注入的表单对象
 */
const formData = props.modelValue ? ref<IJson>(props.modelValue) : injectFormData

if (!formData) {
  throw new Error('请手动为AFormField绑定v-model或使用useAirEditor创建表单对象(推荐)！！！')
}

/**
 * # 手动传入的实体类 覆盖 自动注入的实体类
 */
const entityClass = inject('entityClass') as ClassConstructor<E> || props.entity

if (!entityClass) {
  throw new Error('请手动传入到AFormField的entity属性或使用useAirEditor创建表单对象(推荐)！！！')
}

/**
 * # 实例化实体类
 */
const entityInstance = computed(() => AirClassTransformer.newInstance(entityClass))

/**
 * # 监听值变化
 * @param val 值
 */
function onChange(val: unknown) {
  (formData!.value)[props.field] = val
  emits('update:modelValue', formData!.value)
  emits('change', formData!.value)
  emits('onChange', formData!.value)
  if (injectFormData) {
    (injectFormData.value as IJson)[props.field] = val
  }
}
</script>
