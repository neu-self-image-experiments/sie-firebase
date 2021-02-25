import React from 'react';
import { DataCard } from './DataCard';

/**
 * Example Component: Data Card
 */
export default {
  title: 'Example/DataCard',
  component: DataCard,
};

const Template = (args) => (
  <DataCard
    modifierClasses={args.modifierClasses}
    title={args.title}
    description={args.description}>
    <p>Data Goes Here</p>
  </DataCard>
);

// Teal Card
export const Teal = Template.bind({});
Teal.args = {
  modifierClasses: 'data-card__teal',
  title: 'EXPERIMENT TIMELINE',
  description: 'Time left before the experiment closes.',
};

// Teal Dark Card
export const TealDark = Template.bind({});
TealDark.args = {
  modifierClasses: 'data-card__teal-dark',
  title: 'EXPERIMENT TIMELINE',
  description: 'Time left before the experiment closes.',
};

// Teal Light Card
export const TealLight= Template.bind({});
TealLight.args = {
  modifierClasses: 'data-card__teal-light',
  title: 'EXPERIMENT TIMELINE',
  description: 'Time left before the experiment closes.',
};
