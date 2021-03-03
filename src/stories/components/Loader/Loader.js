import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for Loader element.
 *
 * @component
 * @param {string} text of the component.
 * @return {object} (
 *   <Loader text={text} />
 * )
 */
export const Loader = ({ text }) => {
  return (
    <div className="loader">
      <div className="loader__icon">
        <span className="loader__dot"></span>
        <span className="loader__dot"></span>
        <span className="loader__dot"></span>
        <span className="loader__dot"></span>
      </div>
      <p>{text}</p>
    </div>
  );
};

Loader.propTypes = {
  /**
   * Loader's text
   */
  text: PropTypes.string.isRequired,
};

Loader.defaultProps = {
  text: 'Loading...',
};

