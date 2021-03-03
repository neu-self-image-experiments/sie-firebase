import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import UploadLogo from '../../../images/file_upload-white-18dp.svg';
import { Button } from '../Button/Button';

/**
 * Component for File Upload element.
 *
 * @component
 * @param {func} onClick File Upload click function
 * @return {object} (
 *   <FileUpload onClick={onClick} />
 * )
 */
export const FileUpload = ({ onClick }) => {
  const buttonText = (
    <div className="upload-icon">
      <p>Upload <img src={UploadLogo} /></p>
    </div>
  );

  return (
    <div className="file-upload-container">
      <h3>Upload a photo instead</h3>
      <div className="file-upload">
        <input type="file" />
        <Button text={buttonText} onClick={onClick} />
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  /**
   * FileUpload's onClick function
   */
  onClick: PropTypes.func,
};

FileUpload.defaultProps = {
  onClick: null,
};
