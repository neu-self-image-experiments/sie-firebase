import React from 'react';
import { Constrain } from './Constrain';

/**
 * Example Component: Constrain
 */
export default {
  title: 'Example/Constrain',
  component: Constrain,
};

const Template = (args) => {
  return (
    <Constrain {...args}>
      <h3>This is a section title</h3>
      <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
            has illud rationibus et. Prima ridens sit te, nam idque explicari
            expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
            per, probo populo nec ad. At vel consetetur moderatius, duo possim
            iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
            Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
            quo no sanctus eloquentiam.</p>
      <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
            has illud rationibus et. Prima ridens sit te, nam idque explicari
            expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
            per, probo populo nec ad. At vel consetetur moderatius, duo possim
            iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
            Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
            quo no sanctus eloquentiam.</p>
    </Constrain>
  );
};

// Default Constrain
export const Default = Template.bind({});
Default.args = {
  modifierClasses: '',
};

// Wide Constrain
export const Wide = Template.bind({});
Wide.args = {
  modifierClasses: 'constrain--wide',
};

// Small Constrain
export const Small = Template.bind({});
Small.args = {
  modifierClasses: 'constrain--narrow',
};
