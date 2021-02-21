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
 * @param {string} opened Date the experiment will be opened
 * @param {string} admin The admin for the experiment
 * @param {string} researchers The researchers for the experiment
 * @return {object}
 *   <Card
 *      modifierClasses={modifierClasses}
 *      title={text}
 *      text={text}
 *      opened={opened}
 *      admin={admin}
 *      researchesr={researchers} />
 * )
 */
export const Card = ({
    modifierClasses,
    title,
    body,
    opened,
    admin,
    researchers,
}) => {
    return (
        <div className={['card', `${modifierClasses}`].join(' ').trim()}>
            <div className="card__container">
                <div className="card__details">
                    <h3>{title}</h3>
                    <p>{body}</p>
                </div>
                <div className="card__extra">
                    <p>Opened: {opened}</p>
                    <p>Admin: {admin}</p>
                    <p>Researchers: {researchers}</p>
                </div>
                <Button
                    text="View Details"
                    modifierClasses="card__button"
                ></Button>
            </div>
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
    body: PropTypes.string,
    /**
     * The open date
     */
    opened: PropTypes.string.isRequired,
    /**
     * The admin
     */
    admin: PropTypes.string.isRequired,
    /**
     * The researchers
     */
    researchers: PropTypes.string.isRequired,
};

Card.defaultProps = {
    modifierClasses: '',
};
