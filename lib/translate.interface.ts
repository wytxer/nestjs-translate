import { ModuleMetadata } from '@nestjs/common/interfaces'

export interface ITranslateOptions {
  appid: string
  secret: string
}

export interface ITranslateAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject: any[]
  useFactory: (...args: any[]) => ITranslateOptions
}

// todo 完整语种列表
type ILang =
  | 'zh'
  | 'en'
  | 'yue'
  | 'wyw'
  | 'jp'
  | 'kor'
  | 'fra'
  | 'spa'
  | 'th'
  | 'ara'
  | 'ru'
  | 'pt'
  | 'de'
  | 'it'
  | 'el'
  | 'nl'
  | 'pl'
  | 'bul'
  | 'est'
  | 'dan'
  | 'fin'
  | 'cs'
  | 'rom'
  | 'slo'
  | 'swe'
  | 'hu'
  | 'cht'
  | 'vie'

export interface ITranslateApiConfig {
  q: string
  from?: 'auto' | ILang
  to?: ILang
}

export interface ITranslateBaiduResponse {
  from: string
  to: string
  trans_result: {
    src: string
    dst: string
  }[]
}
