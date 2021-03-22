import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { Section } from '../Section/Section';
import { QualtricsEmbed } from '../QualtricsEmbed/QualtricsEmbed';

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
      <Section titleEl='h3' title='Consent Form'>
        <p>Please, complete the form below before completing the study.</p>
        <ul className="consent-form__list">
          { qualtricsForms.map((form, i) => {
            return <li key={i}><QualtricsEmbed url={form} /></li>;
          })
          }
        </ul>
      </Section>

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
  qualtricsForms: [],
};
