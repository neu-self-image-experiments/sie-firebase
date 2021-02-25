import React from 'react';
import { Card } from './Card';

/**
 * Example Component: Card
 */
export default {
  title: 'Example/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

// Deafult Card
export const Primary = Template.bind({});
Primary.args = {
  modifierClasses: 'card--active',
  title: 'Mental Representations of Self',
  body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat.',
  opened: '02-17-2020',
  admin: 'Carlo Mutuc',
  researchers: 'Adrienne Slaughter, Tara Dennehy',
};

export const Inactive = Template.bind({});
Inactive.args = {
  modifierClasses: 'card--inactive',
  title: 'Mental Representations of Self',
  body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat.',
  opened: '02-17-2020',
  admin: 'Carlo Mutuc',
  researchers: 'Adrienne Slaughter, Tara Dennehy',
};

export const Teaser = Template.bind({});
Teaser.args = {
  modifierClasses: 'card--teaser',
  title: 'Mental Representations of Self',
  body:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
        'nisi ut aliquip ex ea commodo consequat.',
  opened: '02-17-2020',
  admin: 'Carlo Mutuc',
  researchers: 'Adrienne Slaughter, Tara Dennehy',
};
