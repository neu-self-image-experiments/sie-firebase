import React from 'react';

import { SplitGradient } from './SplitGradient';

/**
 * Example Component: SplitGradient
 */
export default {
  title: 'Example/SplitGradient',
  component: SplitGradient,
};

const Template = (args) => {
  return (
    <SplitGradient {...args} />
  );
};

// Dark SplitGradient
export const Dark = Template.bind({});
Dark.args = {
  modifierClasses: '',
  leftContent:
        <div>
          <h1>Section Title</h1>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat
            vel ad.</p>
        </div>,
  rightContent:
        <div>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
        </div>,
};

// Light SplitGradient
export const Light = Template.bind({});
Light.args = {
  modifierClasses: 'split-gradient--light',
  leftContent:
        <div>
          <h1>Section Title</h1>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat
            vel ad.</p>
        </div>,
  rightContent:
        <div>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
        </div>,
};
