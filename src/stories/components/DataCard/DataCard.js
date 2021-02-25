import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for data card element.
 *
 * @component
 * @param {string} modifierClasses of the data card
 * @param {sting} title the data card
 * @param {string} description of the data card
 * @param {node} children of the data card
 * @return {object}
 *   <DataCard
 *      modifierClasses={modifierClasses}
 *      title={title}
 *      description={description}
 *      children={children} />
 * )
 */
export const DataCard = (
  { modifierClasses, title, description, children },
) => {
  return (
    <div className={['data-card', `${modifierClasses}`].join(' ').trim()}>
      <div className="data-card__container">
        <div className="data-card__details">
          <h6>{title}</h6>
          {description}
        </div>
        <div className="data-card__content">
          {children}
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
     * Data Card's children
     */
  children: PropTypes.node.isRequired,
};

DataCard.defaultProps = {
  modifierClasses: '',
};
