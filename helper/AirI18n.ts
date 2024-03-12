import { AirLanguage } from '../enum/AirLanguage'

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
export class AirI18n {
  private static readonly languageCacheKey = 'air-language'

  /**
   * # 语言名称
   */
  language = (localStorage.getItem(AirI18n.languageCacheKey) || AirLanguage.ChineseSimplified) as AirLanguage

  // ! 以下是内置的文案

  // todo

  // ! 以下是静态方法
  /**
   * # 当前使用的语言
   */
  private static currentLanguage = (localStorage.getItem(AirI18n.languageCacheKey) || AirLanguage.ChineseSimplified) as AirLanguage

  /**
   * # 语言列表
   */
  // eslint-disable-next-line no-use-before-define
  private static languages: AirI18n[]

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
   * @param key 字符串
   * @returns 翻译后的字符串
   */
  protected static get(): AirI18n {
    const lang = this.languages.find((item) => item.language === this.currentLanguage)
    if (lang) {
      return lang
    }
    throw new Error('语言包不存在')
  }

  /**
   * # 初始化国际化语言包
   * @param languages 语言包列表
   */
  static init(...languages: AirI18n[]): void {
    if (languages.length > 0) {
      this.languages = languages
    }
  }

  /**
   * # 设置当前使用的语言
   * @param language 语言
   */
  static setCurrentLanguage(language: AirLanguage): void {
    this.currentLanguage = language
    localStorage.setItem(AirI18n.languageCacheKey, language)
  }
}
