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
 * @return {object} (
 *   <FormItem modifierClasses={modifierClasses} text={text} />
 * )
 */
export const FormItem = (
    { modifierClasses, label, showLabel, placeholder, type, value },
) => {
    // dynamically render Form Item Input
    function returnFormItem(type) {
        // switch statement to check value of type
        switch (type) {
        case 'textarea':
            return <Textarea />;
        case 'select':
            return <Textarea />;
        default:
            return <Input placeholder={placeholder}
                label={showLabel ? label : false}
                type={type}
                value={value}/>;
        }
    }

    return (
        <div className={['form-item', `${modifierClasses}`].join(' ').trim()}>
            {returnFormItem(type)}
            <label
                className={[
                    'form-item__label',
                    `${showLabel ? 'is-hidden' : ''}`].join(' ').trim()}
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
   * FormItem's label
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
};

FormItem.defaultProps = {
    modifierClasses: '',
    showLabel: false,
    label: 'Form Item Label',
    type: 'text',
    placeholder: 'Placeholder',
    value: '',
};

/**
 * Fragment for Wizard's controls.
 * @param {string} placeholder of the input.
 * @param {enum} type of the input.
 * @param {string} value of the input.
 * @param {string} label of the input.
 * @return {object} (
 *   <Input
 *      placeholder={placeholder} label={label}
        type={type} value={value}/>
 * )
 */
const Input = ({type, placeholder, value, label}) => (
    <input
        className={[
            'form-item__input',
            `form-item__input--${type}`].join(' ').trim()}
        placeholder={placeholder}
        type={type}
        aria-label={label}
        {...value ? `value="${value}"` : ''}
    />
);

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
   * Input's type values
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
};

Input.defaultProps = {
    label: 'Form Item Label',
    type: 'text',
    placeholder: 'Placeholder',
    value: '',
};

/**
 * Fragment for Textarea's controls.
 *
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
