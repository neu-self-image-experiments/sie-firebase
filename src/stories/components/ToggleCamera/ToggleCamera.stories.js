import React from 'react';

import { Constrain } from '../../layouts/Constrain/Constrain';
import { ToggleCamera } from './ToggleCamera';

/**
 * Example Component: ToggleCamera
 */
export default {
  title: 'Example/ToggleCamera',
  component: ToggleCamera,
};

const Template = (args) =>
  <Constrain modifierClasses="constrain--narrow">
    <ToggleCamera {...args} />
  </Constrain>;

// Default toggle camera
export const Default = Template.bind({});
