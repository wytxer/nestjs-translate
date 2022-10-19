import { Injectable, Inject } from '@nestjs/common'
import { createHash } from 'crypto'
import axios, { AxiosRequestConfig } from 'axios'

import { YOUDAO_APP_OPTIONS } from './translate.constants'
import { ITranslateOptions, ITranslateApiConfig } from './translate.interface'

@Injectable()
export class TranslateYoudaoService {
  constructor(@Inject(YOUDAO_APP_OPTIONS) private options: ITranslateOptions) {}
  private readonly server: string = 'https://openapi.youdao.com'

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
  getSign(q: string, salt: string) {
    const { appid, secret } = this.options
    const input = q.length <= 20 ? q : `${q.slice(0, 10)}${q.length}${q.slice(-10)}`
    const dataString = [appid, input, salt, secret].join('')

    return createHash('md5').update(dataString).digest('hex')
  }

  /**
   * 拼接请求参数并返回完整的请求地址
   * @param config
   * @returns
   */
  getUrl(config: ITranslateApiConfig) {
    const { q, from = 'zh', to = 'en' } = config
    const salt = this.getSalt()

    const data = {
      q,
      from,
      to,
      sign: this.getSign(config.q, salt),
      appKey: this.options.appid,
      salt,
      signType: 'v3',
      curtime: Date.now().toString()
    }
    return `/api?${new URLSearchParams(data).toString()}`
  }

  /**
   * 有道云翻译
   * @param config
   * @doc https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html
   * @returns
   */
  // todo 返回值接口定义
  async translate(config: ITranslateApiConfig) {
    const url = this.getUrl(config)

    return await this.request({
      method: 'get',
      url
    })
  }
}
