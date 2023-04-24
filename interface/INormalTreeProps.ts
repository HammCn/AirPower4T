import { ITreeProps } from './ITreeProps'

/**
 * # 标准树控件配置项
 * @author Hamm
 */
export interface INormalTreeProps extends ITreeProps {
  /**
   * # 用于显示到树控件上的 key
   */
  label?: string;
}
