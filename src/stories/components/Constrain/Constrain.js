import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for constrain element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {html} content Content of the component.
 * @return {object} (
 *   <Constrain modifierClasses={modifierClasses} />
 *      {content}
 *   </Constrain>
 * )
 */

export const Constrain = ({ modifierClasses, content}) => {
    return (
        <div
            className={['constrain', `${modifierClasses}`].join(' ').trim()}
        >
            {content}
        </div>
    );
};

Constrain.propTypes = {
    /**
   * Constrain's modifier classes
   */
    modifierClasses: PropTypes.string,
    /**
   * Constrain's conttent
   */
    content: PropTypes.string,
};

Constrain.defaultProps = {
    modifierClasses: '',
    content: '',
};
