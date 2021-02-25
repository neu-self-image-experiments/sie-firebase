import React from 'react';
import '../../../scss/styles.scss';
import { HorizontalTitle } from './HorizontalTitle';

/**
 * Example Component: HorizontalTitle
 */
export default {
  title: 'Example/HorizontalTitle',
  component: HorizontalTitle,
};

const Template = (args) => {
  return (
    <HorizontalTitle {...args} />
  );
};

// Default HorizontalTitle
export const Default = Template.bind({});
Default.args = {
  modifierClasses: '',
  eyebrow: 'Eyebrow',
  title: 'Default',
  content:
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam</p>,
};

// Medium paragraph
export const Medium = Template.bind({});
Medium.args = {
  modifierClasses: 'horizontal-title--medium',
  eyebrow: 'Eyebrow',
  title: 'Medium',
  content:
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p>,
};

// Large paragraph
export const Large = Template.bind({});
Large.args = {
  modifierClasses: 'horizontal-title--large',
  eyebrow: 'Eyebrow',
  title: 'Large',
  content:
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p>,
};
