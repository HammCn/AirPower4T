import {
  RouteRecordRaw, Router, createRouter, createWebHistory,
} from 'vue-router'
import { AirConfig } from '../config/AirConfig'
import AirEvent from '../event/AirEvent'
import { AirEventType } from '../event/AirEventType'
import { AirNotification } from '../feedback/AirNotification'
import { IMenu } from '../interface/IMenu'
import { AirConsole } from './AirConsole'

const modules = import.meta.glob('../../view/**/*.vue')

/**
 * # `Vue` 路由助手
 * @author Hamm.cn
 */
export class AirRouter {
  /**
   * ### 当前路由
   */
  static router: Router

  /**
   * ### 将 `AirMenu` 菜单列表初始化到 `Vue` 路由中
   * @param menuList 菜单列表
   * @param parentRouter `可选` 父级路由 默认 `admin`
   * @param menuCacheKey `可选` 缓存Key 默认 `AirPowerMenuList`
   */
  static initVueRouter(menuList: IMenu[], parentRouter = 'admin', menuCacheKey = 'AirPowerMenuList'): void {
    localStorage.setItem(menuCacheKey, JSON.stringify(menuList))
    if (!AirConfig.isTimeout) {
      this.addRouterAsync(menuList, parentRouter)
      this.reloadCacheMenuList(menuCacheKey)
    }
  }

  /**
   * ### 将菜单添加到 `Vue` 路由中
   * @param menuList 菜单列表
   * @param parentRouter 父级路由名称
   */
  private static addRouterAsync(menuList: IMenu[], parentRouter: string): void {
    menuList.forEach((item) => {
      if (item.children && item.children.length > 0) {
        this.addRouterAsync(item.children, parentRouter)
        return
      }
      if (!this.router) {
        AirNotification.error('请先向AirConfig注入当前路由对象', '配置错误')
        return
      }
      if (!item.name || (!item.path && !item.component)) {
        AirConsole.error('路由初始化失败，缺少参数')
        return
      }
      if (this.router.hasRoute(item.id.toString())) {
        return
      }
      this.router.addRoute(parentRouter, {
        path: item.path,
        name: item.id.toString(),
        meta: {
          name: item.name,
        },
        component: modules[`../../view${item.component || item.path}.vue`],
      })
    })
  }

  /**
   * ### 重载缓存中的路由
   * @param menuCacheKey 提供缓存的Key
   * @param menuList `可选 子菜单,好兄弟,你不用传`
   */
  private static reloadCacheMenuList(menuCacheKey: string, menuList?: IMenu[]): void {
    if (!this.router) {
      return
    }
    if (!menuList && localStorage.getItem(menuCacheKey)) {
      menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]')
    }
    if (menuList === undefined) {
      return
    }
    for (const item of menuList) {
      if (item.children && item.children.length > 0) {
        this.reloadCacheMenuList(menuCacheKey, item.children)
        // eslint-disable-next-line no-continue
        continue
      }
      const locationPathName = window.location.pathname
      if (item.path === locationPathName) {
        localStorage.removeItem(menuCacheKey)
        this.router.replace(locationPathName + window.location.search)
        break
      }
    }
  }

  /**
   * ### 创建 `Vue` 路由实例
   * @param routes 路由配置文件
   * @param ignoreGuard 不使用守卫
   */
  static createRouter(routes: RouteRecordRaw[], ignoreGuard = false): Router {
    // 创建路由
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })
    router.afterEach(() => {
      window.scrollTo(0, 0)
    })
    if (!ignoreGuard) {
      router.beforeEach((to, _, next) => {
        if (to.meta.name || to.name) {
          window.document.title = `${to.meta.name || to.name} - ${AirConfig.product}` || AirConfig.product
        }
        next()
      })
    }
    this.router = router

    AirEvent.on(AirEventType.UNAUTHORIZED, () => {
      this.router.replace('/login')
    })

    return router
  }
}
