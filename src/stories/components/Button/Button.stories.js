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

export const Primary = Template.bind({});
Primary.args = {
    modifierClasses: '',
    url: '#',
    text: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    modifierClasses: 'button--secondary',
    url: '#',
    text: 'Secondary Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    modifierClasses: 'button--tertiary',
    url: '#',
    text: 'Tertiary Button',
};
