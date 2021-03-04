import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button/Button';

/**
 * Component for File Upload element.
 *
 * @component
 * @param {func} onChange File upload value change
 * @param {func} onClick File Upload click function
 * @return {object} (
 *   <FileUpload onClick={onClick} />
 * )
 */
export const FileUpload = ({ onChange, onClick }) => {
  return (
    <div className="file-upload">
      <h4>Or upload a photo instead</h4>
      <div className="file-upload__inner">
        <label htmlFor="file-upload__input" className="file-upload__label">
          Browse...
        </label>
        <p id="file-upload__selected">No file selected.</p>
        <input
          id="file-upload__input"
          type="file"
          onChange={onChange} />
        <Button
          isButton={true}
          modifierClasses="file-upload__btn button--small"
          text="Upload"
          onClick={onClick} />
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  /**
   * FileUpload's onChange function
   */
  onChange: PropTypes.func,
  /**
   * FileUpload's onClick function
   */
  onClick: PropTypes.func,
};

FileUpload.defaultProps = {
  onChange: null,
  onClick: null,
};
