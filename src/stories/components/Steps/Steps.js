import './styles.scss';

import React from 'react';

/**
 * Component for steps element.
 *
 * @component
 * @param {number} totalSteps of the component.
 * @return {object} (
 *   <Steps totalSteps={totalSteps}
 *      currentStep={currentStep} goToStep={goToStep} />
 * )
 */

export const Steps = (props) => {
    const steps = [];
    for (let i = 0; i <= props.totalSteps; i +=0) {
        const isActive = props.currentStep === i;
        steps.push((
            <li
                key={`step-${i}`}
                className={[
                    'steps__item',
                    `${isActive ? 'is-active' : ''}`].join(' ').trim()
                }
                onClick={() => props.goToStep(i)}
            >
                <span className="stetps__num">{i}</span>
                <span className="stetps__label">Label</span>
            </li>
        ));
    }

    return (
        <div className="steps">{steps}</div>
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
