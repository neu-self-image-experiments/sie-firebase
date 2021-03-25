import React from 'react';
import { ExperimentsPage } from './ExperimentsPage';

/**
 * Example Component: ExperimentsPage
 */
export default {
  title: 'Example/ExperimentsPage',
  component: ExperimentsPage,
};

const Template = (args) => {
  return <ExperimentsPage {...args} />;
};

export const Page = Template.bind({});
