import React from 'react';
import { UserGreeting } from './UserGreeting';

/**
 * Example Component: UserGreeting
 */
export default {
  title: 'Example/User Greeting',
  component: UserGreeting,
};

const Template = (args) => <UserGreeting {...args} />;

export const Default = Template.bind({});
