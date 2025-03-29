<template>
  <el-form-item
    :label="entityInstance.getFormFieldLabel(field)"
    :prop="field"
  >
    <slot>
      <AInput
        v-model="formData[field]"
        :disabled="disabled"
        :disabled-value="disabledValue"
        :entity="entityClass"
        :list="list"
        :model-modifiers="{ field }"
        :modifier="field"
        :readonly="readonly"
        :tree="tree"
        @blur="
          emits('blur')
          emits('onBlur')
        "
        @change="onChange($event)"
        @clear="
          emits('clear')
          emits('onClear')
        "
        @focus="
          emits('focus')
          emits('onFocus')
        "
      />
    </slot>
  </el-form-item>
</template>

<script generic="E extends AirEntity" lang="ts" setup>
import { computed, inject, PropType, ref } from 'vue'
import { ElFormItem } from 'element-plus'
import { AirEntity } from '../base/AirEntity'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { AInput } from '.'
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
   */
  field: {
    type: String,
    required: true,
  },

  /**
   * # 手动绑定的表单对象
   */
  modelValue: {
    type: Object as PropType<E>,
    default: null,
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
  onChange: [value: E]
  change: [value: E]
  'update:modelValue': [value: E]
  blur: []
  onBlur: []
  focus: []
  onFocus: []
  onClear: []
  clear: []
}>()

if (!props.field) {
  throw new Error('field必传一个！！！')
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
const entityClass = (inject('entityClass') as ClassConstructor<E>) || props.entity

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
  formData!.value[props.field] = val
  emits('update:modelValue', formData!.value)
  emits('change', formData!.value)
  emits('onChange', formData!.value)
  if (injectFormData) {
    ;(injectFormData.value as IJson)[props.field] = val
  }
}
</script>
