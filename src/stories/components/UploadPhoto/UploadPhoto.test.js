import React from 'react';

import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Webcam from 'react-webcam';
import { UploadPhoto } from './UploadPhoto';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';

configure({ adapter: new Adapter() });


// UploadPhoto test suite
describe('<UploadPhoto />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<UploadPhoto />);
    expect(wrapper.find('.toggle-camera__icon')).toBeTruthy();
    expect(wrapper.find(<ImageGuidelines />)).toBeTruthy();
  });

  it('should not include webcam on initial rendering', () => {
    const wrapper = mount(<UploadPhoto />);
    expect(wrapper.contains(<Webcam />)).toBe(false);
  });
});
