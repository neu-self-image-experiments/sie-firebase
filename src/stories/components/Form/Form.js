import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';


/**
 * Component for Form element.
 *
 * @component
 * @param {node} children items of the form.
 * @param {string} type of the form.
 * @return {object} (
 *   <Form type={type}>
 *      {children}
 *   </Form>
 * )
 */
export const Form = (
  { children, type },
) => {
  return (
    <form
      className={['form', `form--${type}`].join(' ').trim()}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  /**
   * Form's node children
   */
  children: PropTypes.node,
  /**
   * Form's type
   */
  type: PropTypes.string.isRequired,
};

Form.defaultProps = {
  type: 'default',
};
