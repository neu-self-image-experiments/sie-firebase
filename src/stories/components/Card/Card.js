import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

/**
 * Component for card element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {sting} title Text found for the title of the card
 * @param {string} body Text found in the body of the card
 * @return {object}
 *   <Card modifierClasses={modifierClasses} title={text} text={text} />
 * )
 */
export const Card = ({ modifierClasses, title, body }) => {
    return (
        <div className={['card', `${modifierClasses}`].join(' ').trim()}>
            <h1>{title}</h1>
            <p>{body}</p>
            <Button></Button>
        </div>
    );
};

Card.propTypes = {
    /**
     * Card's modifier classes
     */
    modifierClasses: PropTypes.string,
    /**
     * Card's title
     */
    title: PropTypes.string.isRequired,
    /**
     * Card's body
     */
    body: PropTypes.string.isRequired,
};

Card.defaultProps = {
    modifierClasses: '',
    title: 'Title',
    body: 'Body',
};
