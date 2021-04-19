import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Logout } from './Logout';

/**
 * Example Component: Logout
 */
export default {
  title: 'Example/Logout',
  component: Logout,
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <Logout {...args} />
    </BrowserRouter>
  );
};

// Default Logout
export const Default = Template.bind({});
