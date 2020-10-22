import React from 'react';
import { message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from '@mlz/admin';
import axios from 'axios';

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
      mapResToParams={(file, res) => ({
        token: res.uptoken,
        key: file.name,
      })}
      fetchToken={() =>
        axios
          .post('https://service-81ozmkay-1252070958.gz.apigw.tencentcs.com/release/mock_redirect', {
            url: 'http://jssdk-v2.demo.qiniu.io/api/uptoken',
          })
          .then((res) => res.data)
          .then(JSON.parse)
      }>
      <Button>
        <UploadOutlined /> Click to Upload
      </Button>
    </Upload.Qn>
  );
};
