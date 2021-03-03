import React from 'react';

import { PhotoInstructions } from './PhotoInstructions';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Example Component: PhotoInstructions
 */
export default {
  title: 'Example/PhotoInstructions',
  component: PhotoInstructions,
};

const Template = (args) => <Constrain modifierClasses="constrain--narrow">
  <PhotoInstructions {...args} />
</Constrain>;

// Default web controls
export const Default = Template.bind({});
