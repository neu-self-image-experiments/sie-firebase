import React from 'react';
import { AddExperiment } from './AddExperiment';

/**
 * Example Component: Login
 */
export default {
  title: 'Example/AddExperiment',
  component: AddExperiment,
};

const Template = (args) => {
  return (
    <AddExperiment {...args}/>
  );
};

// Default Add Experiment
export const Default = Template.bind({});
Default.args = {
  buttonText: 'Add New Experiment',
};
