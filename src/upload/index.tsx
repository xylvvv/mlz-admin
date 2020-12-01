import React, { useCallback, useRef, memo } from 'react';
import { Upload as AntdUpload } from 'antd';
import CDNClient from '@cmao/cdn-uploader';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';
import * as qiniu from 'qiniu-js';
import { QnType, UploadType, QnProps } from './index.type';

export const useUploader = (props: QnProps) => {
  const { uploadParams, mapResToParams, fetchToken, putExtra, config, clientOptions, uploaderType } = props;
  const client = useRef<CDNClient | null>(!!clientOptions && uploaderType === 'cmao' ? new CDNClient(clientOptions) : null).current;
  return useCallback<(options: RcCustomRequestOptions) => void>(async (options) => {
    const { file, onSuccess, onProgress, onError } = options;
    // 编程猫内部上传
    if (client) {
      const uploader = await client.create(file, {
        type: 'normal',
        filename: file.name,
        ...uploadParams,
        onerror: onError,
        onsuccess: (result) => onSuccess(result, file),
        onprogress: (ev: any) => onProgress(ev?.total, file),
      });
      uploader?.start();
    } else if (mapResToParams) {
      // 七牛SDK上传
      const res = await fetchToken?.(file);
      const { token, key } = mapResToParams(file, res);

      const observable = qiniu.upload(file, key, token, putExtra, config);
      observable.subscribe({
        error: onError,
        next: (res) => onProgress(res?.total, file),
        complete: (res) => onSuccess(res, file),
      });
    }
  }, []);
};

const QnUploader: QnType = memo((props) => {
  const { children, clientOptions, uploadParams, uploaderType, putExtra, config, mapResToParams, fetchToken, ...rest } = props;
  const customRequest = useUploader(props);

  return (
    <AntdUpload {...rest} customRequest={customRequest}>
      {children}
    </AntdUpload>
  );
});

const Upload: UploadType = Object.defineProperty(AntdUpload, 'Qn', {
  value: QnUploader,
  writable: false,
  enumerable: false,
  configurable: false,
});

export default Upload;
