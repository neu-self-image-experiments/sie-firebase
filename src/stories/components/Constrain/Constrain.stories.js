import React from 'react';
import '../../../scss/styles.scss';
import { Constrain } from './Constrain';

/**
 * Example Component: Constrain
 */
export default {
    title: 'Example/Constrain',
    component: Constrain,
};

const Template = (args) => {
    return (
        <Constrain {...args} />
    );
};

// Default Constrain
export const Default = Template.bind({});
Default.args = {
    modifierClasses: '',
    content: <div><h3>This is a Default Constrain</h3>
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p>
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p></div>,
};

// Wde Constrain
export const Wide = Template.bind({});
Wide.args = {
    modifierClasses: 'constrain--wide',
    content: <div><h3>This is a Wide Constrain</h3>
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p>
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p></div>,
};

// Small Constrain
export const Small = Template.bind({});
Small.args = {
    modifierClasses: 'constrain--small',
    content: <div><h3>This is a Small Constrain</h3>
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p>
        <p>Lorem ipsum dolor sit amet, an has summo iriure epicuri,
        has illud rationibus et. Prima ridens sit te, nam idque explicari
        expetendis in. An mei adolescens mnesarchum, ei periculis adipiscing
        per, probo populo nec ad. At vel consetetur moderatius, duo possim
        iriure iracundia ea. Eam mazim efficiantur delicatissimi ei.
        Duo at ornatus omnesque conclusionemque, ullum periculis in mei,
        quo no sanctus eloquentiam.</p></div>,
};
