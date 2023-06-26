import { defineStore } from 'pinia'

/**
 * # 全局状态管理器
 * @author Hamm
 */
export const AirStore = defineStore('AirStore', {
  state: () => ({
    /**
     * # 全局的ToolTip的Dom
     */
    tooltipRef: null,

    /**
     * # 全局的ToolTip内容
     */
    tooltip: '',

    /**
     * # 操作键被按下
     * ---
     * # ⌘ - ```macOS```
     * # Alt - ```Windows```
     */
    controllKeyDown: false,

    /**
     * # ESC被按下
     */
    escKeyDown: false,
  }),
})
