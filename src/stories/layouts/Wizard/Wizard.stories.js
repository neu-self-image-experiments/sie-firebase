import React from 'react';
import '../../../scss/styles.scss';
import { Wizard } from './Wizard';

/**
 * Example Component: Constrain
 */
export default {
    title: 'Example/Wizard',
    component: Wizard,
};

const Template = (args) => {
    return (
        <Wizard {...args} />
    );
};

export const Default = Template.bind({});

// Wizard const Default = Template.bind({});
Default.args = {};
