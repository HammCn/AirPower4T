import { AirApi } from '../config/AirApi'
import { AirLanguage } from '../enum/AirLanguage'
import { AirI18nDefault } from '../model/AirI18nDefault'

/**
 * # I18n工具库
 * ---
 * - 1. `AirI18n.init()` 初始化语言包
 * - 2. `AirI18n.setCurrentLanguage()` 设置当前使用的语言
 * - 3. `AirI18n.get()` 获取当前使用的语言包
 *
 * ## 💡 初始化语言包并设置语言
 * ```typescript
 * AirI18n.init(ChineseSimplified, English)
 * AirI18n.setCurrentLanguage(AirLanguage.ChineseSimplified)
 * ```
 * ---
 * 实现一个继承 `AirI18n` 的抽象类，加入抽象属性作为语言包的 `Key`, 并将此方法的 `get` 方法二次封装并转换数据类型后方便使用者调用
 * ```typescript
 * export abstract class Strings extends AirI18n {
 *  // 实现一个自定义获取方法，强制转为继承的类型 `String`
 *  static get(): Strings {
 *    return AirI18n.get() as Strings
 *  }
 *
 *  // 扩展更多的抽象属性作为语言包的 ·Key`
 *  abstract Hello_World: string
 * }
 * ```
 * @author Hamm
 */
export class AirI18n extends AirI18nDefault {
  /**
   * # 当前使用的语言
   */
  private static currentLanguage = (AirApi.getStorage(AirI18nDefault.languageCacheKey) || AirLanguage.ChineseSimplified) as AirLanguage

  /**
   * # 当前使用的语言包
   */
  // eslint-disable-next-line no-use-before-define
  private static currentLanguagePackage?: AirI18n

  /**
   * # 语言列表
   */
  // eslint-disable-next-line no-use-before-define
  private static languages: AirI18n[] = []

  /**
   * # 获取当前使用的语言
   * @returns 当前使用的语言
   */
  static getCurrentLanguage(): AirLanguage {
    return this.currentLanguage
  }

  /**
   * # 获取支持的语言列表
   * @returns 语言列表
   */
  static getLanguages() {
    return this.languages
  }

  /**
   * # 获取翻译后的字符串
   * @returns 翻译后的字符串
   * @deprecated
   */
  static get(): AirI18n {
    return this.currentLanguagePackage || new AirI18n()
  }

  /**
   * # 初始化国际化语言包
   * @param languages 语言包列表
   */
  static init(...languages: AirI18n[]): void {
    if (languages.length > 0) {
      this.languages = languages
      this.currentLanguagePackage = this.languages.find((item) => item.language === this.currentLanguage)
    }
  }

  /**
   * # 设置当前使用的语言
   * @param language 语言
   */
  static setCurrentLanguage(language: AirLanguage): void {
    this.currentLanguage = language
    this.currentLanguagePackage = this.languages.find((item) => item.language === this.currentLanguage)
<<<<<<< HEAD
    wx.setStorageSync(AirI18n.languageCacheKey, language)
=======
    AirApi.setStorage(AirI18n.languageCacheKey, language)
>>>>>>> web
  }
}
