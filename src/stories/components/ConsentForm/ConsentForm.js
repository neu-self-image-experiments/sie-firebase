import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../Section/Section';

/**
 * Component for consent form element.
 *
 * @component
 * @param {string} title of the component.
 * @param {array} qualtricsForms questionnaire array containing URLs.
 * @return {object}
 *   <ConsentForm title={title} qualtricsForms={qualtricsForms} />
 * )
 */
export const ConsentForm = ({ qualtricsForms }) => {
  return (
    <div className="consent-form">
      <Section titleEl='h3' title='Consent Form' />
    </div>
  );
};

ConsentForm.propTypes = {
  /**
     * ConsentForm's modifier classes
     */
  title: PropTypes.string.isRequired,
  /**
     * ConsentForm's HTML title element
     */
  qualtricsForms: PropTypes.array.isRequired,
};

ConsentForm.defaultProps = {
  modifierClasses: '',
};
