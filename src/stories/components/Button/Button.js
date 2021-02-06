import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for button element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} url URL of the component.
 * @param {string} text Text of the component.
 * @return {object} (
 *   <Button modifierClasses={modifierClasses} url={url} text={text} />
 * )
 */
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
    /**
   * Button's modifier classes
   */
    modifierClasses: PropTypes.string,
    /**
   * Button's url
   */
    url: PropTypes.string.isRequired,
    /**
   * Button's text
   */
    text: PropTypes.string.isRequired,
};

Button.defaultProps = {
    modifierClasses: '',
};
