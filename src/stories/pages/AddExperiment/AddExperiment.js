import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '../../components/FormItem/FormItem';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { createExperiment } from '../../../firebase/api/experiments';
import { Section } from '../../components/Section/Section';
import { useAuth } from '../../../contexts/auth-provider';

/**
 * Component for AddExperiment page.
 * @param {string} buttonText Text to appear on the modal's open button.
 * @param {string} buttonModifierClasses Class modifiers of the modal's open
 * button.
 * @component
 * @return {object} (
 *   <AddExperiment buttonText={buttonText}
 *     buttonModifierClasses={buttonModifierClasses}
 *   />
 * )
 */

export const AddExperiment = ({ buttonText, buttonModifierClasses }) => {
  const { user } = useAuth(); // Need the user info to know who is the creator
  const DEFAULT_EXPERIMENT_INFO = {
    title: '',
    description: '',
    date: (new Date()).toLocaleString('default', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    creator: user.firstName + ' ' + user.lastName,
    consent: '',
    preSurvey: '',
    postSurvey: '',
    isOngoing: true,
  };
  const [error, setError] = useState('');
  const [experiment, setExperiment] = useState(DEFAULT_EXPERIMENT_INFO);

  const postExperiment = async (e) => {
    e.preventDefault();

    // post experiment
    await createExperiment(experiment).then((response) => {
      if (response.data) {
        setExperiment(DEFAULT_EXPERIMENT_INFO); // Reset form

        // reset form
        e.target.parentNode.reset();
      } else {
        // ERROR HANDLING
        setError(`Looks like something is missing. Please make sure that all \
          of the fields in the form are complete and then try again`);
      }
    });
  };

  return (
    <Modal buttonText={buttonText}
      buttonModifierClasses={buttonModifierClasses}
    >
      <Section titleEl='h3' title='Add New Experiment'>
        <p>Make sure all fields are filled out, submit the new experiment
          and test it yourself.</p>
        <Form>
          <h5>Title</h5>
          <FormItem
            placeholder="Title of the study"
            type="text"
            showLabel={false}
            label="Study Title"
            handleChange={(e) => setExperiment({
              ...experiment,
              title: e.target.value,
            })
            }
          />
          <FormItem
            type="textarea"
            showLabel={true}
            label="Description of the study"
            handleChange={(e) => setExperiment({
              ...experiment,
              description: e.target.value,
            })}
          />
          <h5>Consent Form</h5>
          <FormItem
            placeholder="URL to Consent Form"
            type="text"
            showLabel={false}
            label="Consent Form"
            handleChange={(e) => setExperiment({
              ...experiment,
              consent: e.target.value,
            })}
          />
          <h5>Pre-experiment survey</h5>
          <FormItem
            placeholder="URL to Pre-Survey Questionnaire"
            type="text"
            showLabel={false}
            label="Questionnaire URL"
            handleChange={(e) => setExperiment({
              ...experiment,
              preSurvey: e.target.value,
            })}
          />
          <h5>Post-experiment survey</h5>
          <FormItem
            placeholder="URL to Post-Survey Questionnaire"
            type="text"
            showLabel={false}
            label="Questionnaire URL"
            handleChange={(e) => setExperiment({
              ...experiment,
              postSurvey: e.target.value,
            })}
          />
          { error &&
            <div className="form__msg">
              <p>{error}</p>
            </div>
          }
          <Button
            text="Add Experiment"
            modifierClasses="button--tertiary"
            isButton={true}
            onClick={postExperiment}
          />
        </Form>
      </Section>
    </Modal>
  );
};


AddExperiment.propTypes = {
  /**
    * Button's Text
    */
  buttonText: PropTypes.string.isRequired,
  /**
    * Button's modifier classes
    */
  buttonModifierClasses: PropTypes.string,
};

AddExperiment.defaultProps = {
  buttonText: 'Add New Experiment',
};
