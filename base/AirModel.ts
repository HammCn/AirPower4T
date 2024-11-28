/* eslint-disable no-continue */
import { AirConstant } from '../config/AirConstant'
import { AirFormFieldConfig } from '../config/AirFormFieldConfig'
import { AirSearchFieldConfig } from '../config/AirSearchFieldConfig'
import { AirTableFieldConfig } from '../config/AirTableFieldConfig'
import { getModelConfig } from '../decorator/Model'
import { getFormConfig, getFormConfigList } from '../decorator/FormField'
import { getFieldConfig, getToJson, getToModel } from '../decorator/Field'
import { getSearchConfigList } from '../decorator/SearchField'
import { getTableConfigList } from '../decorator/TableField'
import { IFieldConfig } from '../interface/decorators/IFieldConfig'
import { IJson } from '../interface/IJson'
import { IModelConfig } from '../interface/decorators/IModelConfig'
import { ClassConstructor } from '../type/AirType'

/**
 * # 模型超类
 * @author Hamm.cn
 */
export class AirModel {
  /**
   * ## 从 `JSON` 转换到当前类的对象
   * 会自动进行数据别名转换
   * @param json `JSON`
   */
  static fromJson<T extends AirModel>(this: ClassConstructor<T>, json: IJson = {}): T {
    const instance: T = (Object.assign(new this()) as T)
    return AirModel.parse<T>(instance, json)
  }

  /**
   * ## 从 `JSON` 数组转换到当前类的对象数组
   * 会自动进行数据别名转换
   * @param jsonArray `JSON`数组
   */
  static fromJsonArray<T extends AirModel>(this: ClassConstructor<T>, jsonArray: IJson | IJson[] = []): T[] {
    const instanceList: T[] = []
    if (Array.isArray(jsonArray)) {
      for (let i = 0; i < jsonArray.length; i += 1) {
        const instance: T = (Object.assign(new this()) as T)
        instanceList.push(AirModel.parse(instance, jsonArray[i]))
      }
    } else {
      const instance: T = (Object.assign(new this()) as T)
      instanceList.push(AirModel.parse(instance, jsonArray))
    }
    return instanceList
  }

  /**
   * ## 转换 `JSON` 为实体
   * 会自动进行数据别名转换
   * @param instance 实体
   * @param json `JSON`
   */
  static parse<T extends AirModel>(instance: T, json: IJson = {}): T {
    const fieldKeyList = Object.keys(instance)
    const modelConfig = getModelConfig(instance)
    for (const fieldKey of fieldKeyList) {
      const props = getFieldConfig(instance, fieldKey)
      let fieldData = json[
        (!props.ignorePrefix && modelConfig.fieldPrefix ? modelConfig.fieldPrefix : AirConstant.EMPTY_STRING)
        + (props.alias || fieldKey)]

      if (fieldData === undefined) {
        // 没有值尝试获取默认值
        fieldData = props.default
      }
      (instance as IJson)[fieldKey] = fieldData

      const toModelFunction = getToModel(instance, fieldKey)
      if (toModelFunction !== undefined) {
        // 标记了手动转换到模型的自定义方法
        try {
          (instance as IJson)[fieldKey] = toModelFunction(json as IJson)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('ToModel Function Error', e)
          continue
        }
      }
      const FieldTypeClass = props.type
      if (props.array) {
        // 是数组 循环转换
        const fieldValueList: IJson[] = []
        if (typeof fieldData === 'object' && Array.isArray(fieldData)) {
          for (let i = 0; i < fieldData.length; i += 1) {
            // 如果标记了类 需要递归处理
            if (FieldTypeClass) {
              fieldValueList[i] = this.parse(new FieldTypeClass() as AirModel, fieldData[i])
            }
          }
        }
        (instance as IJson)[fieldKey] = fieldValueList
        continue
      }
      if (props.default !== undefined && (fieldData === undefined || fieldData === null || fieldData === AirConstant.EMPTY_STRING)) {
        // 如果有默认值 则先给上默认值
        (instance as IJson)[fieldKey] = props.default
      }

      if (!FieldTypeClass || fieldData === undefined || fieldData === null) {
        // 属性值为非 undefined 和 null 时不转换
        continue
      }

      if (!FieldTypeClass) {
        // 无需强制转换
        continue
      }
      switch (FieldTypeClass.name) {
        case 'String':
          (instance as IJson)[fieldKey] = fieldData.toString()
          break
        case 'Number':
          // 强制转换为Number, 但如果不是标准的Number, 则忽略掉值
          (instance as IJson)[fieldKey] = (Number.isNaN(parseFloat(fieldData)) ? undefined : parseFloat(fieldData))
          break
        case 'Boolean':
          // 强制转换为布尔型
          (instance as IJson)[fieldKey] = !!fieldData
          break
        default:
          // 是对象 需要递归转换
          (instance as IJson)[fieldKey] = this.parse(new FieldTypeClass() as AirModel, fieldData)
      }
    }

    // 最后删除无用的数据
    for (const fieldKey of fieldKeyList) {
      const props = getFieldConfig(instance, fieldKey)
      const fieldAliasName = props.alias || fieldKey
      if (fieldAliasName === fieldKey) {
        continue
      }
      delete (instance as IJson)[fieldAliasName]
    }
    return instance
  }

