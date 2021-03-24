import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { MainMenu } from './MainMenu';

/**
 * Example Component: MainMenu
 */
export default {
  title: 'Example/MainMenu',
  component: MainMenu,
};

const Template = (args) =>
  <MemoryRouter>
    <MainMenu {...args} />
  </MemoryRouter>;

// Default main menu
export const Default = Template.bind({});
