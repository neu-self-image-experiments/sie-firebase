import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for main element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {node} children Children of the component.
 * @return {object} (
 *   <Main modifierClasses={modifierClasses} />
 *      {children}
 *   </Main>
 * )
 */

export const Main = ( { children }) => {
  return (
    <main role="main">
      {children}
    </main>
  );
};

Main.propTypes = {
  /**
   * Main's children nodes
   */
  children: PropTypes.node,
};
