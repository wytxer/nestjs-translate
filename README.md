# NESTJS TRANSLATE

基于 Nest 封装的翻译 API，目前支持百度翻译和有道翻译，持续更新中。


## 使用

导入模块：

```ts
import { TranslateBaiduModule } from 'nest-translate'

@Module({
  imports: [
    TranslateBaiduModule.forRoot({ appid: '', secret: '' })
  ]
})
```

使用：

```ts
import { TranslateBaiduService } from 'nest-translate'

@Injectable()
export class UserService {
  constructor(private readonly translateBaiduService: TranslateBaiduService) {}
}
```

当成工具类使用：

```ts
import { TranslateBaiduService } from 'nest-translate'

const translate = new TranslateBaiduService({ appid: '', secret: '' })
```


## 使用文档

- [百度通用翻译 API 接入文档](https://api.fanyi.baidu.com/doc/21)
- [有道云文本翻译服务](https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html)


## License

[MIT](/LICENSE)
