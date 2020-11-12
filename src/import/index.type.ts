import { UploadProps } from 'antd/lib/upload';

type PickedUploadProps = Pick<UploadProps,
  'accept' |
  'action' |
  'data' |
  'withCredentials' |
  'headers' |
  'iconRender' |
  'name' |
  'progress' |
  'showUploadList'>;

export interface IImportProps extends PickedUploadProps {
    successText?: string;
    errorText?: string;
    validator?: (file) => Promise<boolean> | boolean;
    maxSize?: number;
    autoDownload?: boolean;
    onFinish?: (data: Record<string, any>) => void;
}
