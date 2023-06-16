/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { IRecord } from '../interface/IRecord'
import { AirModel } from '../model/AirModel'
import { ITree } from '../interface/ITree'

/**
 * # 转换类型助手
 * @author Hamm
 */
export class AirClassTransformer {
  /**
   * # 强制转换JSON原始对象到指定类的实例
   *
   * @param from 来源JSON对象
   * @param to 目标类
   */
  static parse<M>(from: Record<string, any>, to: ClassConstructor<M>): M {
    if (from instanceof Array) {
      return this.toModel({}, to)
    }
    return this.toModel(from, to)
  }

  /**
   * # 强制转换数据到指定的类型数组
   *
   * @param from 来源JSON对象数组
   * @param to 目标类
   */
  static parseArray<M>(from: Array<Record<string, any>>, to: ClassConstructor<M>): M[] {
    if (from instanceof Array) {
      return from.map((item) => this.toModel(item, to))
    }
    return []
  }

  /**
   * # 初始化一个指定类型的实例
   *
   * @param to 目标类
   */
  static newInstance<M>(to: ClassConstructor<M>): M {
    return this.toModel({}, to)
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
   * # 树实体转换到IRecord
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
   * # 树实体数组转换到IRecord数组
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
   * # 强制转换数据到指定的类型
   *
   * @param from 来源JSON对象
   * @param to 目标类
   */
  private static toModel<T>(from: Record<string, any>, to: ClassConstructor<T>): T {
    return plainToInstance(to, from, {
      // Expose/Exclude策略转换
      excludeExtraneousValues: true,
      // 自动隐式类型转换 貌似没什么用
      enableImplicitConversion: true,
      // 输出未匹配且含有默认值的字段
      exposeDefaultValues: true,
      // 输出undefined的字段
      exposeUnsetFields: true,
      // 关联对象自动转换
      enableCircularCheck: true,
    })
  }
}
