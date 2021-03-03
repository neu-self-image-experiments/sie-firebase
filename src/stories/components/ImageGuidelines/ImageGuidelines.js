import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for image guidelines element.
 *
 * @component
 * @param {node} content image snapshot .
 * @return {object} (
 *   <ImageGuidelines />
 * )
 */
export const ImageGuidelines = ({ content }) => {
  return (
    <div className="image-guidelines">
      <div className="image-guidelines__lines"></div>
      { content }
    </div>
  );
};

ImageGuidelines.propTypes = {
  /**
   * ImageGuidelines's content
   */
  content: PropTypes.node,
};

ImageGuidelines.defaultProps = {
  content: '',
};
