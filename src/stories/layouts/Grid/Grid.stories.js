import './styles.scss';

import React from 'react';
import { Grid } from './Grid';

/**
 * Example Layout: Grid
 */
export default {
    title: 'Example/Grid',
    layout: Grid,
};

const Template = (args) => (
    <Grid numColumns={args.numColumns}>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
        <div className="grid__item">
            <h1>Test</h1>
        </div>
    </Grid>
);

// Grid Layout no column input
export const NoColumnInput = Template.bind({});

// Grid Layout one column
export const OneColumn = Template.bind({});
OneColumn.args = {
    numColumns: 'grid--one',
};

// Grid Layout two columns
export const TwoColumn = Template.bind({});
TwoColumn.args = {
    numColumns: 'grid--two',
};

// Grid Layout three columns
export const ThreeColumn = Template.bind({});
ThreeColumn.args = {
    numColumns: 'grid--three',
};

// Grid Layout four columns
export const FourColumn = Template.bind({});
FourColumn.args = {
    numColumns: 'grid--four',
};
