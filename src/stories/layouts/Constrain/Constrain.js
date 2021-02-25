import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for constrain element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {node} children Children of the component.
 * @return {object} (
 *   <Constrain modifierClasses={modifierClasses} />
 *      {content}
 *   </Constrain>
 * )
 */

export const Constrain = ( { children, modifierClasses }) => {
  return (
    <div
      className={['constrain', `${modifierClasses}`].join(' ').trim()}
    >
      {children}
    </div>
  );
};

Constrain.propTypes = {
  /**
   * Constrain's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Constrain's children nodes
   */
  children: PropTypes.node,
};

Constrain.defaultProps = {
  modifierClasses: '',
};

