import React, { FC, memo, useState, useCallback } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadFile, UploadChangeParam, RcFile, RcCustomRequestOptions } from 'antd/lib/upload/interface';
import Icon from '../icon';
import { IImportProps } from './index.type';
import { forEach, pick } from 'lodash-es';

const acceptableProps = ['accept', 'action', 'data', 'withCredentials', 'headers', 'iconRender', 'name', 'progress', 'showUploadList'];

export const download = (url, name) => {
  const el = document.createElement('a');
  el.href = url;
  el.download = name;
  el.click();
  el.remove();
};

export const blob2JSON = (blob: Blob): Promise<Object> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function() {
      const { result } = this;
      const data = JSON.parse(result as string);
      resolve(data);
    };
    reader.readAsText(blob);
  });
};

export const useImportChangeHandle = (props: Partial<IImportProps>, setFileList, setUploading) => {
  const { onFinish, successText, autoDownload, errorText } = props;
  return useCallback(async (info: UploadChangeParam) => {
    const { fileList: list, file } = info;
    setFileList(list.slice(-1));

    if (file.status === 'done') {
      setUploading(false);

      if (!onFinish) {
        message.success(successText || '导入成功');
        return;
      }
      const data = await blob2JSON(file.response);
      onFinish(data);
    } else if (file.status === 'error') {
      if (file.error instanceof Blob) {
        if (autoDownload) {
          const url = URL.createObjectURL(file.error);
          download(url, '导入异常详情.xlsx');
          URL.revokeObjectURL(url);
        }
      } else {
        message.error(errorText || '导入失败');
      }
      setUploading(false);
    }
  }, []);
};

export const useBeforeUpload = (props: Partial<IImportProps>, setUploading) => {
  const { maxSize = 2 * 1024 * 1024, validator } = props;
  return useCallback(async (file: RcFile) => {
    if (file.size > maxSize) {
      message.error('文件过大');
      return Promise.reject();
    }

    setUploading(true);
    let result = true;
    if (validator) {
      try {
        result = await validator(file);
      } catch (e) {
        message.error(e);
        setUploading(false);
        return Promise.reject();
      }
    }

    if (!result) {
      message.error('文件校验失败');
      setUploading(false);
      return Promise.reject();
    }

    return Promise.resolve();
  }, []);
};

export const xhrImport = (options: RcCustomRequestOptions) => {
  const { action, headers, file, filename, withCredentials, onProgress, onError, onSuccess, data } = options;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  fd.append(filename, file);
  if (data && data instanceof Object) {
    forEach(data, (value, key) => {
      if (value && !(value instanceof Object)) {
        fd.append(key, String(value));
      }
    });
  }
  xhr.withCredentials = withCredentials;
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = e.loaded / e.total;
      onProgress({ percent }, file);
    }
  };
  xhr.responseType = 'blob';
  xhr.open('POST', action);
  forEach(headers, (value, key) => {
    xhr.setRequestHeader(key, value);
  });
  xhr.upload.onload = (e) => {
    onProgress({ percent: 100 }, file);
  };
  xhr.onload = () => {
    if (xhr.response.type.includes('application/json')) {
      onSuccess(xhr.response, file);
    } else {
      onError(xhr.response);
    }
  };
  xhr.onerror = () => {
    onError(new Error('导入失败'));
  };
  xhr.send(fd);
};

const Import: FC<IImportProps> = (props) => {
  const { children, successText, errorText, validator, maxSize = 2 * 1024 * 1024, autoDownload = true, onFinish, ...restProps } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const onChange = useImportChangeHandle(props, setFileList, setUploading);

  const beforeUpload = useBeforeUpload(props, setUploading);

  const customRequest = useCallback(xhrImport, []);

  return (
    <Upload
      accept=".xlsx,.xls,.csv"
      withCredentials
      {...pick(restProps, acceptableProps)}
      fileList={fileList}
      onChange={onChange}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      disabled={uploading}>
      {children || (
        <Button type="primary" loading={uploading}>
          <Icon type="upload_l" />
          选择文件
        </Button>
      )}
    </Upload>
  );
};

export default memo(Import);
