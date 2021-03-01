import React from 'react';
import { WebcamControls } from './WebcamControls';

/**
 * Example Component: WebcamControls
 */
export default {
  title: 'Example/WebcamControls',
  component: WebcamControls,
};

const Template = (args) => <WebcamControls {...args} />;

// Default web controls
export const Default = Template.bind({});
