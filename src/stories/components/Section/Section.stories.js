import React from 'react';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { Section } from './Section';

/**
 * Example Component: Section
 */
export default {
  title: 'Example/Section',
  component: Section,
};

const Template = (args) =>
  <Constrain>
    <Section {...args}>
      <p>Lorem ipsum dolor sit amet, ne eum iusto antiopam assentior,
        vix primis fuisset complectitur in. Per dolores mandamus
        concludaturque te, quo eruditi efficiendi id.</p>
    </Section>
  </Constrain>;

// Deafult Section
export const Default = Template.bind({});
Default.args = {
  modifierClasses: '',
  titleEl: '',
  title: 'Default Paragraph',
};

// Medium Section
export const Medium = Template.bind({});
Medium.args = {
  modifierClasses: 'section--medium',
  titleEl: '',
  title: 'Medium Paragraph',
};

// Large Section
export const Large = Template.bind({});
Large.args = {
  modifierClasses: 'section--large',
  titleEl: '',
  title: 'Large Paragraph',
};
