/**
 * # 字段配置接口
 * @author Hamm
 */
export interface IFieldConfig {
  /**
   * #  字段标题
   * ! 此字段无需传入, 将自动从被标记类的属性上读取
   * @deprecated
   */
  key?: string;

  /**
   * # 字段标题
   * 如传入 则将覆盖 ```@FieldName``` 的声明
   *
   * 实体可通过 ```.getFormFieldLabel()``` 方法获取 ```@FormField()```装饰器中的这个配置
   */
  label?: string;
}
