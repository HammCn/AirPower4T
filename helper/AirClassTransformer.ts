import { IRecord } from '../interface/IRecord'
import { ITree } from '../interface/ITree'
import { AirModel } from '../base/AirModel'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * # 转换类型助手
 * @author Hamm
 */
export class AirClassTransformer {
  /**
   * # 转换JSON数据到指定类的对象
   * @param json JSON
   * @param clazz 目标类
   */
  // eslint-disable-next-line class-methods-use-this
  static parse<T extends AirModel>(json: Record<string, unknown>, clazz: ClassConstructor<T>): T {
    // eslint-disable-next-line new-cap
    return AirModel.toModel(new clazz(), json)
  }

  /**
   * # 转换JSON数组数据到指定类的对象数组
   * @param jsonArray JSON数组
   * @param clazz 目标类
   */
  static parseArray<T extends AirModel>(jsonArray: Record<string, unknown>[], clazz: ClassConstructor<T>): T[] {
    return jsonArray.map((json) => this.parse(json, clazz))
  }

  /**
   * # 复制一个实例
   * @param from 来源类对象实例
   * @param to 目标类
   */
  static copy<F extends AirModel, M extends AirModel>(from: F, to: ClassConstructor<M>): M {
    return this.parse(from.toJson(), to)
  }

  /**
   * # 树实体转换到IRecord字典
   * @param tree 树
   */
  static tree2Record<E extends ITree>(tree: E): IRecord {
    let children: IRecord[] = []
    if (tree.children && tree.children.length > 0) {
      children = this.treeList2RecordList(tree.children)
    }
    return {
      key: tree.id,
      label: tree.name,
      children,
    } as IRecord
  }

  /**
   * # 树实体数组转换到IRecord字典数组
   * @param treeList
   */
  static treeList2RecordList<E extends ITree>(treeList: E[]): IRecord[] {
    const records: IRecord[] = []
    for (let i = 0; i < treeList.length; i += 1) {
      records.push(this.tree2Record(treeList[i]))
    }
    return records
  }

  /**
   * # 初始化一个指定类型的实例
   *
   * @param to 目标类
   */
  static newInstance<T extends AirModel>(clazz: ClassConstructor<T>): T {
    return this.parse({}, clazz)
  }
}
