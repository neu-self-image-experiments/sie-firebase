import React from 'react';
import { Teaser } from './Teaser';

/**
 * Example Component: Teaser
 */
export default {
  title: 'Example/Teaser',
  component: Teaser,
};

const Template = (args) => <Teaser {...args} />;

// Dark line teaser
export const Dark = Template.bind({});
Dark.args = {
  modifierClasses: '',
  url: '#',
  title: 'Title with a Dark Teal Line',
  text: 'Dark Teal Line',
};

// Light line teaser
export const Light = Template.bind({});
Light.args = {
  modifierClasses: 'teaser--light',
  url: '#',
  title: 'Title with a Teal Line',
  text: 'Teal line',
};

// Disabled teaser
export const Disabled = Template.bind({});
Disabled.args = {
  modifierClasses: 'teaser--disabled',
  url: '#',
  title: 'Title for a Disabled Teaser',
  text: 'Disabled Teaser',
};
