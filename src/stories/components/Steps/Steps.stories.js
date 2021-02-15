import React from 'react';
import { Steps } from './Steps';

/**
 * Example Component: Steps
 */
export default {
    title: 'Example/Steps',
    component: Steps,
};

const Template = (args) => <Steps {...args} />;

// Sample steps
export const Default = Template.bind({});
Default.args = {
    totalSteps: 4,
    currentStep: 0,
    goToStep: 1,
};
