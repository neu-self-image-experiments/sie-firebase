import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for File Upload element.
 *
 * @component
 * @param {func} onChange File upload value change
 * @return {object} (
 *   <FileUpload onChange={onChange} />
 * )
 */
export const FileUpload = ({ onChange }) => {
  const setInputValue = (e) => {
    e.target.previousSibling.innerHTML = e.target.files.item(0).name;
  };

  return (
    <div className="file-upload">
      <h4>Or upload a photo instead</h4>
      <div className="file-upload__inner">
        <label htmlFor="file-upload__input" className="file-upload__label">
          Browse...
        </label>
        <p id="fileName">No file selected.</p>
        <input
          className="file-upload__input"
          id="file-upload__input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setInputValue(e);
            onChange(e);
          }}/>
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  /**
   * FileUpload's onChange function
   */
  onChange: PropTypes.func,
};

FileUpload.defaultProps = {
  onChange: null,
};
