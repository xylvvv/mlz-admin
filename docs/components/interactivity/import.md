# Import 导入

### 基本使用

<code src="./../../demo/import/normal-usage.demo.tsx" />

### API

| 参数            | 说明                                               | 类型                                                        | 默认值                              | 版本 |
| --------------- | -------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------- | ---- |
| accept          | 接受上传的文件类型                                 | string                                                      | ".xlsx,.xls,.csv"                   |      |
| action          | 上传的地址                                         | string \| (file) =\> Promise                                | -                                   |      |
| data            | 上传所需额外参数或返回上传额外参数的方法           | object\|(file) =\> object \| Promise<object\>               | -                                   |      |
| withCredentials | 上传请求时是否携带 cookie                          | boolean                                                     | true                                |      |
| headers         | 设置上传的请求头部                                 | object                                                      | -                                   |      |
| iconRender      | 自定义显示 icon                                    | (file: UploadFile, listType?: UploadListType) =\> ReactNode | -                                   |      |
| name            | 发到后台的文件参数名                               | string                                                      | file                                |      |
| progress        | 自定义进度条样式                                   | ProgressProps（仅支持 type="line"）                         | { strokeWidth: 2, showInfo: false } |      |
| showUploadList  | 是否展示文件列表                                   | 同 Upload 组件                                              | true                                |      |
| successText     | 导入成功后的提示文字                               | string                                                      | 导入成功                            |      |
| errorText       | 导入失败且响应类型为 JSON 时提示文字               | string                                                      | 导入失败                            |      |
| validator       | 导入前对文件进行校验，失败则终止后续导入行为       | (file) =\> Promise<boolean\> \| boolean                     | -                                   |      |
| maxSize         | 文件大小的上限，单位 B                             | number                                                      | 2 \* 1024 \* 1024                   |      |
| autoDownload    | 导入失败且响应类型为文件时是否自动下载异常详情文件 | boolean                                                     | true                                |      |
| onFinish        | 导入成功后对响应结果进行处理                       | (response) =\> void                                         | -                                   |      |
