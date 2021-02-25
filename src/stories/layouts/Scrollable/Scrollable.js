import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for scrollable div element.
 *
 * @param {node} children Elements inside this Scrollable
 * @return {object} (
 *   <Scrollable children={children}>
 *      {children}
 *    </Scrollable>
 * )
 */

export const Scrollable = ({ children }) => {
  return <div className={'scrollable'}>{children}</div>;
};

Scrollable.propTypes = {
  /**
     * The content inside the scrollable
     */
  children: PropTypes.node,
};

Scrollable.defaultProps = {
  children: '',
};
