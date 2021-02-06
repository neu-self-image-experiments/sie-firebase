import React from 'react';
import { Button } from './Button';

/**
 * Example Component: Button
 */
export default {
    title: 'Example/Button',
    component: Button,
};

const Template = (args) => <Button {...args} />;

// Primary button
export const Primary = Template.bind({});
Primary.args = {
    modifierClasses: '',
    url: '#',
    text: 'Primary Button',
};

// Secondary button
export const Secondary = Template.bind({});
Secondary.args = {
    modifierClasses: 'button--secondary',
    url: '#',
    text: 'Secondary Button',
};

// Tertiary button
export const Tertiary = Template.bind({});
Tertiary.args = {
    modifierClasses: 'button--tertiary',
    url: '#',
    text: 'Tertiary Button',
};
