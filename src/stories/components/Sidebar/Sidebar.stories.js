import React from 'react';
import '../../../scss/styles.scss';
import { Sidebar } from './Sidebar';

/**
 * Example Component: Sidebar
 */
export default {
    title: 'Example/Sidebar',
    component: Sidebar,
};

const Template = (args) => {
    return (
        <Sidebar {...args} />
    );
};

// Default Constrain
export const Default = Template.bind({});
Default.args = {
    modifierClasses: '',
    leftContent:
        <div>
            <h3>Left Content</h3>
        </div>,
    rightContent:
        <div>
            <h3>Right Content</h3>
        </div>,
};

// Right Sidebar
export const Right = Template.bind({});
Right.args = {
    modifierClasses: 'sidebar--right',
    leftContent:
        <div>
            <h3>Left Content</h3>
        </div>,
    rightContent:
        <div>
            <h3>Right Content</h3>
        </div>,
};
