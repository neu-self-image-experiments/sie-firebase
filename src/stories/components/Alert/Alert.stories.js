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

// Success
export const Success = Template.bind({});
Success.args = {
    alertType: 'success',
    title: 'This is a success alert',
    text: 'Something went wrong and the page you requsted cannot be accessed.',
};

// Warning
export const Warning = Template.bind({});
Warning.args = {
    alertType: 'warning',
    title: 'This is a warning alert',
    text: 'Something went wrong and the page you requsted cannot be accessed.',
};

// Error
export const Error = Template.bind({});
Error.args = {
    alertType: 'error',
    title: 'This is an error alert',
    text: 'Something went wrong and the page you requsted cannot be accessed.',
};
