import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../images/icon-arrow-right.svg';

/**
 * Component for teaser element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} url URL of the component.
 * @param {string} title Title of the component.
 * @param {string} text Text of the component.
 * @return {object} (
 *   <Teaser
 *      modifierClasses={modifierClasses} url={url} title={title} text={text}
 *   />
 * )
 */
export const Teaser = ({ modifierClasses, url, title, text }) => {
    return (
        <a
            href={url}
            className={['teaser', `${modifierClasses}`].join(' ').trim()}
        >
            <img src={Logo}
                alt={`${text} arrow logo`}
                className="arrow__logo"
            />
            <div className='line'></div>
            <div className='title'>
                {title}
            </div>
            <div className='text'>
                {text}
            </div>
        </a>
    );
};

Teaser.propTypes = {
    /**
   * Teaser's modifier classes
   */
    modifierClasses: PropTypes.string,
    /**
   * Teaser's url
   */
    url: PropTypes.string.isRequired,
    /**
   * Teaser's title
   */
    title: PropTypes.string.isRequired,
    /**
   * Teaser's text
   */
    text: PropTypes.string.isRequired,
};

Teaser.defaultProps = {
    modifierClasses: '',
};
