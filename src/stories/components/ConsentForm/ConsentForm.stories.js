import React from 'react';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { ConsentForm } from './ConsentForm';

/**
 * Example Component: ConsentForm
 */
export default {
  title: 'Example/ConsentForm',
  component: ConsentForm,
};

const Template = (args) =>
  <Constrain>
    <ConsentForm {...args} />;
  </Constrain>;

// Deafult Consent Form
export const Default = Template.bind({});
Default.args = {
  title: 'Default Paragraph',
  qualtricsForms: [
    'https://qwebsite.qualtrics.com/jfe/form/SV_6rmXNFKL5g9GSt7',
  ],
};
