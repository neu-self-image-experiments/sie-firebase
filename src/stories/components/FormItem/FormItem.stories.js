import React from 'react';
import { FormItem } from './FormItem';

/**
 * Example Component: Form Item
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

// Textarea Form Item
export const Textarea = Template.bind({});
Textarea.args = {
  label: 'Textarea',
  type: 'textarea',
};

// Select Form Item
export const Select = Template.bind({});
Select.args = {
  label: 'Select Dropdown',
  type: 'select',
  options: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
  ],
};
