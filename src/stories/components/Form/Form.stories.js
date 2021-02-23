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
        {
            type: 'text',
            label: 'Sample Text Field',
            placeholder: 'Placeholder 1',
            value: 'Value 1',
        },
        {
            type: 'textarea',
            label: 'Sample Textarea Field',
            value: 'Value 2',
        },
        {
            type: 'select',
            label: 'Sample Select Field',
            options: [
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4',
            ],
            value: 'Value 1',
        },
        {
            label: 'Sample Date Field',
            type: 'date',
            value: '1992-06-20',
        },
        {
            type: 'text',
            label: 'Sample Text Field without Label',
            placeholder: 'Sample Text Field without Label',
            showLabel: true,
            value: 'Value 1',
        },
    ],
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


