import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for teaser element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} url URL of the component.
 * @param {string} title Title of the component.
 * @param {string} text Text of the component.
 * @return {object} (
 *   <Teaser
 *      modifierClasses={modifierClasses} url={url} title={title} text={text}
 *   />
 * )
 */
export const Teaser = ({ modifierClasses, url, title, text }) => {
  return (
    <a
      href={url}
      className={['teaser', `${modifierClasses}`].join(' ').trim()}
    >
      <span className='teaser__title'>{title}</span>
      {text}
    </a>
  );
};

Teaser.propTypes = {
  /**
   * Teaser's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Teaser's url
   */
  url: PropTypes.string.isRequired,
  /**
   * Teaser's title
   */
  title: PropTypes.string.isRequired,
  /**
   * Teaser's text
   */
  text: PropTypes.string.isRequired,
};

Teaser.defaultProps = {
  modifierClasses: '',
};
