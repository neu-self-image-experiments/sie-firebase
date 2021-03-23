import React from 'react';

import { QualtricsEmbed } from './QualtricsEmbed';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Example Component: QualtricsEmbed
 */
export default {
  title: 'Example/QualtricsEmbed',
  component: QualtricsEmbed,
};

const Template = (args) => <Constrain modifierClasses="constrain--narrow">
  <QualtricsEmbed {...args} />
</Constrain>;

// Default Qualtrics embed
export const Default = Template.bind({});
Default.args = {
  url: 'https://neu.co1.qualtrics.com/jfe/form/SV_56LysMCx8JpZgWO',
};
