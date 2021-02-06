import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Add two numbers.
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} url URL of the component.
 * @param {string} text Text of the component.
 * @return null.
 */
/* eslint-disable */
export const Button = ({ modifierClasses, url, text }) => {
    return (
        <a
            href={url}
            className={['button', `${modifierClasses}`].join(' ')}
        >
            {text}
        </a>
    );
};

Button.propTypes = {
    modifierClasses: PropTypes.string,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

Button.defaultProps = {
    onClick: undefined,
    modifierClasses: '',
};
