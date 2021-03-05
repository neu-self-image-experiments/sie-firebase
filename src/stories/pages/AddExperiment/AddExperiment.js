import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ExperimentServices
  from '../../../firebase/CRUDServices/experimentServices';

import { FormItem } from '../../components/FormItem/FormItem';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';

/**
 * Component for AddExperiment page.
 * @param {string} theme Theme of the parent component.
 * @param {string} buttonText Text to appear on the open button.
 * @component
 * @return {object} (
 *   <AddExperiment theme={theme}
 *                  buttonText={buttonText}
 *   />
 * )
 */

export const AddExperiment = ({ theme, buttonText }) => {
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [qualtrics, setQualtricsEmbed] = useState('');
  const [psychUrl, setPsychUrl] = useState('');

  const postExperiment = (e) => {
    e.preventDefault();

    const service = ExperimentServices.getInstance();

    const experiment = {
      title,
      shortDesc,
      longDesc,
      qualtrics,
      psychUrl,
    };

    // To be removed as firebase ID should be automatically generated
    const experimentId = Math.random();

    service.postExperiment(experimentId, experiment).then((response) => {
      if (response.errorCode) {
        // ERROR HANDLING
        setError(response.errorMessage);
      } else {
        // CLOSE MODAL
        setError('');
        window.alert('Experiment successfully added!');
      }
    });
  };

  return (
    <Modal
      theme={theme}
      buttonText={buttonText}
    >
      <h3>Add New Experiment</h3>
      <p>Make sure all fields are filled out, submit the new experiment
        and test it yourself.</p>
      <Form type="experiment">
        <FormItem
          modifierClasses={'form-item--dark'}
          placeholder="Title"
          type="text"
          showLabel={false}
          label="Title"
          handleChange={(e) => setTitle(e.target.value)}
        />
        <FormItem
          modifierClasses={'form-item--dark'}
          placeholder="Short Description"
          type="text"
          showLabel={false}
          label="Short Description"
          handleChange={(e) => setShortDesc(e.target.value)}
        />
        <FormItem
          modifierClasses={'form-item--dark'}
          placeholder="Long Description"
          type="text"
          showLabel={false}
          label="Long Description"
          handleChange={(e) => setLongDesc(e.target.value)}
        />
        <FormItem
          modifierClasses={'form-item--dark'}
          placeholder="Qualtrics Embeds"
          type="text"
          showLabel={false}
          label="Qualtrics Embeds"
          handleChange={(e) => setQualtricsEmbed(e.target.value)}
        />
        <FormItem
          modifierClasses={'form-item--dark'}
          placeholder="PsychJS URL"
          type="text"
          showLabel={false}
          label="PsychJS URL"
          handleChange={(e) => setPsychUrl(e.target.value)}
        />
        { error &&
                <div className="form__msg">
                  <p>{error}</p>
                </div>
        }
        <Button
          text="Add Experiment"
          modifierClasses="button--small button--secondary"
          onClick={postExperiment}
        />
      </Form>
    </Modal>
  );
};


AddExperiment.propTypes = {
  /**
     * Parent element's theme
     */
  theme: PropTypes.string.isRequired,
  /**
    * Button's Text
    */
  buttonText: PropTypes.string.isRequired,
};

AddExperiment.defaultProps = {
  theme: 'light',
  buttonText: 'Add New Experiment',
};
