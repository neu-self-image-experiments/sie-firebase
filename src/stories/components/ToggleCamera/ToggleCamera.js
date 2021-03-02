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
 *   <ToggleCamera onClick={onClick} toggleOn={toggleOn} />
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
        <ToggleIcon onClick={onClick} on={toggleOn} />
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
 * @param {func} onClick on click function.
 * @param {boolean} on define on/off toggle.
 * @return {object} (
 *   <ToggleIcon on={on} />
 * )
 */
const ToggleIcon = ({ onClick, on }) => {
  return (
    <button
      className={['toggle-camera__icon', `${on && 'is-on'}`].join(' ').trim()}
      onClick={onClick}
    >{ on ? 'On' : 'Off' }
    </button>
  );
};

ToggleIcon.propTypes = {
  /**
   * ToggleIcon's onClick
   */
  onClick: PropTypes.func,
  /**
   * ToggleIcon's on
   */
  on: PropTypes.bool,
};

ToggleIcon.defaultProps = {
  onClick: null,
  on: false,
};
