import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for grid layout element.
 *
 * @param {node} children of the component
 * @param {string} numColumns number of columns in layout.
 * @return {object} (
 *   <Grid numColumns={numColumns}>
 *      {children}
 *    </Grid>
 * )
 */

export const Grid = ({ children, numColumns }) => {
    return (
        <div className={['grid', `${numColumns}`].join(' ').trim()}>
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
    numColumns: PropTypes.string,
};

Grid.defaultProps = {
    children: '',
};
