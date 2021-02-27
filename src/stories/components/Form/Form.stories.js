import React from 'react';
import { FormItem } from '../FormItem/FormItem';
import { Form } from './Form';

/**
 * Example Component: Form
 */
export default {
  title: 'Example/Form',
  component: Form,
};

const Template = (args) => <Form {...args}>
  <FormItem />
  <FormItem />
  <FormItem />
</Form>;

// Login Form
export const Default = Template.bind({});
Default.args = {
  type: 'login',
};
