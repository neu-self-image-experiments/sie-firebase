import './styles.scss';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import StepWizard from 'react-step-wizard';
import { Steps } from '../../components/Steps/Steps';
import { Constrain } from '../Constrain/Constrain';
import { Link, useParams } from 'react-router-dom';

/**
 * Component for Wizard layout element.
 * @param {node} children of the component
 * @param {array} labels of steps
 * @return {object} (
 *   <Wizard labels={labels}>
 *       {children}
 *   <Wizard />
 * )
 */
/* eslint react/prop-types: 0 */
export const Wizard = ({ children, labels, showNext }) => {
  const { experimentId } = useParams();
  const [state, updateState] = useState({
    form: {},
  });
  const [step, setStep] = useState(1);

  // update step value
  const onStepChange = (stats) => {
    setStep(WizInstance.currentStep);
    window.setTimeout(function() {
      window.scrollTo({
        top: 0,
        // left: 0,
        behavior: 'smooth',
      });
    }, 800);
  };

  const setInstance = (WizInstance) => updateState({
    ...state,
    WizInstance,
  });

  const { WizInstance } = state;

  const renderWizard = () => {
    return (
      <Fragment>
        <StepWizard
          className="wizard"
          onStepChange={onStepChange}
          nav={
            <Steps labels={labels} />
          }
          instance={setInstance}
        >
          {children}
        </StepWizard>
        {
          WizInstance && <Controls currentStep={step}
            WizInstance={WizInstance}
            experimentId={experimentId}
            showNext={showNext} />
        }
      </Fragment>
    );
  };

  return (
    <div>
      { children.length === labels.length ?
        renderWizard() :
        <Constrain modifierClasses="constrain--small">
          A message goes here.
        </Constrain>
      }
    </div>
  );
};

/**
 * Fragment for Wizard's controls.
 *
 * @return {object} (
 *   <Fragment WizInstance={WizInstance} />
 * )
 */
const Controls = ({ experimentId, currentStep, WizInstance, showNext }) => (
  <Fragment>
    <div className="wizard__controls">
      {currentStep !== 1 &&
        <button className={'wizard__button button--link'}
          onClick={WizInstance.previousStep}
        >Go Back</button>
      }
      {(currentStep !== WizInstance.totalSteps && showNext) ?
        <button className={'wizard__button button button--tertiary'}
          onClick={WizInstance.nextStep}
        >Next</button> : currentStep === WizInstance.totalSteps ?
          <Link className={'wizard__button button button--tertiary'}
            to={`/study/${experimentId}/user/123`}
          >Complete Study</Link> :
          <button className={'wizard__button button button--tertiary disabled'}
          >Next</button>
      }
    </div>
  </Fragment>
);

Wizard.propTypes = {
  /**
   * Wizards's children
   */
  children: PropTypes.node,
  /**
     * Wizard's labels
     */
  labels: PropTypes.array,
  /**
     * Wizard's 'Next' button condition
     */
  showNext: PropTypes.bool,
};

Wizard.defaultProps = {
  children: '',
  labels: [
    'Step 1',
    'Step 2',
    'Step 3',
    'Step 4',
  ],
};
