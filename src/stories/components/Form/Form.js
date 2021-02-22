import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '../FormItem/FormItem';
import { Button } from '../Button/Button';

/**
 * Component for Form element.
 *
 * @component
 * @param {array} formItems list of form items to include in the form.
 * @param {string} type of the form.
 * @param {string} buttonText text to be display on the submit button.
 * @param {function} handleSubmit action to be executed on submit
 * @return {object} (
 *   <Form
 *      formItems={formItems}
 *      type={type}
 *   />
 * )
 */
export const Form = (
    { formItems, type, buttonText, handleSubmit },
) => {
    // dynamically render Form Item Input
    function returnForm(type) {
        // switch statement to check value of type
        switch (type) {
        case 'login':
            return <Login />;
        case 'signup':
            return <SignUp />;
        default:
            return <CustomForm elements={formItems}/>;
        }
    }
    return (
        <form>
            <div className="form__container">
                {returnForm(type)}
                <div className="form__button">
                    <Button
                        modifierClasses="button--quaternary button--small"
                        text={(buttonText) ?
                            buttonText :
                            (type=='login') ?
                                'Login':
                                (type=='signup') ?
                                    'Sign Up':
                                    'Submit'}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    /**
   * Form's list of form items
   */
    formItems: PropTypes.array,
    /**
   * Form's type
   */
    type: PropTypes.string.isRequired,
    /**
     * Form's button text
     */
    buttonText: PropTypes.string,
    /**
     * Form's button action
     */
    handleSubmit: PropTypes.function,
};

Form.defaultProps = {
    formItems: [],
    type: 'text',
    buttonText: 'Submit',
    handleSubmit: null,
};

/**
 * Render <CustomForm /> HTML
 * @param {array} elements list of form items to render.
 * @return {object} (
 *   <Login />
 * )
 */
const CustomForm = ({ elements }) => (
    <React.Fragment>
        {
            elements.map((element, index)=> (
                <div
                    className="form__item"
                    key={index}>
                    <FormItem
                        type={element.type}
                        placeholder={element.placeholder}
                        showLabel = {element.showLabel}
                        options = {element.options}
                        value={element.value}
                        label={element.label}
                    />
                </div>
            ))
        }
    </React.Fragment>
);

CustomForm.propTypes = {
    /**
    * CustomForm's allowed types
   */
    elements: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        options: PropTypes.array,
        showLabel: PropTypes.bool,
    })),
    /**
   * CustomForm's type
   */
    type: PropTypes.string,
};

CustomForm.defaultProps = {
    type: 'custom',
};

/**
 * Render <Login /> HTML
 * @return {object} (
 *   <Login />
 * )
 */
const Login = () => (
    <React.Fragment>
        <div className="form__item">
            <FormItem
                placeholder="Email"
                type="email"
                showLabel
            />
        </div>
        <div className="form__item">
            <FormItem
                placeholder="Password"
                type="password"
                showLabel
            />
        </div>
    </React.Fragment>
);

/**
 * Render <SignUp /> HTML
 * @return {object} (
 *   <SignUp />
 * )
 */
const SignUp = () => (
    <React.Fragment>
        <div className="form__item">
            <FormItem
                placeholder="Full Name"
                showLabel
            />
        </div>
        <div className="form__item">
            <FormItem
                placeholder="Email"
                type="email"
                showLabel
            />
        </div>
        <div className="form__item">
            <FormItem
                placeholder="Password"
                type="password"
                showLabel
            />
        </div>
        <div className="form__item">
            <FormItem
                label="Role"
                options={[
                    'Administrator',
                    'Researcher',
                    'Participant',
                ]}
                type="select"
            />
        </div>
    </React.Fragment>
);

// const capitalize = function(str) {
//     return str.replace(/(^|\s)([a-z])/g,
//         function(m, p1, p2) {
//             return p1 + p2.toUpperCase();
//         });
// };
