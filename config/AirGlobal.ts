/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars,func-names,no-extend-native,no-unused-vars */
import { AirColor } from '../enum/AirColor'
import { IRecord } from '../interface/IRecord'

/**
 * # 一些全局使用的扩展方法
 * @author Hamm
 */
declare global {
  interface Window {
    airConfig(): void
  }
  interface Array<T> {
    /**
     * # 获取```IRecord```用于显示的 ```Label```
     * @param key 参数值
     * @param defaultValue [可选]默认值
     */
    getLabel(key: string | number | boolean, defaultLabel?: string): string;

    /**
     * # 获取```IRecord```用于显示的 ```Color```
     * @param key 参数值
     * @param defaultColor [可选]默认值
     */
    getColor(key: string | number | boolean, defaultColor?: string): string;
  }
}

Array.prototype.getLabel = function (this: IRecord[], key: string | number | boolean, defaultLabel = '-'): string {
  const item = this.find((item) => item.key === key)
  if (item && item.label) {
    return item.label
  }
  return defaultLabel
}

Array.prototype.getColor = function (this: IRecord[], key: string | number | boolean, defaultColor = AirColor.NORMAL): string {
  const item = this.find((item) => item.key === key)
  if (item && item.color) {
    return item.color
  }
  return defaultColor
}
