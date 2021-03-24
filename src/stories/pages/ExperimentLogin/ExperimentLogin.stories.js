import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ExperimentLogin } from './ExperimentLogin';

/**
 * Example Component: ExperimentLogin
 */
export default {
  title: 'Example/ExperimentLogin',
  component: ExperimentLogin,
};
const Template = (args) => {
  return (
    <MemoryRouter>
      <ExperimentLogin />
    </MemoryRouter>
  );
};

// Default ExperimentLogin
export const Default = Template.bind({});
