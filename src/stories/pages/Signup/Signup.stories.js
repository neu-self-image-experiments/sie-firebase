import React from 'react';
import { Signup } from './Signup';

/**
 * Example Component: Signup
 */
export default {
  title: 'Example/Signup',
  component: Signup,
};

const Template = (args) => {
  return (
    <Signup {...args} />
  );
};

// Dark Signup
export const Dark = Template.bind({});
Dark.args = {
  isDarkTheme: true,
};

// Light Signup
export const Light = Template.bind({});
Light.args = {
  isDarkTheme: false,
};
