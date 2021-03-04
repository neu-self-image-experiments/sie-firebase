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

// Parent Light Theme
export const ParentLightTheme = Template.bind({});
ParentLightTheme.args = {
  theme: 'light',
  buttonText: 'Add Experiment',
};

// Parent Dark Theme
export const ParentDarkTheme = Template.bind({});
ParentDarkTheme.args = {
  theme: 'dark',
  buttonText: 'Add Experiment',
};
