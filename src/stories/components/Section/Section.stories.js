import React from 'react';
import { Section } from './Section';

/**
 * Example Component: Section
 */
export default {
  title: 'Example/Section',
  component: Section,
};

const Template = (args) => <Section {...args} />;

// Deafult Section
export const Default = Template.bind({});
Default.args = {
  modifierClasses: '',
  titleEl: '',
  title: 'Default Paragraph',
  content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat.',
};

// Medium Section
export const Medium = Template.bind({});
Medium.args = {
  modifierClasses: 'section--medium',
  titleEl: '',
  title: 'Medium Paragraph',
  content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat.',
};

// Large Section
export const Large = Template.bind({});
Large.args = {
  modifierClasses: 'section--large',
  titleEl: '',
  title: 'Large Paragraph',
  content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat.',
};
