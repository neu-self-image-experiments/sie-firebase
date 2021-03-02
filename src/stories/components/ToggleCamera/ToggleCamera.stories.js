import React from 'react';

import { ToggleCamera } from './ToggleCamera';

/**
 * Example Component: ToggleCamera
 */
export default {
  title: 'Example/ToggleCamera',
  component: ToggleCamera,
};

const Template = (args) =>
  <ToggleCamera {...args} />;

// Default image guidelines
export const Default = Template.bind({});
