import React from 'react';
import { message } from 'antd';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import testMount from '../../../tests/testMount';
import Import, { download, useImportChangeHandle, blob2JSON } from '..';
import { Upload } from 'antd';

describe('📦  Import', () => {
  testMount(Import);

  it('component without children mounted correctly', () => {
    const wrapper = mount(<Import />);
    expect(wrapper.childAt(0).type()).toEqual(Upload);
    expect(wrapper.find('button').text()).toEqual('选择文件');
  });

  it('component with children mounted correctly', () => {
    const wrapper = mount(
      <Import>
        <button>test</button>
      </Import>,
    );
    expect(wrapper.childAt(0).type()).toEqual(Upload);
    expect(wrapper.find('button').text()).toEqual('test');
  });

  it('function download run successfully', () => {
    const url = 'https://static-platform.codemao.cn/luckycat/userIdModule.xlsx';
    const name = 'userIdModule.xlsx';
    expect(() => download(url, name)).not.toThrow();
  });

  it('function useImportChangeHandle run successfully when status of file is done with onFinish', () => {
    const onFinish = jest.fn();
    const setFileList = jest.fn();
    const setUploading = jest.fn();

    const file = {
      name: 'test',
      status: 'done',
      response: new Blob([JSON.stringify({ name: 'test' })], { type: 'application/json' }),
    };
    const fileList = [file];
    const props = {
      onFinish,
      autoDownload: true,
    };
    const TestComponent = () => {
      const importChangeHandle = useImportChangeHandle(props, setFileList, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => importChangeHandle({ file, fileList })).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(setUploading).toBeCalledWith(false);
    expect(setFileList).toBeCalled();
    // expect(onFinish).toBeCalled();
  });

  it('function useImportChangeHandle run successfully when status of file is done without onFinish', () => {
    const setFileList = jest.fn();
    const setUploading = jest.fn();
    const messageSuccess = jest.spyOn(message, 'success');
    const file = {
      name: 'test',
      status: 'done',
      response: new Blob([JSON.stringify({ name: 'test' })], { type: 'application/json' }),
    };
    const fileList = [file];
    const props = {};
    const TestComponent = () => {
      const importChangeHandle = useImportChangeHandle(props, setFileList, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => importChangeHandle({ file, fileList })).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(setUploading).toBeCalledWith(false);
    expect(setFileList).toBeCalled();
    expect(messageSuccess).toBeCalledWith('导入成功');
  });

  it('function useImportChangeHandle run successfully when status of file is error(blob)', () => {
    const setFileList = jest.fn();
    const setUploading = jest.fn();
    const messageError = jest.spyOn(message, 'error');
    const file = {
      name: 'test',
      status: 'error',
      error: 'error',
    };
    const fileList = [file];
    const props = {};
    const TestComponent = () => {
      const importChangeHandle = useImportChangeHandle(props, setFileList, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => importChangeHandle({ file, fileList })).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(setUploading).toBeCalledWith(false);
    expect(setFileList).toBeCalled();
    expect(messageError).toBeCalledWith('导入失败');
  });

  it('function useImportChangeHandle run successfully when status of file is error(string)', () => {
    global.URL.createObjectURL = jest.fn(() => 'testUrl');
    global.URL.revokeObjectURL = jest.fn();
    const setFileList = jest.fn();
    const setUploading = jest.fn();

    const file = {
      name: 'test',
      status: 'error',
      error: new Blob([JSON.stringify({ name: 'test' })], { type: 'application/json' }),
    };
    const fileList = [file];
    const props = {
      autoDownload: true,
    };
    const TestComponent = () => {
      const importChangeHandle = useImportChangeHandle(props, setFileList, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => importChangeHandle({ file, fileList })).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(setUploading).toBeCalledWith(false);
    expect(setFileList).toBeCalled();
  });

  // it ('function blob2JSON run successfully', async () => {
  //   // const obj = { name: 'test'};
  //   // const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
  //   // expect(() => blob2JSON(blob)).not.toThrow();
  //   // await expect(blob2JSON(blob)).resolves.toEqual(expect.objectContaining(obj));
  // });
});
