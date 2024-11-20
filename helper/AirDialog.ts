import { App, Component, createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { AirExportModel } from '../model/AirExportModel'
import { AUpload } from '../component'
import ExportView from '../component/toolbar/Export.vue'
import { IUploadProps } from '../interface/props/IUploadProps'
import { IFile } from '../interface/IFile'
import { AirEntity } from '../base/AirEntity'
import { IJson } from '../interface/IJson'
import { AirStore } from '../store/AirStore'
import { AirConstant } from '../config/AirConstant'

/**
 * # 弹窗助手类
 * @author Hamm.cn
 */
export class AirDialog {
  /**
   * ## 当前对话框 `ID`
   */
  public static currentDialogId = 0

  /**
   * ## 已弹出的 `ID` 数组
   */
  public static dialogIdList: number[] = []

  /**
   * ## 弹出对话框的内部方法
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param param 弹窗参数 将传入到合并到 `props` 上
   */
  static async build<T>(view: Component, param: IJson): Promise<T> {
    const parentNode = document.createElement('div')
    const domId = `dialog_${Math.random()}`
    parentNode.setAttribute(AirConstant.ID, domId)
    let app: App<Element> | undefined

    // 卸载dom的方法
    const unmount = () => {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
        this.dialogIdList.shift()
      }
    }
    return new Promise((resolve, reject) => {
      if (app) {
        return
      }

      const dialogParam = {
        onConfirm: (p: T) => {
          unmount()
          resolve(p)
        },
        onCallback: (result: IJson) => {
          reject(result)
        },
        onCancel: (error: IJson) => {
          unmount()
          reject(error)
        },
        ...param,
      }

      /**
       * 创建App实例
       */
      app = createApp(view, dialogParam)

      app.directive('tip', {
        mounted(el, binding) {
          el.addEventListener('mouseover', () => {
            if (binding.value) {
              AirStore().tooltipRef = el
              AirStore().tooltip = binding.value
            }
          })
        },
      })

      app.use(ElementPlus, { locale: zhCn })

      // 注册全局组件
      Object.keys(Icons)
        .forEach((key) => {
          if (app) {
            app.component(key, Icons[key as keyof typeof Icons])
          }
        })

      this.currentDialogId += 1
      this.dialogIdList.unshift(this.currentDialogId)
      document.body.appendChild(parentNode)
      // 挂载组件
      app.mount(parentNode)
    })
  }

  /**
   * ## 弹出一个弹窗
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param param `可选` 参数 将传入到目标对象的 `props.param` 参数上
   */
  static async show<T>(view: Component, param?: unknown): Promise<T> {
    return this.build<T>(view, {
      param,
    })
  }

  /**
   * ## 弹出上传文件对话框
   * @param config `可选` 上传自定义配置
   * @param customConfirm `可选` 自定义确认按钮回调方法
   */
  static async showUpload<F extends IFile>(config?: IUploadProps, customConfirm?: () => void): Promise<F> {
    return this.build<F>(AUpload, {
      onCustomConfirm: () => {
        if (customConfirm) {
          customConfirm()
        }
      },
      ...config,
    })
  }

  /**
   * ## 创建一个导出任务
   * @param exportModel `可选` 导出参数对象
   */
  static async createExportTask(exportModel: AirExportModel): Promise<unknown> {
    return this.show(ExportView, exportModel)
  }

  /**
   * ## 弹出一个单选选择器
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param param `可选` 普通参数 将传入到目标对象的 `props.param` 参数上
   */
  static async select<E extends AirEntity>(view: Component, param: E | undefined = undefined): Promise<E> {
    return this.build(view, {
      param,
    })
  }

  /**
   * ## 弹出一个多选选择器
   * @param view 使用的视图组件 传入一个 `import` 的 `vue`
   * @param selectList `可选` 已选列表 将传入到目标对象的 `props.selectList` 参数上
   * @param param `可选` 普通参数 将传入到目标对象的 `props.param` 参数上
   */
  static async selectList<E extends AirEntity>(view: Component, selectList: E[] = [], param: E | undefined = undefined): Promise<E[]> {
    return this.build(view, {
      selectList,
      isMultiple: true,
      param,
    })
  }
}
