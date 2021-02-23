import React from 'react';
import { DataCard } from './DataCard';

/**
 * Example Component: Data Card
 */
export default {
    title: 'Example/Card',
    component: Card,
};

const Template = (args) => (
    <DataCard>
        <div>
            <h2>48</h2>
            <p>Days Left</p>
        </div>
    </DataCard>
);

// Deafult Card
export const Teal = Template.bind({});
Teal.args = {
    modifierClasses: 'card--teal',
    title: 'EXPERIMENT TIMELINE',
    description: 'Time left before the experiment closes',
};
