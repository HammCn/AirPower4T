import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'
import { AirConfig } from '../config/AirConfig'

/**
 * # 加解密和散列摘要算法助手类
 * @author Hamm.cn
 */
export class AirCrypto {
  /**
   * ## AES加密方法
   * @param data 加密数据
   * @param key 密钥
   * @param mode `可选` 加密方式 默认 `CBC`
   * @param padding `可选` 填充方式 默认 `Pkcs7`
   * @param iv `可选` 向量 默认 `AirConfig.aesCbcIvString`
   */
  static aesEncrypt(
    data: string,
    key: string,
    mode = CryptoJS.mode.CBC,
    padding = CryptoJS.pad.Pkcs7,
    iv = AirConfig.aesCbcIvString,
  ): string {
    return CryptoJS.AES.encrypt(
      data,
      CryptoJS.enc.Base64.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode,
        padding,
      },
    )
      .toString()
  }

  /**
   * ## AES解密方法
   * @param data 需要解密的数据
   * @param key 密钥
   * @param mode `可选` 加密方式 默认 `CBC`
   * @param padding `可选` 填充方式 默认 `Pkcs7`
   * @param iv `可选` 向量 默认 `AirConfig.aesCbcIvString`
   */
  static aesDecrypt(
    data: string,
    key: string,
    mode = CryptoJS.mode.CBC,
    padding = CryptoJS.pad.Pkcs7,
    iv = AirConfig.aesCbcIvString,
  ): string {
    return CryptoJS.AES.decrypt(
      data,
      CryptoJS.enc.Base64.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode,
        padding,
      },
    )
      .toString(CryptoJS.enc.Utf8)
  }

  /**
   * ## SHA1散列摘要
   * @param data 源字符串
   */
  static sha1(data: string): string {
    return CryptoJS.SHA1(data)
      .toString()
  }

  /**
   * ## MD5散列摘要
   * @param data 源字符串
   */
  static md5(data: string): string {
    return CryptoJS.MD5(data)
      .toString()
  }

  /**
   * ## Base64编码
   * @param data
   */
  static base64Encode(data: string): string {
    return Base64.encode(data)
  }

  /**
   * ## Base64解码
   * @param data
   */
  static base64Decode(data: string): string {
    return Base64.decode(data)
  }
}
