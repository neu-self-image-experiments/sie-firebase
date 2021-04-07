import React from 'react';
import { ScreenTakeover } from './ScreenTakeover';

/**
 * Example Component: ScreenTakeover
 */
export default {
  title: 'Example/ScreenTakeover',
  component: ScreenTakeover,
};

const Template = (args) => {
  return (
    <ScreenTakeover {...args}>
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
    </ScreenTakeover>
  );
};

// Default ScreenTakeover
export const Default = Template.bind({});
Default.args = {
  isHidden: false,
};
