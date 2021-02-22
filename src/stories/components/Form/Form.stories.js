import React from 'react';
import { Form } from './Form';

/**
 * Example Component: Form
 */
export default {
    title: 'Example/Form',
    component: Form,
};

const Template = (args) => <Form {...args} />;

// Login Form
export const Login = Template.bind({});
Login.args = {
    formItems: [],
    type: 'login',
};

// SignUp Form
export const SignUp = Template.bind({});
SignUp.args = {
    formItems: [],
    type: 'signup',
};

// Custom Form
export const Custom = Template.bind({});
Custom.args = {
    formItems: [],
    type: 'default',
};

