import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for Alert element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} title of the alert.
 * @param {string} content of the aleret.
 * @return {object} (
 *   <Alert modifierClasses={modifierClasses}
 *      title={title} content={content}
 *   />
 * )
 */
export const Alert = ({ modifierClasses, title, content }) => {
  return (
    <div
      className={['alert', `alert--${modifierClasses}`].join(' ').trim()}
    >
      { title && <h4>{title}</h4> }
      {content}
    </div>
  );
};

Alert.propTypes = {
  /**
   * Alert's modifierClasses
   */
  modifierClasses: PropTypes.string,
  /**
   * Alert's title
   */
  title: PropTypes.string,
  /**
   * Alert's content
   */
  content: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  modifierClasses: 'success',
  title: '',
  content: 'This is an alert message.',
};
