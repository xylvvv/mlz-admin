import { FC, ComponentProps } from 'react';
import { Upload } from 'antd';
import { ClientOptions, UploadParams } from '@cmao/cdn-uploader';
import { Extra, Config } from 'qiniu-js/src/upload/base';

type UploadProps = ComponentProps<typeof Upload>;

export type QnType = FC<
  Omit<UploadProps, 'customRequest' | 'action' | 'method' | 'headers' | 'withCredentials' | 'directory' | 'name'> & {
    clientOptions?: ClientOptions;
    uploadParams?: Omit<UploadParams<any>, 'onsuccess' | 'onerror' | 'onprogress'>;
    uploaderType?: 'cmao';
    putExtra?: Partial<Extra>;
    config?: Partial<Config>;
    mapResToParams?: (file: File, res?: any) => { token: string; key?: string | null };
    fetchToken?: (file: File) => Promise<any>;
  }
>;

export type UploadType = typeof Upload & { Qn: QnType };
