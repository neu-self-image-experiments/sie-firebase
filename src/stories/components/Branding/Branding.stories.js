import React from 'react';
import { Branding } from './Branding';

/**
 * Example Component: Branding
 */
export default {
  title: 'Example/Branding',
  component: Branding,
};

const Template = (args) => <Branding {...args} />;

// Default branding
export const Default = Template.bind({});
Default.args = {
  modifierClasses: '',
  text: 'SIE.',
};
