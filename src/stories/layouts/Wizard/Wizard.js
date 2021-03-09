import './styles.scss';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import StepWizard from 'react-step-wizard';
import { Steps } from '../../components/Steps/Steps';
import { Constrain } from '../Constrain/Constrain';

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
export const Wizard = ({ children, labels }) => {
  const [state, updateState] = useState({
    form: {},
  });

  // Do something on step change
  const onStepChange = (stats) => {
    // might need later on
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
          WizInstance && <Controls WizInstance={WizInstance} />
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
const Controls = ({ WizInstance }) => (
  <Fragment>
    <div className="wizard__controls">
      <button className={'wizard__button button--link'}
        onClick={WizInstance.previousStep}
      >Go Back</button>
      <button className={'wizard__button button button--tertiary'}
        onClick={WizInstance.nextStep}
      >Next</button>
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
