import React from 'react';
import { message } from 'antd';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { useBeforeUpload } from '..';

describe('Import组件useBeforeUpload方法', () => {
  it('当文件过大', () => {
    const setUploading = jest.fn();
    const messageError = jest.spyOn(message, 'error');
    const props = { maxSize: 2000 };
    const file = { size: 10000 };
    const TestComponent = () => {
      const beforeUpload = useBeforeUpload(props, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => beforeUpload(file)).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(messageError).toBeCalledWith('文件过大');
    expect(setUploading).not.toBeCalled();
  });

  it('当不设置校验器时', () => {
    const setUploading = jest.fn();
    const messageError = jest.spyOn(message, 'error');
    messageError.mockReset();
    const props = { maxSize: 2000 };
    const file = { size: 1000 };
    const TestComponent = () => {
      const beforeUpload = useBeforeUpload(props, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => beforeUpload(file)).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(messageError).not.toBeCalled();
    expect(setUploading).toBeCalledWith(true);
  });

  it('当设置校验器且返回false时', () => {
    const validator = jest.fn(() => Promise.resolve(false));
    const setUploading = jest.fn();
    const messageError = jest.spyOn(message, 'error');
    messageError.mockReset();
    const props = { maxSize: 2000, validator };
    const file = { size: 1000 };
    const TestComponent = () => {
      const beforeUpload = useBeforeUpload(props, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => beforeUpload(file)).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(validator).toBeCalledWith(file);
  });

  it('当设置校验器抛出异常时', () => {
    const validator = jest.fn(() => Promise.reject('error'));
    const setUploading = jest.fn();
    const messageError = jest.spyOn(message, 'error');
    messageError.mockReset();
    const props = { maxSize: 2000, validator };
    const file = { size: 1000 };
    const TestComponent = () => {
      const beforeUpload = useBeforeUpload(props, setUploading);
      return (
        <button
          onClick={() => {
            expect(() => beforeUpload(file)).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
    expect(validator).toBeCalledWith(file);
    expect(validator).rejects.toEqual('error');
  });
});
