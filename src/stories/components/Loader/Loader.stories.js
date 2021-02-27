import '../../../scss/styles.scss';

import React from 'react';
import { Loader } from './Loader';

/**
 * Example Component: Loader
 */
export default {
  title: 'Example/Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

// Default loader
export const Default = Template.bind({});
Default.args = {
  text: 'Your photo is being processed...',
};
