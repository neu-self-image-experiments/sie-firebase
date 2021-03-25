import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Component for header element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {node} leftContent Left content of the component.
 * @param {node} rightContent Right content of the component.
 * @return {object} (
 *   <Header modifierClasses={modifierClasses} />
 *      {leftContent}
 *      {rightContent}
 *   </Header>
 * )
 */

export const Header = ({ modifierClasses, leftContent, rightContent }) => {
  return (
    <div
      className={['header', `${modifierClasses}`].join(' ').trim()}
    >
      <Constrain modifierClasses="constrain--wide">
        <div className="header__inner">
          <div className="header__left">{leftContent}</div>
          <div className="header__right">{rightContent}</div>
        </div>
      </Constrain>
    </div>
  );
};

Header.propTypes = {
  /**
   * Header's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Header's left content
   */
  leftContent: PropTypes.node,
  /**
   * Header's right content
   */
  rightContent: PropTypes.node,
};

Header.defaultProps = {
  modifierClasses: '',
  leftContent: '',
  rightContent: '',
};
