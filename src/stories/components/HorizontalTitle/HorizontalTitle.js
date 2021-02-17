import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';


/**
 * HorizontalTitle Component
 *
 * @component
 * @param {eyebrow} eyebrow
 * @param {title} title
 * @param {content} paragraph content
 * @return {object}
 */
export const HorizontalTitle = (
    { modifierClasses, eyebrow, title, content }) => {
    return (
        <div
            className={
                ['horizontal-title', `${modifierClasses}`].join(' ').trim()
            }
        >
            <div className="horizontal-title__title-container">
                {eyebrow ?
                    <div className="horizontal-title__eyebrow">{eyebrow}</div> :
                    ''
                }
                <h1 className="horizontal-title__title">{title}</h1>
            </div>
            <div className="horizontal-title__content">{content}</div>
        </div>
    );
};

HorizontalTitle.propTypes = {
    modifierClasses: PropTypes.string,
    eyebrow: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
};

HorizontalTitle.defaultProps = {
    modifierClasses: '',
    eyebrow: '',
    title: '',
    content: '',
};
