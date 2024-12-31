import { AirConstant } from '../config/AirConstant'
import { ITree } from '../interface/ITree'

/**
 * # 树结构工具类
 * @author Hamm.cn
 */
export class AirTree {
  /**
   * ### 平树列表转层级树列表
   * @param list 平树列表
   * @param parentId 父级ID
   * @returns 层级树列表
   */
  static list2treeList<E extends ITree>(list: E[], parentId: number | null = 0): E[] {
    const treeList = list.filter((item) => item.parentId === parentId)
    for (let i = 0; i < treeList.length; i += 1) {
      treeList[i].children = this.list2treeList(list, treeList[i].id)
    }
    return treeList
  }

  /**
   * ### 层级树列表转平树列表
   * @param treeList 层级树列表
   * @returns 平树列表
   */
  static treeList2List<E extends ITree>(treeList: E[]): E[] {
    const list: E[] = []
    treeList.forEach((item) => {
      const i = item.copy()
        .exclude(AirConstant.CHILDREN)
      list.push(i)
      if (item.children && item.children.length > 0) {
        list.push(...this.treeList2List(item.children))
      }
    })
    return list
  }
}
