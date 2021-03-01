import React from 'react';
import { Footer } from './Footer';

/**
 * Example Component: Footer
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

// Dark Footer
export const Dark = Template.bind({});
Dark.args = {
  modifierClasses: '',
  leftContent: 'Footer left content',
  rightContent: 'Footer right content',
};

// Light Footer
export const Light = Template.bind({});
Light.args = {
  modifierClasses: 'footer--light',
  leftContent: 'Footer left content',
  rightContent: 'Footer right content',
};
