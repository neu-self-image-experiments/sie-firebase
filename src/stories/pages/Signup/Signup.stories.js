import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
    <MemoryRouter>
      <Signup {...args} />
    </MemoryRouter>
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
