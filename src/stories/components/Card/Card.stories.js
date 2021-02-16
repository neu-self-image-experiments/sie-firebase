import React from 'react';
import { Card } from './Card';

/**
 * Example Component: Card
 */
export default {
    title: 'Example/Card',
    component: Card,
};

const Template = (args) => <Card {...args} />;

// Deafult Card
export const Primary = Template.bind({});
Primary.args = {
    modifierClasses: '',
};