  /**
   * ## 获取模型类配置项
   */
  static getModelConfig<M extends IModelConfig = IModelConfig>(): M {
    return this.newInstance()
      .getModelConfig<M>()
  }

  /**
   * ## 获取模型类的可阅读名字
   */
  static getModelName(): string {
    return this.newInstance().getModelName()
  }

  /**
   * ## 获取属性的可阅读名字
   * @param fieldKey 属性名
   */
  static getFieldName(fieldKey: string): string {
    return this.newInstance().getFieldName(fieldKey)
  }

  /**
   * ## 获取属性的配置
   * @param fieldKey 属性名
   * @returns 配置对象
   */
  static getFieldConfig<P extends IFieldConfig = IFieldConfig>(fieldKey: string): P {
    return this.newInstance()
      .getFieldConfig<P>(fieldKey)
  }

  /**
   * ## 创建一个当前类的实例
   * @param recoverBy `可选` 初始化用于覆盖对象实例的 `JSON`
   */
  // eslint-disable-next-line no-unused-vars
  static newInstance<T extends AirModel>(this: ClassConstructor<T>, recoverBy?: IJson): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance = (Object.assign(new this(), null)) as T
    if (recoverBy) {
      return instance.recoverBy(recoverBy)
    }
    return instance
  }

  /**
   * ## 获取表单配置的 `Label`
   *
   * 依次读取 `表单配置的label` > `@Field` > `fieldKey`
   * @param fieldKey 字段名
   */
  static getFormFieldLabel(fieldKey: string): string {
    return this.newInstance()
      .getFormFieldLabel(fieldKey)
  }

  /**
   * ## 获取表格字段的配置列表
   * @param fieldNameList 字段列表
   */
  static getTableFieldConfigList(...fieldNameList: string[]): AirTableFieldConfig[] {
    return this.newInstance()
      .getTableFieldConfigList(fieldNameList)
  }

  /**
   * ## 获取表单字段的配置列表
   * @param fieldNameList 字段列表
   */
  static getFormFieldConfigList(...fieldNameList: string[]): AirFormFieldConfig[] {
    return this.newInstance()
      .getFormFieldConfigList(fieldNameList)
  }

  /**
   * ## 获取搜索字段的配置列表
   * 如不传入参数 则默认取所有标记了注解的字段
   * @param fieldNameList `可选` 字段列表
   */
  static getSearchFieldConfigList(...fieldNameList: string[]): AirSearchFieldConfig[] {
    return this.newInstance()
      .getSearchFieldConfigList(fieldNameList)
  }

  /**
   * ## 获取属性的表单配置
   * @param fieldKey 属性名
   */
  static getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return this.newInstance()
      .getCustomFormFieldConfig(fieldKey)
  }

  /**
   * ## 将当前实例复制到一个新实例上
   */
  copy(): this {
    const newModel = Object.create(Object.getPrototypeOf(this))
    return Object.assign(newModel, this)
  }

  /**
   * ## 暴露部分类的字段
   * @param fields 字段列表
   */
  expose(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (!fields.includes(field)) {
        (this as IJson)[field] = undefined
      }
    }
    return this
  }

  /**
   * ## 排除部分类的字段
   * @param fields 字段列表
   */
  exclude(...fields: string[]): this {
    const fieldList = Object.keys(this)
    for (const field of fieldList) {
      if (fields.includes(field)) {
        (this as IJson)[field] = undefined
      }
    }
    return this
  }

  /**
   * ## 用指定的数据对当前实例进行覆盖
   * 相同字段才会覆盖上去
   * @param obj 覆盖对象
   */
  recoverBy(obj: IJson | AirModel): this {
    return Object.assign(this, obj)
  }

  /**
   * ## 转换到 `JSON`
   * 会自动进行数据别名转换
   */
  toJson(): IJson {
    const fieldKeyList = Object.keys(this)
    const modelConfig = getModelConfig(this)
    const json: IJson = {}
    for (const fieldKey of fieldKeyList) {
      const fieldData = (this as IJson)[fieldKey]
      if (fieldData === null || fieldData === undefined) {
        // 如果属性值为 null 或 undefined 则不转换到JSON
        continue
      }
      const fieldConfig = getFieldConfig(this, fieldKey)
      let fieldAliasName = fieldConfig.alias || fieldKey
      if (!fieldConfig.ignorePrefix && modelConfig.fieldPrefix) {
        // 按忽略前缀规则获取别名
        fieldAliasName = modelConfig.fieldPrefix + fieldAliasName
      }
      const toJsonFunction = getToJson(this, fieldKey)
      json[fieldAliasName || fieldKey] = fieldData

      if (toJsonFunction !== undefined) {
        // 如果标记了自定义转换JSON的方法
        try {
          json[fieldAliasName || fieldKey] = toJsonFunction(this)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('ToJson Function Error', e)
        }
        continue
      }
      if (typeof fieldData === 'object') {
        // 是数组 循环转换
        if (Array.isArray(fieldData)) {
          // 数组需要循环转换
          const jsonList: IJson[] = []
          for (let i = 0; i < fieldData.length; i += 1) {
            if (typeof fieldData[i] === 'object') {
              jsonList[i] = (fieldData[i] as AirModel).toJson()
              continue
            }
            jsonList[i] = (fieldData[i] as AirModel)
          }
          json[fieldAliasName || fieldKey] = jsonList
          continue
        }
        // 是对象 递归转换
        json[fieldAliasName || fieldKey] = (fieldData as AirModel).toJson()
      }
    }

    return json
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getModelConfig<M extends IModelConfig = IModelConfig>(): M {
    return getModelConfig<M>(this)
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getModelName(): string {
    return getModelConfig(this).label || this.constructor.name
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFieldConfig<P extends IFieldConfig = IFieldConfig>(fieldKey: string): P {
    return getFieldConfig<P>(this, fieldKey)
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFieldName(fieldKey: string): string {
    return getFieldConfig(this, fieldKey).label || fieldKey
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getCustomFormFieldConfig(fieldKey: string): AirFormFieldConfig | null {
    return { ...new AirFormFieldConfig(), ...getFormConfig(this, fieldKey) }
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFormFieldLabel(fieldKey: string): string {
    const props = getFieldConfig(this, fieldKey)
    return this.getCustomFormFieldConfig(fieldKey)?.label || props.label || fieldKey
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getTableFieldConfigList(fieldNameList: string[] = []): AirTableFieldConfig[] {
    return getTableConfigList(this, fieldNameList)
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getFormFieldConfigList(fieldNameList: string[] = []): AirFormFieldConfig[] {
    return getFormConfigList(this, fieldNameList)
  }

  /**
   * ## `请直接调用静态方法获取`
   * ! 内部使用的保留方法
   * @deprecated
   */
  getSearchFieldConfigList(fieldNameList: string[] = []): AirSearchFieldConfig[] {
    const configList = getSearchConfigList(this, fieldNameList)
    configList.sort((a, b) => b.orderNumber - a.orderNumber || 1)
    const queryParams: AirSearchFieldConfig[] = []
    for (const config of configList) {
      queryParams.push(config)
    }
    return queryParams
  }
}
