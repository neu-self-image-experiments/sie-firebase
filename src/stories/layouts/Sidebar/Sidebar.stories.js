import React from 'react';

import { Sidebar } from './Sidebar';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Example Component: Sidebar
 */
export default {
  title: 'Example/Sidebar',
  component: Sidebar,
};

const Template = (args) => {
  return (
    <Constrain>
      <Sidebar {...args} />
    </Constrain>
  );
};

// Left Sidebar
export const LeftSidebar = Template.bind({});
LeftSidebar.args = {
  modifierClasses: '',
  leftContent:
        <div>
          <h3>Left Sidebar</h3>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat
            vel ad.</p>
        </div>,
  rightContent:
        <div>
          <h3>Main Content</h3>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
        </div>,
};

// Right Sidebar
export const RightSidebar = Template.bind({});
RightSidebar.args = {
  modifierClasses: 'sidebar--reverse',
  leftContent:
        <div>
          <h3>Main Content</h3>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.
            Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
        </div>,
  rightContent:
        <div>
          <h3>Right Sidebar</h3>
          <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat
            vel ad.</p>
        </div>,
};
