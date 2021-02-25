import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for sidebar element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {node} leftContent Left content of the component.
 * @param {node} rightContent Right content of the component.
 * @return {object} (
 *   <Sidebar modifierClasses={modifierClasses} />
 *      {leftContent}
 *      {rightContent}
 *   </Sidebar>
 * )
 */

export const Sidebar = ({ modifierClasses, leftContent, rightContent }) => {
  return (
    <div
      className={['sidebar', `${modifierClasses}`].join(' ').trim()}
    >
      <div className="sidebar__left">{leftContent}</div>
      <div className="sidebar__right">{rightContent}</div>
    </div>
  );
};

Sidebar.propTypes = {
  /**
   * Sidebar's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Sidebar's left content
   */
  leftContent: PropTypes.node,
  /**
   * Sidebar's right content
   */
  rightContent: PropTypes.node,
};

Sidebar.defaultProps = {
  modifierClasses: '',
  leftContent: '',
  rightContent: '',
};
