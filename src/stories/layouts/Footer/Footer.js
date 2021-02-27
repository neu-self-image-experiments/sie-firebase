import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for footer element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {node} leftContent Left content of the component.
 * @param {node} rightContent Right content of the component.
 * @return {object} (
 *   <Footer modifierClasses={modifierClasses} />
 *      {leftContent}
 *      {rightContent}
 *   </Footer>
 * )
 */

export const Footer = ({ modifierClasses, leftContent, rightContent }) => {
  return (
    <div
      className={['footer', `${modifierClasses}`].join(' ').trim()}
    >
      <div className="footer__inner">
        <div className='footer__left'>{leftContent}</div>
        <div className='footer__right'>{rightContent}</div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  /**
   * Footer's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Footer's left content
   */
  leftContent: PropTypes.node,
  /**
   * Footer's right content
   */
  rightContent: PropTypes.node,
};

Footer.defaultProps = {
  modifierClasses: '',
  leftContent: '',
  rightContent: '',
};
