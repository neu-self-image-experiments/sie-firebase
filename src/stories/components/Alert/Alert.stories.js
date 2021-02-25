import '../../../scss/styles.scss';

import React from 'react';
import { Alert } from './Alert';

/**
 * Example Component: Alert
 */
export default {
  title: 'Example/Alert',
  component: Alert,
};

const Template = (args) => <Alert {...args} />;

// Success alert
export const Success = Template.bind({});
Success.args = {
  modifierClasses: 'success',
  title: 'Alert Component - SUCCESS',
  content: 'Lorem ipsum dolor sit amet, ea mediocrem inciderint nec,' +
        'delectus intellegat mea ne. Vim ne perfecto neglegentur ' +
        'philosophia. Decore laoreet expetenda eum ne.',
};

// Warning alert
export const Warning = Template.bind({});
Warning.args = {
  modifierClasses: 'warning',
  title: 'Alert Component - WARNING',
  content: 'Lorem ipsum dolor sit amet, ea mediocrem inciderint nec,' +
        'delectus intellegat mea ne. Vim ne perfecto neglegentur ' +
        'philosophia. Decore laoreet expetenda eum ne.',
};

// Error alert
export const Error = Template.bind({});
Error.args = {
  modifierClasses: 'error',
  title: 'Alert Component - ERROR',
  content: 'Lorem ipsum dolor sit amet, ea mediocrem inciderint nec,' +
        'delectus intellegat mea ne. Vim ne perfecto neglegentur ' +
        'philosophia. Decore laoreet expetenda eum ne.',
};
