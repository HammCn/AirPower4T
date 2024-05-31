<template>
  <el-form-item
    :label="entityInstance.getFormFieldLabel(field)"
    :prop="field"
  >
    <AInput
      v-model="modelValue[field]"
      :entity="entityClass"
      :model-modifiers="{ field }"
      :modifier="field"
    />
  </el-form-item>
</template>

<script setup lang="ts" generic="E extends AirEntity">
import { PropType, computed, inject } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { ClassConstructor } from '../type/ClassConstructor'
import { AInput } from '.'
import { AirNotification } from '../feedback/AirNotification'

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
   */
  field: {
    type: String,
    required: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelValue = defineModel<any>()

let entityClass = inject('entityClass') as ClassConstructor<E>

if (!entityClass) {
  AirNotification.error('未使用useAirEditor创建表单，注入实体类失败，请手动传入到AFormField的entity属性')
}

if (props.entity) {
  entityClass = props.entity
}

const entityInstance = computed(() => AirClassTransformer.newInstance(entityClass))
</script>
