import React from 'react';

import { UploadPhoto } from './UploadPhoto';

/**
 * Example Component: UploadPhoto
 */
export default {
  title: 'Example/UploadPhoto',
  component: UploadPhoto,
};

const Template = (args) => <UploadPhoto {...args} />;

// Default web controls
export const Default = Template.bind({});
