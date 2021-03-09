import React from 'react';
import { Greeting } from './UserGreeting';

/**
 * Example Component: UserGreeting
 */
export default {
  title: 'Example/Greeting',
  component: Greeting,
};

const Template = (args) => <Greeting {...args} />;

export const Default = Template.bind({});
