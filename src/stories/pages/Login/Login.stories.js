import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';

/**
 * Example Component: Login
 */
export default {
  title: 'Example/Login',
  component: Login,
};

const Template = (args) => {
  return (
    <MemoryRouter>
      <Login {...args} />
    </MemoryRouter>
  );
};

// Dark Login
export const Dark = Template.bind({});
Dark.args = {
  isDarkTheme: true,
};

// Light Login
export const Light = Template.bind({});
Light.args = {
  isDarkTheme: false,
};
