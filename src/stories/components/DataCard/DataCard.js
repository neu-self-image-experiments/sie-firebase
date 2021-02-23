import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for data card element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component
 * @param {sting} title the data card
 * @param {string} description of the data card
 * @param {node} content of the data card
 * @return {object}
 *   <DataCard
 *      modifierClasses={modifierClasses}
 *      title={text}
 *      description={description}
 *      content={content} />
 * )
 */
export const DataCard = (
    { modifierClasses, title, description, content },
) => {
    return (
        <div className={['data_card', `${modifierClasses}`].join(' ').trim()}>
            <div className="data_card__container">
                <div className="data_card__details">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="data_card__content">
                    {content}
                </div>
            </div>
        </div>
    );
};

DataCard.propTypes = {
    /**
     * Data Card's modifier classes
     */
    modifierClasses: PropTypes.string,
    /**
     * Data Card's title
     */
    title: PropTypes.string.isRequired,
    /**
     * Data Card's description
     */
    description: PropTypes.string,
    /**
     * Data Card's content
     */
    content: PropTypes.node.isRequired,
};

DataCard.defaultProps = {
    modifierClasses: '',
};
