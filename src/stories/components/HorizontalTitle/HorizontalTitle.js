import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';


/**
 * HorizontalTitle Component
 *
 * @component
 * @param {eyebrow} eyebrow
 * @param {title} title
 * @param {content} paragraph content
 * @return {object}
 */
export const HorizontalTitle = (
  { modifierClasses, eyebrow, title, content }) => {
  return (
    <div
      className={
        ['horizontal-title', `${modifierClasses}`].join(' ').trim()
      }
    >
      {eyebrow ?
        <div className="horizontal-title__eyebrow">{eyebrow}</div> :
        ''
      }
      <div className="horizontal-title__inner">
        <h1 className="horizontal-title__title">{title}</h1>
        <div className="horizontal-title__content">{content}</div>
      </div>
    </div>
  );
};

HorizontalTitle.propTypes = {
  modifierClasses: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

HorizontalTitle.defaultProps = {
  modifierClasses: '',
  eyebrow: '',
  title: '',
  content: '',
};
