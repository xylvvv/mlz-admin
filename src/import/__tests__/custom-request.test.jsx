import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { xhrImport } from '..';

describe('Import组件customRequest方法', () => {
  it('执行时不报错', (done) => {
    const onError = jest.fn();
    const onProgress = jest.fn();
    const onSuccess = jest.fn();
    const props = {
      file: { name: 'test' },
      filename: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onError: () => {
        onError();
        done();
      },
      onSuccess: () => {
        onSuccess();
        done();
      },
      onProgress,
      data: { name: 'test' },
      headers: { accept: '*/*' },
    };
    const TestComponent = () => {
      return (
        <button
          onClick={() => {
            expect(() => xhrImport(props)).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<TestComponent />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
  });
});
