<template>
  <template v-if="fieldList.length === 0">
    <el-form-item
      :label="entityInstance.getFormFieldLabel(field)"
      :prop="field"
    >
      <AInput
        v-model="formData[field]"
        :entity="entityClass"
        :model-modifiers="{ field }"
        :modifier="field"
        @change="onChange($event)"
        @blur="emits('blur'); emits('onBlur')"
        @focus="emits('focus'); emits('onFocus')"
        @clear="emits('clear'); emits('onClear');"
      />
    </el-form-item>
  </template>
  <template v-else>
    <AFormField
      v-for="item in fieldList"
      :key="item"
      :field="item"
      @blur="emits('blur'); emits('onBlur')"
      @focus="emits('focus'); emits('onFocus')"
      @clear="emits('clear'); emits('onClear');"
      @change="onChange($event)"
    />
  </template>
</template>

<script setup lang="ts" generic="E extends AirEntity">
import {
  PropType, Ref, computed, inject, ref,
} from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { ClassConstructor } from '../type/ClassConstructor'
import { AFormField, AInput } from '.'
import { IJson } from '../interface/IJson'

const props = defineProps({
  /**
   * # 实体类
   * ---
   * ### 💡 传入表单内容的类型，如传入则覆盖自动注入的类
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<E>>,
    default: null,
  },

  /**
   * # 字段的名称
   * ---
   * ### 💡 `field` 和 `fieldList` 必传一个
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
   * ---
   * ### 💡 `field` 和 `fieldList` 必传一个
   */
  fieldList: {
    type: Array<string>,
    default: () => [],
  },
})

const emits = defineEmits(['blur', 'onBlur', 'focus', 'onFocus', 'onChange', 'change', 'update:modelValue', 'onClear', 'clear'])

if (props.fieldList.length === 0 && !props.field) {
  throw new Error('field和fieldList必传一个！！！')
}

// 手动绑定的 v-model 覆盖 自动注入的表单对象
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = ref(props.modelValue || inject('formData')) as Ref<any>
if (!formData.value) {
  throw new Error('请手动为AFormField绑定v-model或使用useAirEditor创建表单对象(推荐)！！！')
}

// 手动传入的实体类 覆盖 自动注入的实体类
const entityClass = inject('entityClass') as ClassConstructor<E> || props.entity

if (!entityClass) {
  throw new Error('请手动传入到AFormField的entity属性或使用useAirEditor创建表单对象(推荐)！！！')
}

const entityInstance = computed(() => AirClassTransformer.newInstance(entityClass))

function emitValue() {
  emits('change', formData.value)
  emits('onChange', formData.value)
  emits('update:modelValue', formData.value)
}

function onChange(val: unknown) {
  (formData.value as IJson)[props.field] = val
  if (props.modelValue) {
    emitValue()
  }
}
</script>
