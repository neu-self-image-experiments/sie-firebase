import React from 'react';
import { Main } from './Main';

/**
 * Example Component: Main
 */
export default {
  title: 'Example/Main',
  component: Main,
};

const Template = (args) => {
  return (
    <Main>
      <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
      has illud rationibus et. Prima ridens sit te, nam idque explicari
      expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
      per, probo populo nec ad. At vel consetetur moderatius, duo possim
      iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
      Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
      quo no sanctus eloquentiam.</p>
    </Main>
  );
};

// Default Main
export const Default = Template.bind({});
