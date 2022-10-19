import { Injectable, Inject } from '@nestjs/common'
import { createHash } from 'crypto'
import axios, { AxiosRequestConfig } from 'axios'

import { BAIDU_APP_OPTIONS } from './translate.constants'
import { ITranslateOptions, ITranslateApiConfig, ITranslateBaiduResponse } from './translate.interface'

@Injectable()
export class TranslateBaiduService {
  constructor(@Inject(BAIDU_APP_OPTIONS) private options: ITranslateOptions) {}
  private readonly server: string = 'https://fanyi-api.baidu.com'

  async request(config: AxiosRequestConfig) {
    config.url = this.server + config.url
    return await axios(config).then((res) => res.data)
  }

  /**
   * 获取随机串
   * @returns
   */
  getSalt(): string {
    return Date.now().toString()
  }

  /**
   * 获取参数签名
   * @param q
   * @param salt
   * @returns
   */
  getSign(q: string, salt: string): string {
    const { appid, secret } = this.options
    const dataString = [appid, q, salt, secret].join('')

    return createHash('md5').update(dataString).digest('hex')
  }

  /**
   * 拼接请求参数并返回完整的请求地址
   * @param config
   * @returns
   */
  getUrl(config: ITranslateApiConfig): string {
    const { q, from = 'auto', to = 'en' } = config
    const salt = this.getSalt()

    const data: Record<string, string> = {
      q,
      from,
      to,
      sign: this.getSign(config.q, salt),
      appid: this.options.appid,
      salt
    }
    return `/api/trans/vip/translate?${new URLSearchParams(data).toString()}`
  }

  /**
   * 百度翻译
   * @param config
   * @link https://fanyi-api.baidu.com/doc/21
   * @returns
   */
  async translate(config: ITranslateApiConfig): Promise<ITranslateBaiduResponse> {
    const url = this.getUrl(config)

    return await this.request({
      method: 'get',
      url
    })
  }
}
