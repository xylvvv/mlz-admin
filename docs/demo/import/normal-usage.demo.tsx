import React from 'react';
import { Import } from '@mlz/admin';

export default () => {
  return (
    <Import
      withCredentials={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      validator={(file) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('文件校验完成');
            resolve(true);
          }, 1000);
        });
      }}
      onFinish={console.log}
    />
  );
};
