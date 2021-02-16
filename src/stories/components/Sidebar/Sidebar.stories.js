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
    sidebarContent:
        <div>
            <div className="sidenav">
                <a href="#">Dashboard</a>
                <a href="#">Experiments</a>
                <a href="#">Reports</a>
                <a href="#">Analytics</a>
                <a href="#">Account</a>
                <a href="#">Logout</a>
            </div>
        </div>,
    mainContent:
        <div className="main">
            <h3>This is the page layout with sidebar on the left side</h3>
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
            quo no sanctus eloquentiam.</p>
        </div>,
};

// Right Sidebar
export const Right = Template.bind({});
Right.args = {
    modifierClasses: 'sidebar--right',
    sidebarContent:
        <div>
            <div className="sidenav">
                <a href="#">Dashboard</a>
                <a href="#">Experiments</a>
                <a href="#">Reports</a>
                <a href="#">Analytics</a>
                <a href="#">Account</a>
                <a href="#">Logout</a>
            </div>
        </div>,
    mainContent:
        <div className="main">
            <h3>This is the page layout with sidebar on the right side</h3>
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
            quo no sanctus eloquentiam.</p>
        </div>,
};
