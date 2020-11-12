import React from 'react';
import { Import } from '@mlz/admin';

export default () => {
  return (
    <Import
      withCredentials={false}
      action="//localhost:3000/upload"
      validator={file => {
        return new Promise((resolve => {
          setTimeout(() => {
            console.log('文件校验完成');
            resolve(true);
          }, 1000);
        }));
      }}
      onFinish={console.log}
    />
  );
};
