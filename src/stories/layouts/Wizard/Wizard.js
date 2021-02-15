import './styles.scss';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import StepWizard from 'react-step-wizard';
import { Constrain } from '../../components/Constrain/Constrain';

// import Nav from './nav';

import './styles.scss';

/**
 * A basic demonstration of how to use the step wizard
 * @param {node} children of the component
 * @return {object} (
 *   <Wizard>
 *       {children}
 *   <Wizard />
 * )
 */
/* eslint react/prop-types: 0 */
export const Wizard = ({ children }) => {
    const [state, updateState] = useState({
        form: {},
        // demo: true, // uncomment to see more
    });

    // Do something on step change
    const onStepChange = (stats) => {
        // console.log(stats);
    };

    const setInstance = (SW) => updateState({
        ...state,
        SW,
    });

    const { SW } = state;

    return (
        <Constrain>
            <StepWizard
                className="wizard"
                onStepChange={onStepChange}
                // nav={<Nav />}
                instance={setInstance}
            >
                {children}
            </StepWizard>
            { SW && <Controls SW={SW} /> }
        </Constrain>
    );
};

/**
 * Component for loader element.
 *
 * @return {object} (
 *   <Loader text={text} />
 * )
 */
const Controls = ({ SW }) => (
    <Fragment>
        <div className="wizard__controls">
            <button className={'wizard__button button--link'}
                onClick={SW.previousStep}
            >Go Back</button>
            <button className={'wizard__button button button--tertiary'}
                onClick={SW.nextStep}
            >Next</button>
        </div>
    </Fragment>
);

Wizard.propTypes = {
    /**
   * Constrain's modifier classes
   */
    children: PropTypes.node,
};

Wizard.defaultProps = {
    children: '',
};
