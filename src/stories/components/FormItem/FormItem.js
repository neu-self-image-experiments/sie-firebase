import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for form item element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} label of the form item.
 * @param {boolean} showLabel of the form item.
 * @param {string} placeholder of the input.
 * @param {enum} type of the input.
 * @param {string} value of the input.
 * @param {array} options of the select input.
 * @param {func} handleChange of the input.
 * @return {object} (
 *   <FormItem modifierClasses={modifierClasses}
 *      label={label} showLabel={showLabel}
 *      placeholder={placeholder} type={type} value={value} options={options}
 *   />
 * )
 */
/* eslint-disable react/prop-types */
export const FormItem = (
  {
    modifierClasses,
    label,
    showLabel,
    placeholder,
    type,
    value,
    handleChange,
    options,
  },
) => {
  // dynamically render Form Item Input
  function returnFormItem(type) {
    // switch statement to check value of type
    switch (type) {
    case 'textarea':
      return <Textarea />;
    case 'select':
      return <Select options={options} />;
    default:
      return <Input placeholder={placeholder}
        label={showLabel ? '' : label}
        type={type}
        value={value}
        handleChange={handleChange}
      />;
    }
  }

  return (
    <div className={['form-item', `${modifierClasses}`].join(' ').trim()}>
      {returnFormItem(type)}
      <label
        className={[
          'form-item__label',
          `${showLabel ? '' : 'is-hidden'}`].join(' ').trim()}
      >{label}</label>
    </div>
  );
};

FormItem.propTypes = {
  /**
   * FormItem's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * FormItem's showLabel
   */
  showLabel: PropTypes.bool,
  /**
   * FormItem's label
   */
  label: PropTypes.string,
  /**
   * FormItem's placeholder
   */
  placeholder: PropTypes.string,
  /**
   * FormItem's type
   */
  type: PropTypes.string.isRequired,
  /**
   * FormItem's value
   */
  value: PropTypes.string,
  /**
   * FormItem's options
   */
  options: PropTypes.array,
};

FormItem.defaultProps = {
  modifierClasses: '',
  showLabel: false,
  label: 'Form Item Label',
  type: 'text',
  placeholder: 'Placeholder',
  value: '',
  handleChange: null,
};

/**
 * Render <input /> HTML
 * @param {func} handleChange of the input.
 * @param {string} placeholder of the input.
 * @param {enum} type of the input.
 * @param {string} value of the input.
 * @param {string} label of the input.
 * @return {object} (
 *   <Input
 *      placeholder={placeholder} label={label}
        type={type} value={value} />
 * )
 */

const Input = ( { type, placeholder, value, label, handleChange }) => {
  return (
    <input
      className={[
        'form-item__input',
        `form-item__input--${type}`].join(' ').trim()}
      placeholder={placeholder}
      type={type}
      onChange={handleChange}
      aria-label={label}
      {...value ? `value="${value}"` : ''}
    />
  );
};

Input.propTypes = {
  /**
   * Input's label
   */
  label: PropTypes.string.isRequired,
  /**
   * Input's placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Input's allowed types
   */
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'date',
    'textarea',
    'select',
  ]).isRequired,
  /**
   * Input's value
   */
  value: PropTypes.string,
  /**
   * Input's handleChange
   */
  handleChange: PropTypes.func,
};

Input.defaultProps = {
  label: 'Form Item Label',
  type: 'text',
  placeholder: 'Placeholder',
  value: '',
};

/**
 * Render <textarea></textarea> HTML
 * @return {object} (
 *   <Textarea />
 * )
 */
const Textarea = () => (
  <textarea
    className={[
      'form-item__input',
      'form-item__input--textarea'].join(' ').trim()}
  ></textarea>
);

/**
 * Render <textarea></textarea> HTML
 * @param {array} options of the input.
 * @return {object} (
 *   <Select options={options />
 * )
 */
const Select = ({ options }) => (
  <select
    defaultValue={options[0]}
    className={[
      'form-item__input',
      'form-item__input--select'].join(' ').trim()}
  >
    <option disabled value={options[0]}>{options[0]}</option>
    {options.slice(1).map((item, key) =>
      <option key={key} value={item}>{item}</option> )
    }
  </select>
);

Select.propTypes = {
  /**
   * Select's options
   */
  options: PropTypes.array,
};

Select.defaultProps = {
  options: [],
};
