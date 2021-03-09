import React from 'react';
import { Experiment } from './Experiment';

/**
 * Example Component: Experiment
 */
export default {
  title: 'Example/Experiment',
  component: Experiment,
};

const Template = (args) => {
  return (
    <Experiment {...args} />
  );
};

// Default
export const Default = Template.bind({});
Default.args = {
  title: 'Asian Americans\' Self-Representations',
};
