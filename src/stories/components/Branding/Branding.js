import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
// TODO: replace the import below with the actual logo once it's chosen
import Logo from '../../../images/icon-logo.svg';

/**
 * Component for branding element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} text Text of the brand.
 * @return {object} (
 *   <Branding modifierClasses={modifierClasses}
 *             text={text}
 *   />
 * )
 */
export const Branding = ({ modifierClasses, text }) => {
  // TODO: replace below <a> with <Link> once routing is set up OR modify
  //       href of below <a> once page navigation is established.
  return (
    <a
      href="/"
      className={['branding', `${modifierClasses}`].join(' ').trim()}
    >
      <img src={Logo}
        alt="SIE Logo"
        className="branding__logo"
      />
      {text}
    </a>
  );
};

Branding.propTypes = {
  /**
   * Branding's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Branding's text
   */
  text: PropTypes.string.isRequired,
};

Branding.defaultProps = {
  modifierClasses: '',
};
