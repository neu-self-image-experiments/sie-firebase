import React from 'react';
import { Footer } from './Footer';

/**
 * Example Component: Sidebar
 */
export default {
  title: 'Example/Footer',
  component: Footer,
};

const Template = (args) => {
  return (
    <Footer {...args} />
  );
};

// Default Footer
export const Default = Template.bind({});
Default.args = {
  modifierClasses: '',
  leftContent: 'Footer left content',
  rightContent: 'Footer right content',
};
