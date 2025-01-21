/* eslint-disable no-use-before-define */
import { AirEntity } from '../base/AirEntity'
import { AirAbstractEntityService } from '../base/AirAbstractEntityService'
import { IUseTableOption } from '../interface/hooks/IUseTableOption'
import { IUseTableResult } from '../interface/hooks/IUseTableResult'
import { airTableHook } from './airTableHook'
import { AirI18n } from '../helper/AirI18n'
import { AirConfirm } from '../feedback/AirConfirm'
import { ClassConstructor } from '../type/AirType'
import { AirTableAction } from '../enum/AirTableAction'
import { AirEnum } from '../base/AirEnum'

/**
 * # 引入表格使用的`Hook`
 * @param entityClass 实体类
 * @param serviceClass 表格使用的`Service`类
 * @param option `可选` 更多配置
 * @author Hamm.cn
 */
export function useAirTable<E extends AirEntity, S extends AirAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseTableOption<E> = {}): IUseTableResult<E, S> {
  if (!option.actions) {
    option.actions = AirTableAction.toArray()
  }
  option.actions = option.actions.filter((item) => {
    switch (item.key) {
      case AirTableAction.ENABLE.key:
        return option.showEnable
      case AirTableAction.DISABLE.key:
        return option.showDisable
      case AirTableAction.DELETE.key:
        return !option.hideDelete
      case AirTableAction.EDIT.key:
        return !option.hideEdit
      default:
        return true
    }
  })

  const { onActionEvent } = option
  option.onActionEvent = async (action: AirEnum, bill: E) => {
    switch (action.key) {
      case AirTableAction.DELETE.key:
        await AirConfirm.show('删除提醒', '是否确认删除当前选择的数据？')
        onDelete(bill)
        break
      case AirTableAction.DISABLE.key:
        onDisable(bill)
        break
      case AirTableAction.ENABLE.key:
        onEnable(bill)
        break
      default:
        console.log('AirTable事件执行完毕')
        if (onActionEvent) {
          onActionEvent(action, bill)
        }
    }
  }
  /**
   * ### 表格`Hook`返回对象
   */
  const result = airTableHook(entityClass, serviceClass, option)

  /**
   * ### 表格行删除事件
   * @param row 行数据
   */
  async function onDelete(row: E) {
    await result.service.delete(row.id, AirI18n.get().DeleteSuccess || '删除成功')
    result.onGetList()
  }

  /**
   * ### 表格行禁用事件
   * @param row 行数据
   */
  async function onDisable(row: E) {
    await AirConfirm.show('禁用提醒', '是否确认禁用当前选择的数据？')
    await result.service.disable(row.id, AirI18n.get().DisableSuccess || '禁用成功')
    result.onGetList()
  }

  /**
   * ### 表格行启用事件
   * @param row 行数据
   */
  async function onEnable(row: E) {
    await AirConfirm.show('启用提醒', '是否确认启用当前选择的数据？')
    await result.service.enable(row.id, AirI18n.get().EnableSuccess || '启用成功')
    result.onGetList()
  }

  async function onAction(row: E) {
    if (!option.actions) {
      return
    }
    let { actions } = option
    actions = actions.filter((item) => !item.disabled).filter((item) => {
      console.log(row)

      switch (item.key) {
        case AirTableAction.DISABLE.key:
          return !row.isDisabled
        case AirTableAction.ENABLE.key:
          return row.isDisabled
        case AirTableAction.EDIT.key:
          return !row.isDisabled
        default:
      }
      return true
    })
    if (option.actionFilter) {
      // 如果传入了过滤函数，再过滤一遍
      actions = option.actionFilter(actions, row)
    }
    const res = await uni.showActionSheet({
      itemList: actions.map((item) => item.label),
    })
    const action = actions[res.tapIndex]
    option.onActionEvent?.(action, row)
  }

  return Object.assign(result, {
    onDelete,
    onDisable,
    onEnable,
    onAction,
  })
}
