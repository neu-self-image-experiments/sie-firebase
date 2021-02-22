import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { FormItem } from '../FormItem/FormItem';
import { Button } from '../Button/Button';

/**
 * Component for Form element.
 *
 * @component
 * @param {string} formItems list of form items to include in the form.
 * @param {enum} type of the input.
 * @return {object} (
 *   <Form
 *      formItems={formItems}
 *      type={type}
 *   />
 * )
 */
export const Form = (
    { formItems, type },
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
            return <p>Custom</p>;
        }
    }
    // className={['form-item', `${modifierClasses}`].join(' ').trim()}
    return (
        <form>
            <div className="form__container">
                {returnForm(type)}
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
};

Form.defaultProps = {
    formItems: [],
    type: 'text',
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
        <div className="form__button">
            <Button
                modifierClasses="button--quaternary button--small"
                text="Login"
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
                    'Option 1',
                    'Option 2',
                    'Option 3',
                    'Option 4',
                ]}
                type="select"
            />
        </div>
        <div className="form__button">
            <Button
                modifierClasses="button--quaternary button--small"
                text="Sign Up"
            />
        </div>
    </React.Fragment>
);

// /**
//  * Render <input /> HTML
//  * @param {string} placeholder of the input.
//  * @param {enum} type of the input.
//  * @param {string} value of the input.
//  * @param {string} label of the input.
//  * @return {object} (
//  *   <Input
//  *      placeholder={placeholder} label={label}
//         type={type} value={value} />
//  * )
//  */
// const Input = ({type, placeholder, value, label}) => (
//     <input
//         className={[
//             'form-item__input',
//             `form-item__input--${type}`].join(' ').trim()}
//         placeholder={placeholder}
//         type={type}
//         aria-label={label}
//         {...value ? `value="${value}"` : ''}
//     />
// );

// Input.propTypes = {
//     /**
//    * Input's label
//    */
//     label: PropTypes.string.isRequired,
//     /**
//    * Input's placeholder
//    */
//     placeholder: PropTypes.string,
//     /**
//    * Input's allowed types
//    */
//     type: PropTypes.oneOf([
//         'text',
//         'email',
//         'password',
//         'date',
//         'textarea',
//         'select',
//     ]).isRequired,
//     /**
//    * Input's value
//    */
//     value: PropTypes.string,
// };

// Input.defaultProps = {
//     label: 'Form Item Label',
//     type: 'text',
//     placeholder: 'Placeholder',
//     value: '',
// };

Select.propTypes = {
    /**
   * Select's options
   */
    options: PropTypes.array,
};

Select.defaultProps = {
    options: [],
};
