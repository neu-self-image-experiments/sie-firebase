import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

/**
 * Component for card element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {object} experimentInfo The metadata of an experiment
 * @return {object}
 *   <Card
 *      modifierClasses={modifierClasses}
 *      experimentInfo={experimentInfo} />
 * )
 */
export const Card = ({
  modifierClasses,
  experimentInfo,
}) => {
  const {
    title,
    body,
    opened,
    creator,
    consentForm,
    preSurvey,
    postSurvey,
    experimentUrl,
  } = experimentInfo;

  const [showDetails, setShowDetails] = useState(false);

  // To show/hide experiment details
  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const cardDetails = showDetails ?
    <React.Fragment>
      <hr/>
      <h5>Consent form Qualtrics survey:</h5>
      <p>{consentForm}</p>
      <hr/>
      <h5>Pre-experiment Qualtrics survey:</h5>
      <p>{preSurvey}</p>
      <hr/>
      <h5>Post-experiment Qualtrics survey:</h5>
      <p>{postSurvey}</p>
      <hr/>
      <h5>Experiment URL:</h5>
      <p>{experimentUrl}</p>
    </React.Fragment> :
    null;

  return (
    <div className={['card', `${modifierClasses}`].join(' ').trim()}>
      <div className="card__container">
        <div className="card__details">
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
        <div className="card__extra">
          <p>Opened: {opened}</p>
          <p>Creator: {creator}</p>
          {cardDetails}
        </div>
        {showDetails ?
          <Button
            text="Hide Details"
            modifierClasses="button--small card__button"
            isButton={true}
            onClick={toggleDetails}
          ></Button> :
          <Button
            text="View Details"
            modifierClasses="button--small card__button"
            isButton={true}
            onClick={toggleDetails}
          ></Button>
        }
      </div>
    </div>
  );
};

Card.propTypes = {
  /**
     * Card's modifier classes
     */
  modifierClasses: PropTypes.string,
  /**
     * The experiment's metadata to be displayed in the card
     */
  experimentInfo: PropTypes.object.isRequired,
};

Card.defaultProps = {
  modifierClasses: '',
};
