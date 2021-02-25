import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for grid layout element.
 *
 * @param {node} children of the component
 * @param {number} numColumns number of columns in layout.
 * @return {object} (
 *   <Grid numColumns={numColumns}>
 *      {children}
 *    </Grid>
 * )
 */

export const Grid = ({ children, numColumns }) => {
  const modifierClass = numColumns ? `grid--${numColumns}-col` : '';

  return (
    <div className={['grid', modifierClass].join(' ').trim()}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  /**
   * Grid's children
   */
  children: PropTypes.node,
  /**
   * Grid's number of columns
   */
  numColumns: PropTypes.number,
};

Grid.defaultProps = {
  children: '',
};
