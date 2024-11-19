/**
 * # 属性字段接口
 * @author Hamm.cn
 */
export interface IField {
  /**
   * ## 字段标题
   * 此字段无需传入, 将自动从被标记类的属性上读取
   * @deprecated
   */
  key?: string;

  /**
   * ## 字段标题
   * ---
   * 优先级：`Field.label` > (`Table.label` = `Search.label` = `Form.label`) > `Key`
   */
  label?: string;
}
