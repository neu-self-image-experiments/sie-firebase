import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';


/**
 * HorizontalTitle Component
 *
 * @component
 * @param {string} eyebrow
 * @param {string} titleEl
 * @param {string} title
 * @param {string} content content
 * @return {object}
 */
export const HorizontalTitle = ({
  modifierClasses, eyebrow, titleEl, title, content,
}) => {
  const CustomTitleTag = titleEl ? titleEl : 'h1';

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
      <div className="horizontal-title__container">
        <CustomTitleTag
          className="horizontal-title__title">{title}</CustomTitleTag>
        <div className="horizontal-title__content">{content}</div>
      </div>
    </div>
  );
};

HorizontalTitle.propTypes = {
  modifierClasses: PropTypes.string,
  titleEl: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

HorizontalTitle.defaultProps = {
  modifierClasses: '',
  titleEl: 'h1',
  eyebrow: '',
  title: '',
  content: '',
};
