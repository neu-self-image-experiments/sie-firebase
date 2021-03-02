import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for toggle camera element.
 *
 * @component
 * @param {func} onClick define click function.
 * @param {boolean} toggleOn whether toggle is on or off.
 * @return {object} (
 *   <ToggleCamera onClick={onClick} />
 * )
 */
export const ToggleCamera = ({ onClick, toggleOn }) => {
  return (
    <div className="toggle-camera">
      <div className="toggle-camera__half">
        <h4 className="toggle-camera__title">Ready to take a photo?</h4>
        <p>Turn on your webcam.</p>
      </div>
      <div className="toggle-camera__half">
        <Toggle on={toggleOn} />
      </div>
    </div>
  );
};

ToggleCamera.propTypes = {
  /**
   * ToggleCamera's onClick
   */
  onClick: PropTypes.func,
  /**
   * ToggleCamera's toggleOn
   */
  toggleOn: PropTypes.bool,
};

ToggleCamera.defaultProps = {
  onClick: null,
  toggleOn: false,
};

/**
 * Component for toggle icon element.
 *
 * @component
 * @param {boolean} on define on/off toggle.
 * @return {object} (
 *   <Toggle on={on} />
 * )
 */
export const Toggle = ({ on }) => {
  return (
    <button className={
      ['toggle-camera__icon', `${on && 'is-on'}`].join(' ').trim()
    }>
    </button>
  );
};

Toggle.propTypes = {
  /**
   * ToggleCamera's on
   */
  on: PropTypes.bool,
};

Toggle.defaultProps = {
  on: false,
};
