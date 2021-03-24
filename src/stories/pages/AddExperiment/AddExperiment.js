import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '../../components/FormItem/FormItem';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { createExperiment } from '../../../firebase/api/experiments';
import { Section } from '../../components/Section/Section';

/**
 * Component for AddExperiment page.
 * @param {string} buttonText Text to appear on the modal's open button.
 * @component
 * @return {object} (
 *   <AddExperiment buttonText={buttonText} />
 * )
 */

export const AddExperiment = ({ buttonText }) => {
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [consent, setConsent] = useState('');

  const postExperiment = async (e) => {
    e.preventDefault();

    const experiment = {
      title,
      description,
      consent,
      // preSurveys,
      // postSurveys,
    };

    // post experiment
    await createExperiment(experiment).then((response) => {
      if (response.data) {
        // SUCCESS CREATING EXPERIMENT
        setError('');
        setTitle('');
        setDescription('');
        setConsent('');
      } else {
        // ERROR HANDLING
        setError(`Looks like something is missing. Please make sure that all \
          of the fields in the form are complete and then try again`);
      }
    });
  };

  return (
    <Modal buttonText={buttonText}>
      <Section titleEl='h3' title='Add New Experiment'>
        <p>Make sure all fields are filled out, submit the new experiment
          and test it yourself.</p>
        <Form>
          <FormItem
            placeholder="Title of the study"
            type="text"
            showLabel={false}
            label="Study Title"
            handleChange={(e) => setTitle(e.target.value)
            }
          />
          <FormItem
            type="textarea"
            showLabel={true}
            label="Description of the study"
            handleChange={(e) => setDescription(e.target.value)}
          />
          <FormItem
            placeholder="URL to Consent Form"
            type="text"
            showLabel={false}
            label="Consent Form"
            handleChange={(e) => setConsent(e.target.value)}
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
};

AddExperiment.defaultProps = {
  buttonText: 'Add New Experiment',
};
