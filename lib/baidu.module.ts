import { DynamicModule, Module } from '@nestjs/common'

import { ITranslateOptions, ITranslateAsyncOptions } from './translate.interface'
import { BAIDU_APP_OPTIONS } from './translate.constants'
import { TranslateBaiduService } from './baidu.service'

@Module({})
export class TranslateBaiduModule {
  public static forRoot(options: ITranslateOptions): DynamicModule {
    return {
      module: TranslateBaiduModule,
      providers: [
        {
          provide: BAIDU_APP_OPTIONS,
          useValue: options
        },
        TranslateBaiduService
      ],
      exports: [TranslateBaiduService]
    }
  }

  public static forRootAsync(options: ITranslateAsyncOptions): DynamicModule {
    return {
      module: TranslateBaiduModule,
      imports: options.imports || [],
      providers: [this.createAsyncOptions(options), TranslateBaiduService],
      exports: [TranslateBaiduService]
    }
  }

  private static createAsyncOptions = (options: ITranslateAsyncOptions) => ({
    provide: BAIDU_APP_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject
  })
}
