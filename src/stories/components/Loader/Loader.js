import './styles.scss';

import React from 'react';

/**
 * Component for loader element.
 *
 * @component
 * @param {string} text of the component.
 * @return {object} (
 *   <Loader text={text} />
 * )
 */
export const Loader = ({text}) => {
    return (
        <div className="loader">
            <div className="loader__icon">
                <span className="loader__dot"></span>
                <span className="loader__dot"></span>
                <span className="loader__dot"></span>
                <span className="loader__dot"></span>
            </div>
            <p className="loader__text">{text}</p>
        </div>
    );
};

Loader.propTypes = {
    /**
   * Loader's text
   */
    text: PropTypes.string,
};

Loader.defaultProps = {
    text: 'Loading...',
};

