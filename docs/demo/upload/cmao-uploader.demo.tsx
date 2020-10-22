import React from 'react';
import { message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from '@mlz/admin';

export default () => {
  const props = {
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload.Qn
      {...props}
      clientOptions={{
        projectName: 'platform_authority_admin_frontend',
        env: 'dev',
      }}
      uploaderType="cmao">
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload.Qn>
  );
};
