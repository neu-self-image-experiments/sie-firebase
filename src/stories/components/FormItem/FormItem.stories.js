import React from 'react';
import { FormItem } from './FormItem';

/**
 * Example Component: FormItem
 */
export default {
    title: 'Example/FormItem',
    component: FormItem,
};

const Template = (args) => <FormItem {...args} />;

// Textfield Form Item
export const Text = Template.bind({});
Text.args = {
    modifierClasses: '',
    label: 'Textfield',
    placeholder: 'Textfield',
};

// Email Form Item
export const Email = Template.bind({});
Email.args = {
    modifierClasses: '',
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
};

// Password Form Item
export const Password = Template.bind({});
Password.args = {
    modifierClasses: '',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
};

// Date Form Item
export const Date = Template.bind({});
Date.args = {
    modifierClasses: '',
    label: 'Date',
    type: 'date',
    placeholder: '',
    value: '1992-06-20',
};

// TextArea Form Item
export const TextArea = Template.bind({});
TextArea.args = {
    label: 'Textarea',
    type: 'textarea',
};
