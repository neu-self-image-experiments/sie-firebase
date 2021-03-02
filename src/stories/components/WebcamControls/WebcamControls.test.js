import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils'

import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { WebcamControls } from './WebcamControls';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';

configure({ adapter: new Adapter() });


// WebcamControls test suite
describe('<WebcamControls />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<WebcamControls />);
    expect(wrapper.find('.toggle-camera__icon')).toBeTruthy();
    expect(wrapper.find(<ImageGuidelines />)).toBeTruthy();
  });

  it('should not include webcam on initial rendering', async () => {
    const wrapper = mount(<WebcamControls />);
    !expect(wrapper.find('.button--small')).toBeTruthy();
  });
});