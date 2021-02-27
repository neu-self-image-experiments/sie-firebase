import React from 'react';
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
    <Login {...args} />
  );
};

// Dark Login
export const Dark = Template.bind({});
Dark.args = {
  modifierClasses: '',
};
