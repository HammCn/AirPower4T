import { AirAny } from './AirType'

/**
 * # 类包装
 * @author Hamm.cn
 */
export type ClassConstructor<T = AirAny> = {
  // eslint-disable-next-line no-unused-vars
  new(...args: AirAny[]): T;
};
