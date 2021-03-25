import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';

/**
 * Example Component: Dashboard
 */
export default {
  title: 'Example/Dashboard',
  component: Dashboard,
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <Dashboard {...args} />
    </BrowserRouter>
  );
};

// Default Dashboard
export const Default = Template.bind({});
