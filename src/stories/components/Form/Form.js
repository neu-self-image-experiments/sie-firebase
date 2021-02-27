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
 * @param {boolean} isDarkTheme theme of the component the form is included in.
 * @param {function} handleSubmit action to be executed on submit
 * @return {object} (
 *   <Form
 *      formItems={formItems}
 *      type={type}
 *   />
 * )
 */
export const Form = (
  { formItems, type, buttonText, handleSubmit, isDarkTheme },
) => {
  // dynamically render Form Item Input
  function returnForm(type) {
    // switch statement to check value of type
    switch (type) {
    case 'login':
      return <Login isDarkTheme={isDarkTheme}/>;
    case 'signup':
      return <SignUp isDarkTheme={isDarkTheme}/>;
    default:
      return <CustomForm elements={formItems} isDarkTheme={isDarkTheme}/>;
    }
  }
  return (
    <form id="customForm">
      {returnForm(type)}
      <div className="form__button">
        <Button
          modifierClasses={[
            'button--small',
            `${isDarkTheme ?
              'button--quaternary' :
              'button--secondary'}`].join(' ').trim()}
          text={(buttonText) ?
            buttonText :
            (type==='login') ?
              'Login':'Sign Up'}
          onClick={handleSubmit}
        />
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
  handleSubmit: PropTypes.func,
  /**
     * Form's outer container theme
     */
  isDarkTheme: PropTypes.bool,
};

Form.defaultProps = {
  formItems: [],
  type: 'text',
  buttonText: null,
  handleSubmit: null,
  isDarkTheme: false,
};

/**
 * Render <CustomForm /> HTML
 * @param {array} elements list of form items to render.
 * @return {object} (
 *   <Login />
 * )
 */
const CustomForm = ({ elements, isDarkTheme }) => (
  <React.Fragment>
    {
      elements.map((element, index)=> (
        <FormItem
          key={index}
          modifierClasses={isDarkTheme ? 'form-item--light' : ''}
          type={element.type}
          placeholder={element.placeholder}
          showLabel = {element.showLabel}
          options = {element.options}
          value={element.value}
          label={element.label}
        />
      ))
    }
  </React.Fragment>
);

CustomForm.propTypes = {
  /**
    * CustomForm's allowed types
   */
  elements: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    showLabel: PropTypes.bool,
    modifierClasses: PropTypes.string,
  })).isRequired,
  /**
   * CustomForm's type
   */
  type: PropTypes.string,
  /**
   * CustomForm's outer theme
   */
  isDarkTheme: PropTypes.bool,
};

CustomForm.defaultProps = {
  type: 'custom',
  isDarkTheme: false,
};

/**
 * Render <Login /> HTML
 * @return {object} (
 *   <Login />
 * )
 */
const Login = ({ isDarkTheme }) => (
  <React.Fragment>
    <FormItem
      modifierClasses={isDarkTheme ? 'form-item--light' : ''}
      placeholder="Username or Email"
      type="text"
      showLabel
    />
    <FormItem
      modifierClasses={isDarkTheme ? 'form-item--light' : ''}
      placeholder="Password"
      type="password"
      showLabel
    />
  </React.Fragment>
);

Login.propTypes = {
  /**
   * Login's outer theme
   */
  isDarkTheme: PropTypes.bool,
};

Login.defaultProps = {
  isDarkTheme: false,
};

/**
 * Render <SignUp /> HTML
 * @return {object} (
 *   <SignUp />
 * )
 */
const SignUp = ({ isDarkTheme }) => (
  <React.Fragment>
    <FormItem
      modifierClasses={isDarkTheme ? 'form-item--light' : ''}
      placeholder="Full Name"
      showLabel
    />
    <FormItem
      modifierClasses={isDarkTheme ? 'form-item--light' : ''}
      placeholder="Email"
      type="email"
      showLabel
    />
    <FormItem
      modifierClasses={isDarkTheme ? 'form-item--light' : ''}
      placeholder="Password"
      type="password"
      showLabel
    />
    <FormItem
      modifierClasses={isDarkTheme ? 'form-item--light' : ''}
      showLabel
      label="Role"
      options={[
        '-- User Role --',
        'Administrator',
        'Researcher',
        'Participant',
      ]}
      type="select"
    />
  </React.Fragment>
);

SignUp.propTypes = {
  /**
   * SignUp's outer theme
   */
  isDarkTheme: PropTypes.bool,
};

SignUp.defaultProps = {
  isDarkTheme: false,
};
