import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

/**
 * Component for button element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {string} url URL of the component.
 * @param {string} text Text of the component.
 * @param {boolean} isButton Boolean in case markup should be <button>.
 * @param {func} onClick Button click function.
 * @return {object} (
 *   <Button modifierClasses={modifierClasses} url={url} text={text} />
 * )
 */
export const Button = ({ modifierClasses, url, text, isButton, onClick }) => {
  const classes = ['button', `${modifierClasses}`].join(' ').trim();

  return (
    <Fragment>
      {isButton ?
        <button role="button" className={classes} onClick={onClick}>
          {text}
        </button> :
        <a href={url} className={classes}>{text}</a>
      }
    </Fragment>
  );
};

Button.propTypes = {
  /**
   * Button's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Button's url
   */
  url: PropTypes.string,
  /**
   * Button's text
   */
  text: PropTypes.string.isRequired,
  /**
     * Button's isButton
     */
  isButton: PropTypes.bool,
  /**
     * Button's onClick
     */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  modifierClasses: '',
  isButton: false,
  onClick: null,
};
