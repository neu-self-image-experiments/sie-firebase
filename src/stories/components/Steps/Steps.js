import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for step progress element.
 *
 * @component
 * @param {prop} props of the component.
 * @param {array} labels of each step.
 * @return {object} (
 *   <Steps props={props}
 *      labels={labels} />
 * )
 */

export const Steps = (props) => {
  const steps = [];

  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    steps.push((
      <li
        key={`step-${i}`}
        className={[
          'steps__item',
          `${i < props.currentStep ? 'has-been-visited' : ''}`,
          `${isActive ? 'is-active' : ''}`].join(' ').trim()}
      >
        <span className="steps__num">{i}</span>
        <span className="steps__label">{props.labels[i-1]}</span>
      </li>
    ));
  }


  return (
    <ul className="steps">{steps}</ul>
  );
};

Steps.propTypes = {
  /**
   * Steps's total steps
   */
  totalSteps: PropTypes.number,
  /**
   * Steps's current step
   */
  currentStep: PropTypes.number,
  /**
   * Steps's go to steps
   */
  goToStep: PropTypes.number,
  /**
     * Steps's labels
     */
  labels: PropTypes.array,
};

Steps.defaultProps = {
  totalSteps: 4,
  currentStep: 1,
  goToStep: 2,
  labels: [
    'Label 1',
    'Label 2',
    'Label 3',
    'Label 4',
  ],
};
