import React from 'react';

import { MainMenu } from './MainMenu';

/**
 * Example Component: MainMenu
 */
export default {
  title: 'Example/MainMenu',
  component: MainMenu,
};

const Template = (args) =>
  <div>
    <MainMenu {...args} />
  </div>;

// Default main menu
export const Default = Template.bind({});
