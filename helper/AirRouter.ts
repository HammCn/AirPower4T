import { AirConfig } from '../AirConfig'
import { AirNotification } from '../feedback/AirNotification'
import { IMenu } from '../interface/IMenu'
import { AirConsole } from './AirConsole'

const modules = import.meta.glob('../../view/**/*.vue')

/**
 * # Vue路由助手
 * @author Hamm
 */
export class AirRouter {
  /**
   * # 将AirMenu菜单列表初始化到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter [可选] 父级路由 默认 admin
   * @param menuCacheKey [可选] 缓存Key 默认 AirPowerMenuList
   */
  static initVueRouter(menuList: IMenu[], parentRouter = 'admin', menuCacheKey = 'AirPowerMenuList'): void {
    localStorage.setItem(menuCacheKey, JSON.stringify(menuList))
    if (!AirConfig.isTimeout) {
      this.addRouterAsync(menuList, parentRouter)
      this.reloadCacheMenuList(menuCacheKey)
    }
  }

  /**
   * # 将菜单添加到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter 父级路由名称
   */
  private static addRouterAsync(menuList: IMenu[], parentRouter: string): void {
    if (!AirConfig.router) {
      AirNotification.error('请先向AirConfig注入当前路由对象', '配置错误')
      return
    }
    menuList.forEach((item) => {
      if (!item.children || item.children.length === 0) {
        if (AirConfig.router) {
          if (!item.name || !item.path || !item.component) {
            AirConsole.error('路由初始化失败，缺少参数')
          } else {
            AirConfig.router.addRoute(parentRouter, {
              path: item.path,
              name: item.id.toString(),
              meta: {
                name: item.name,
              },
              component: modules[`../../view${item.component}.vue`],
            })
          }
        }
      } else {
        this.addRouterAsync(item.children, parentRouter)
      }
    })
  }

  /**
   * # 重载缓存中的路由
   * @param menuCacheKey 提供缓存的Key
   * @param menuList [可选]子菜单,好兄弟,你不用传。
   */
  private static reloadCacheMenuList(menuCacheKey: string, menuList?: IMenu[]): void {
    if (AirConfig.router) {
      if (!menuList && localStorage.getItem(menuCacheKey)) {
        menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]')
      }
      if (menuList === undefined) {
        return
      }
      for (const item of menuList) {
        if (item.children && item.children.length > 0) {
          this.reloadCacheMenuList(menuCacheKey, item.children)
        } else {
          // eslint-disable-next-line no-restricted-globals
          const locationPathName = location.pathname
          if (item.path === locationPathName) {
            localStorage.removeItem(menuCacheKey)
            AirConfig.router.replace(locationPathName)
            break
          }
        }
      }
    }
  }
}
