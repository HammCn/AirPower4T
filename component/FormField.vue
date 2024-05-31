<template>
  <el-form-item
    :label="entityInstance.getFormFieldLabel(field)"
    :prop="field"
  >
    <AInput
      v-model="modelValue[field]"
      :entity="entity"
      :model-modifiers="{ field }"
      :modifier="field"
    />
  </el-form-item>
</template>

<script setup lang="ts" generic="E extends AirEntity">
import { PropType, computed } from 'vue'
import { AirEntity } from '../base/AirEntity'
import { AirClassTransformer } from '../helper/AirClassTransformer'
import { ClassConstructor } from '../type/ClassConstructor'
import { AInput } from '.'

const props = defineProps({
  /**
   * # 实体类
   * ---
   * 传入表单内容的类型，如 `UserEntity`
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<E>>,
    required: true,
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

const entityInstance = computed(() => AirClassTransformer.newInstance(props.entity))
</script>
