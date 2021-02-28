import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for section element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} titleEl HTML title element.
 * @param {string} title Text found for the title of the section.
 * @param {string} content Text found in the content of the section.
 * @return {object}
 *   <Section
 *      modifierClasses={modifierClasses}
 *      titleEl={titleEl}
 *      title={title}
 *      content={content}
 *      />
 * )
 */
export const Section = ({
  modifierClasses,
  titleEl,
  title,
  content,
}) => {
  const classes = ['section', `${modifierClasses}`].join(' ').trim();
  const CustomTitleTag = titleEl ? titleEl : 'h3';
  return (
    <div className={classes}>
      <CustomTitleTag>{title}</CustomTitleTag>
      <div className="section__content">
        {content}
      </div>
    </div>
  );
};

Section.propTypes = {
  /**
     * Section's modifier classes
     */
  modifierClasses: PropTypes.string,
  /**
     * Section's HTML title element
     */
  titleEl: PropTypes.string.isRequired,
  /**
     * Section's title
     */
  title: PropTypes.string.isRequired,
  /**
     * Section's content
     */
  content: PropTypes.string,
};

Section.defaultProps = {
  modifierClasses: '',
};
