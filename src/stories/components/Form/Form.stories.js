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


// Custom Form
export const CustomForm = Template.bind({});
CustomForm.args = {
    formItems: [
        'text',
        'email',
        'password',
        'date',
        'textarea',
    ],
    type: 'default',
    buttonText: 'Submit Form',
};

// Login Form
export const Login = Template.bind({});
Login.args = {
    type: 'login',
};

// Sign Up Form
export const SignUp = Template.bind({});
SignUp.args = {
    type: 'signup',
};


