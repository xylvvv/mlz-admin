# Upload 上传

**文件选择上传和拖拽上传控件。**

### 何时使用

**上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。**

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

### 基本使用

<code src="./../../demo/upload/normal-usage.demo.tsx" />

### 七牛云上传

#### 1. 七牛 SDK 上传

<code src="./../../demo/upload/qiniu.demo.tsx" />

#### 2. 编程猫内部上传

<code src="./../../demo/upload/cmao-uploader.demo.tsx" />

### API

#### 编程猫内部项目上传

| 参数          | 说明                           | 类型          | 默认值 | 版本 |
| ------------- | ------------------------------ | ------------- | ------ | ---- |
| uploaderType  | 编程猫内部项目固定使用值: cmao | string        | -      |      |
| clientOptions | CDN 配置                       | ClientOptions | -      |      |
| uploadParams  | 上传参数                       | UploadParams  | -      |      |

##### ClientOptions

| 名称        | 说明               | 类型                                   |
| ----------- | ------------------ | -------------------------------------- |
| projectName | 项目在 cmdb 的名称 | string                                 |
| env         | 项目环境           | 'dev' \| 'staging' \| 'prod' \| 'test' |
| region      | CDN 地域           | 'hd' \| 'hn'                           |

#### 七牛 SDK 上传

| 参数           | 说明                                             | 类型                                                                | 默认值 | 版本 |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------- | ------ | ---- |
| fetchToken     | 用于请求服务器接口获取 token 相关信息            | (file: File) =\> Promise<Record<string, string>\>                   | -      |      |
| mapResToParams | 通过 fetchToken 方法的返回值，得到实际需要的参数 | (file: File, res?: any) =\> { token: string; key?: string \| null } | -      |      |

fetchToken 用于通过 http 请求得到 token 相关内容，然后调用 mapResToParams 方法，通过 http 响应内容生成实际需要传递的参数（token 及 key，key 一般指文件名）。也可以不设置 fetchToken，仅通过 mapResToParams 方法自定义逻辑得到需要的 token 和 key。
