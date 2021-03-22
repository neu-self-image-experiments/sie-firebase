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
 * @param {string} children Content of the section.
 * @return {object}
 *   <Section
 *      modifierClasses={modifierClasses}
 *      titleEl={titleEl}
 *      title={title}
 *      children={children}
 *      />
 * )
 */
export const Section = ({
  modifierClasses,
  titleEl,
  title,
  children,
}) => {
  const classes = ['section', `${modifierClasses}`].join(' ').trim();
  const CustomTitleTag = titleEl ? titleEl : 'h3';
  return (
    <div className={classes}>
      <CustomTitleTag className="section__title">{title}</CustomTitleTag>
      <div className="section__content">
        {children}
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
     * Section's children
     */
  children: PropTypes.node,
};

Section.defaultProps = {
  modifierClasses: '',
};
