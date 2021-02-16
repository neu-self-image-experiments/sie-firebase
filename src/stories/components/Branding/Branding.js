import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for branding element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} logo URL of the logo.
 * @param {string} text Text of the brand.
 * @return {object} (
 *   <Branding modifierClasses={modifierClasses}
 *             logo={logo}
 *             text={text} />
 * )
 */
export const Branding = ({ modifierClasses, logo, text }) => {
    return (
        <a
            href="*/"
            className={['branding', `${modifierClasses}`].join(' ').trim()}
        >
            <img src={logo} alt={`${text} website logo`}/>
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
   * Branding's logo URL
   */
    logo: PropTypes.string.isRequired,
    /**
   * Branding's text
   */
    text: PropTypes.string.isRequired,
};

Branding.defaultProps = {
    modifierClasses: '',
};
