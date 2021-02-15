import './styles.scss';

import React from 'react';

/**
 * Component for loader element.
 *
 * @component
 * @param {string} title the component.
 * @param {string} text of the component.
 * @param {string} alertType of the component.
 * @return {object} (
 *   <Alert title={title} text={text} />
 * )
 */
export const Alert = ({title, text, alertType}) => {
    return (
        <div
            className={['alert', `alert--${alertType}`].join(' ').trim()}
        >
            { title ?
                <h3>{title}</h3> :
                ''
            }
            <p>{s}</p>
        </div>
    );
};

Alert.propTypes = {
    /**
   * Alert type
   */
    alertType: PropTypes.string.isRequired,
    /**
   * Alert's title
   */
    title: PropTypes.string,
    /**
   * Alert's text
   */
    text: PropTypes.string.isRequired,
};

Alert.defaultProps = {
    alertType: 'warning',
    title: '',
    text: 'This is a warning alert.',
};

