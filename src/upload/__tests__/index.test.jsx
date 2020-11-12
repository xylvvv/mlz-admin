import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
// import { act } from 'react-dom/test-utils';
import testMount from '../../../tests/testMount';
import Upload from '..';

describe('📦  Upload', () => {
  testMount(Upload);
});

describe('Upload.Qn: upload by cmao', () => {
  const props = {
    clientOptions: {
      projectName: 'platform_authority_admin_frontend',
      env: 'dev',
    },
    uploaderType: 'cmao',
  };

  testMount(Upload.Qn, props);

  it('component mounted correctly', (done) => {
    const el = mount(
      <Upload.Qn {...props}>
        <button>test</button>
      </Upload.Qn>);
    expect(el.childAt(0).type()).toEqual(Upload);
    expect(el.find('button').text()).toEqual('test');
    done();
  });

  // it('upload successfully', (done) => {
  //   let callTimes = 0;
  //   const onChange = e => {
  //     const fileList = Array.isArray(e) ? e : e.fileList;
  //     const file = fileList[0];
  //
  //     callTimes += 1;
  //
  //     switch (callTimes) {
  //       case 1:
  //       case 2:
  //         expect(file).toEqual(expect.objectContaining({ status: 'uploading', percent: 0 }));
  //         break;
  //
  //       case 3:
  //         expect(file).toEqual(expect.objectContaining({ status: 'uploading', percent: 100 }));
  //         break;
  //
  //       case 4:
  //         expect(file).toEqual(expect.objectContaining({ status: 'done', percent: 100 }));
  //         break;
  //
  //       default:
  //       // Do nothing
  //     }
  //
  //     if (callTimes >= 4) {
  //       done();
  //     }
  //   };
  //   const el = mount(
  //     <Upload.Qn {...props} onChange={onChange}>
  //       <button>test</button>
  //     </Upload.Qn>);
  //   // act(() => {
  //   //   el.find('input').simulate('change', {
  //   //     target: {
  //   //       files: [{ file: 'foo.png' }],
  //   //     },
  //   //   });
  //   // });
  // });
});
