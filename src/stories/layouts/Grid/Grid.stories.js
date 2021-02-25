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
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
    <div className="grid__item">
      <h3>Test</h3>
      <p>Lorem ipsum dolor sit amet, aliquip pertinax intellegebat vel ad.
            Quo diceret comprehensam id, mazim labore instructior et mea.</p>
    </div>
  </Grid>
);

// Grid Layout no column input
export const NoColumnInput = Template.bind({});

// Grid Layout one column
export const OneColumn = Template.bind({});
OneColumn.args = {
  numColumns: 1,
};

// Grid Layout two columns
export const TwoColumn = Template.bind({});
TwoColumn.args = {
  numColumns: 2,
};

// Grid Layout three columns
export const ThreeColumn = Template.bind({});
ThreeColumn.args = {
  numColumns: 3,
};

// Grid Layout four columns
export const FourColumn = Template.bind({});
FourColumn.args = {
  numColumns: 4,
};
