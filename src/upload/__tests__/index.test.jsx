import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import testMount from '../../../tests/testMount';
import Upload, { useUploader } from '..';

const testUseUploader = (desc, props) => {
  it(desc, (done) => {
    const Test = () => {
      const fn = useUploader(props);
      const file = new File(['foo'], 'foo.png', {
        type: 'image/png',
      });
      return (
        <button
          onClick={() => {
            expect(() => {
              fn({
                file,
                onSuccess: (res, f) => {
                  expect(f).toEqual(expect.objectContaining(file));
                  done();
                },
                onError: (err) => {
                  expect(err).toBeInstanceOf(Error);
                  done();
                },
                onProgress: (ev, f) => {
                  expect(ev.percent).toBeLessThanOrEqual(100);
                  expect(f).toEqual(expect.objectContaining(file));
                },
              });
            }).not.toThrow();
          }}>
          test
        </button>
      );
    };
    const wrapper = mount(<Test />);
    act(() => {
      wrapper.find('button').simulate('click');
    });
  });
};

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
      </Upload.Qn>,
    );
    expect(el.childAt(0).type()).toEqual(Upload);
    expect(el.find('button').text()).toEqual('test');
    expect(el.props()).toEqual(expect.objectContaining(props));
    done();
  });

  testUseUploader('upload by cmao', props);
});

describe('Upload.Qn: upload by qn', () => {
  const props1 = {
    mapResToParams: () => ({ token: 'token', key: 'key' }),
  };
  const props2 = {
    fetchToken: () => ({ uptoken: '123' }),
    mapResToParams: (file, res) => ({
      token: res.uptoken,
      key: file.name,
    }),
  };
  testUseUploader('props contains only mapResToParams', props1);
  testUseUploader('props contains both mapResToParams and fetchToken', props2);
});
