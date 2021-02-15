import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for progress element.
 *
 * @component
 * @param {number} props of the component.
 * @return {object} (
 *   <Steps totalSteps={totalSteps}
 *      currentStep={currentStep} goToStep={goToStep} />
 * )
 */
/* eslint react/prop-types: 0 */

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
                onClick={() => props.goToStep(i)}
            >
                <span className="steps__num">{i}</span>
                <span className="steps__label">Label</span>
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
   * Steps's got to steps
   */
    goToStep: PropTypes.number,
};

Steps.defaultProps = {
    totalSteps: 4,
    currentStep: 0,
    goToStep: 1,
};
