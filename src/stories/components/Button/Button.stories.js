import React from 'react';
import { Button } from './Button';

/**
 * Example Component: Button
 */
export default {
  title: 'Example/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

// Primary button
export const Primary = Template.bind({});
Primary.args = {
  modifierClasses: '',
  url: '#',
  text: 'Primary Button',
};

// Primary button small
export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  modifierClasses: 'button--small',
  url: '#',
  text: 'Primary Button',
};

// Secondary button
export const Secondary = Template.bind({});
Secondary.args = {
  modifierClasses: 'button--secondary',
  url: '#',
  text: 'Secondary Button',
};

// Secondary button small
export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  modifierClasses: 'button--secondary button--small',
  url: '#',
  text: 'Secondary Button',
};

// Tertiary button
export const Tertiary = Template.bind({});
Tertiary.args = {
  modifierClasses: 'button--tertiary',
  url: '#',
  text: 'Tertiary Button',
};

// Tertiary button small
export const TertiarySmall = Template.bind({});
TertiarySmall.args = {
  modifierClasses: 'button--tertiary button--small',
  url: '#',
  text: 'Tertiary Button',
};

// Quaternary button
export const Quaternary = Template.bind({});
Quaternary.args = {
  modifierClasses: 'button--quaternary',
  url: '#',
  text: 'Quaternary Button',
};

// Quaternary button small
export const QuaternarySmall = Template.bind({});
QuaternarySmall.args = {
  modifierClasses: 'button--quaternary button--small',
  url: '#',
  text: 'Quaternary Button',
};
