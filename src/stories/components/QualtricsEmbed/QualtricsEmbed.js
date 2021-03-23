import './styles.scss';

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Component for Qualtrics embeds.
 *
 * @component
 * @param {string} url of the Qualtrics form.
 * @return {object} (
 *   <QualtricsEmbed url={url} />
 * )
 */
export const QualtricsEmbed = ({ url }) => {
  return (
    <iframe className="qualtrics-embed" src={url}
      height="800px" width="600px" />
  );
};

QualtricsEmbed.propTypes = {
  /**
   * QualtricsEmbed's url
   */
  url: PropTypes.string.isRequired,
};

QualtricsEmbed.defaultProps = {
  url: '',
};

