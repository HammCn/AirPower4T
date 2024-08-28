/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * # 类包装
 * @author Hamm.cn
 */
export type ClassConstructor<T = any> = {
  new(...args: any[]): T;
};
