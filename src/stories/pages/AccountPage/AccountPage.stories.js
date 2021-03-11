import React from 'react';
import { AccountPage } from './AccountPage';

/**
 * Example Component: Account Page
 */
export default {
  title: 'Example/Account Page',
  component: AccountPage,
};

const Template = (args) => {
  return <AccountPage {...args} />;
};

// Example Account PAge
export const Page = Template.bind({});
Page.args = {};
