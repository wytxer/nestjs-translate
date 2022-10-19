import { DynamicModule, Module } from '@nestjs/common'

import { ITranslateOptions, ITranslateAsyncOptions } from './translate.interface'
import { YOUDAO_APP_OPTIONS } from './translate.constants'
import { TranslateYoudaoService } from './youdao.service'

@Module({})
export class TranslateYoudaoModule {
  public static forRoot(options: ITranslateOptions): DynamicModule {
    return {
      module: TranslateYoudaoModule,
      providers: [
        {
          provide: YOUDAO_APP_OPTIONS,
          useValue: options
        },
        TranslateYoudaoService
      ],
      exports: [TranslateYoudaoService]
    }
  }

  public static forRootAsync(options: ITranslateAsyncOptions): DynamicModule {
    return {
      module: TranslateYoudaoModule,
      imports: options.imports || [],
      providers: [this.createAsyncOptions(options), TranslateYoudaoService],
      exports: [TranslateYoudaoService]
    }
  }

  private static createAsyncOptions = (options: ITranslateAsyncOptions) => ({
    provide: YOUDAO_APP_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject
  })
}
