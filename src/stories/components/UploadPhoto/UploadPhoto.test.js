import React from 'react';

import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Webcam from 'react-webcam';
import { UploadPhoto } from './UploadPhoto';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { StaticRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

// UploadPhoto test suite
describe('<UploadPhoto />', () => {
  // Mock react-router-dom `useParams()` hook
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      experimentId: 'expId',
      participantId: 'partId',
    }),
  }));

  const mockphotoUploadCompletionHandler = jest.fn((value) => value);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <StaticRouter>
        <UploadPhoto
          photoUploadCompletionHandler={mockphotoUploadCompletionHandler}/>
      </StaticRouter>);
    expect(wrapper.find('.toggle-camera__icon')).toBeTruthy();
    expect(wrapper.find(<ImageGuidelines />)).toBeTruthy();
  });

  it('should not include webcam on initial rendering', () => {
    const wrapper = mount(
      <StaticRouter>
        <UploadPhoto
          photoUploadCompletionHandler={mockphotoUploadCompletionHandler}/>
      </StaticRouter>);
    expect(wrapper.contains(<Webcam />)).toBe(false);
  });
});
