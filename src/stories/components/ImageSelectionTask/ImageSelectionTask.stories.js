import React from 'react';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { ImageSelectionTask } from './ImageSelectionTask';

/**
 * Example Component: ImageSelectionTask
 */
export default {
  title: 'Example/ImageSelectionTask',
  component: ImageSelectionTask,
};

const Template = (args) =>
  <Constrain>
    <ImageSelectionTask {...args} />
  </Constrain>;

// Deafult Consent Form
export const Default = Template.bind({});
Default.args = {
  url: '#',
};
