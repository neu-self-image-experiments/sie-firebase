import React from 'react';

import { Constrain } from '../../layouts/Constrain/Constrain';
import { WebcamControls } from './WebcamControls';

/**
 * Example Component: WebcamControls
 */
export default {
  title: 'Example/WebcamControls',
  component: WebcamControls,
};

const Template = (args) => <Constrain modifierClasses="constrain--narrow">
  <WebcamControls {...args} />
</Constrain>;

// Default web controls
export const Default = Template.bind({});
