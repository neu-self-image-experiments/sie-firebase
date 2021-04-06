import React from 'react';
import { MemoryRouter } from 'react-router';
import { UploadPhoto } from './UploadPhoto';

const EXPERIMENT_ID = '9iG2wajKXkjLXiLQfwgj';
const PARTICIPANT_ID = '36qwRoyuSzcHzvCAapya4hrJBgQ2';

/**
 * Example Component: UploadPhoto
 */
export default {
  title: 'Example/UploadPhoto',
  component: UploadPhoto,
};

const Template = (args) => {
  return (
    <MemoryRouter initialEntries={[`/${EXPERIMENT_ID}/${PARTICIPANT_ID}`]}>
      <UploadPhoto {...args} />
    </MemoryRouter>
  );
};

// Default web controls
export const Default = Template.bind({});
