/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PropType } from 'vue'
import { AirEntity } from '../base/AirEntity'

/**
 * # 使用无参DialogProps配置
 * @author Hamm
 */
export function airProps() {
  return {
    /**
     * # 弹窗的确认按钮被点击事件
     * ---
     * ### 💡 如果给ADialog传入了form表单的ref实体对象, 则校验通过之后才会回调此方法
     */
    onConfirm: {
      type: Function,
      default: () => () => {
        // console.log('On Confirm')
      },
    },
    /**
     * # 弹窗的取消或关闭按钮被点击事件
     */
    onCancel: {
      type: Function,
      default: () => () => {
        // console.log('On Cancel')
      },
    },
  }
}

/**
 * # 使用实体的DialogProps配置
 * ---
 * ### 💡 [可选]泛型: Param的类型
 * @param value [可选]默认参数
 */
export function airPropsParam<P>(value: P | null = null) {
  return Object.assign(airProps(), {
    /**
     * # 支持一个传入参数
     */
    param: {
      type: Object as PropType<P>,
      default: value,
    },
  })
}

/**
 * # 使用ID的DialogProps配置
 * ---
 * ### 💡 传入的 ```param``` 参数为 ```Number``` 类型的ID
 */
export function airPropsId() {
  return airPropsParam<number>(0)
}

/**
 * # 使用选择器的DialogProps配置
   * ---
   * ### 💡 S: selectList参数的类型
   * ---
   * ### 💡 P: param参数的类型
 */
export function airPropsSelector<
  S extends AirEntity = AirEntity, P extends AirEntity = AirEntity
>(value: P | null = null) {
  return Object.assign(airProps(), {
    /**
     * # 是否使用多选
     */
    mult: {
      type: Boolean,
      default: false,
    },
    /**
     * # 已经选择了的实体列表数组
     * ! 仅在mult为true时会有值
     * 请放心使用ID属性, 其他的属性不一定有
     */
    selectList: {
      type: Array as PropType<S[]>,
      default: [] as PropType<S[]>,
    },
    /**
     * # 传入参数为一个实体
     *
     * 能保证的是, 确实是一个实体的基类, 可以调用一些AirModel的方法
     *
     * ```typescript
     * AirClassTransformer.parse(props.param.toSourceObject(), UserEntity)
     * ```
     */
    param: {
      type: Object as PropType<P>,
      default: value,
    },
  })
}
