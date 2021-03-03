import React from 'react';

import { ImageGuidelines } from './ImageGuidelines';

/**
 * Example Component: ImageGuidelines
 */
export default {
  title: 'Example/ImageGuidelines',
  component: ImageGuidelines,
};

const Template = (args) =>
  <ImageGuidelines {...args} />;

// Default image guidelines
export const Default = Template.bind({});
