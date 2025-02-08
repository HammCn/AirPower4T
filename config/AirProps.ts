import { PropType } from 'vue'
import { AirEntity } from '../base/AirEntity'

/**
 * # 使用无参 `DialogProps` 配置
 * @author Hamm.cn
 */
export function airProps() {
  return {
    /**
     * ### 传入的回调事件ID
     */
    eventId: {
      // eslint-disable-next-line no-unused-vars
      type: String,
      default: '',
    },
  }
}

/**
 * ### 使用实体的 `DialogProps` 配置
 * - `P` Param的类型
 * @param value `可选` 默认参数
 */
export function airPropsParam<P>(value: P | null = null) {
  return Object.assign(airProps(), {
    /**
     * ### 父窗体弹出当前窗体时传入的参数
     */
    param: {
      type: Object as PropType<P>,
      default: value,
    },
  })
}

/**
 * ### 使用 `ID` 的 `DialogProps` 配置
 * 传入的 `param` 参数为 `Number` 类型的 `ID`
 */
export function airPropsId() {
  return airPropsParam<number>(0)
}

/**
 * ### 使用选择器的 `DialogProps` 配置
 * - `S`: `selectList` 参数的类型
 * - `P`: `param` 参数的类型(默认同 `selectList` 类型一致)
 *
 * @param param 选择器的参数
 */
export function airPropsSelector<
  S extends AirEntity, P extends AirEntity = S
>(param: P | null = null) {
  return Object.assign(airProps(), {
    /**
     * ### 是否使用多选
     */
    isMultiple: {
      type: Boolean,
      default: false,
    },

    /**
     * ### 已经选择了的实体列表数组
     * ! 仅在 `isMultiple` 为true时会有值
     * 请放心使用ID属性, 其他的属性不一定有
     */
    selectList: {
      type: Array<S>,
      default: () => [],
    },

    /**
     * ### 传入参数为一个实体
     *
     * 能保证的是, 确实是一个实体的基类, 可以调用一些 `AirModel` 的方法
     *
     * ```typescript
     * AirClassTransformer.parse(props.param.toSourceObject(), UserEntity)
     * ```
     */
    param: {
      type: Object as PropType<P>,
      default: param,
    },
  })
}
