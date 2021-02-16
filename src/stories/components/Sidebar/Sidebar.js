import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for sidebar element.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the component.
 * @param {html} sidebarContent Sidebar content of the component.
 * @param {html} mainContent Main content of the component.
 * @return {object} (
 *   <Sidebar modifierClasses={modifierClasses} />
 *      {sidebarContent}
 *      {mainContent}
 *   </Sidebar>
 * )
 */

export const Sidebar = ({ modifierClasses, sidebarContent, mainContent}) => {
    return (
        <div
            className={['sidebar', `${modifierClasses}`].join(' ').trim()}
        >
            <div>{sidebarContent}</div>
            <div>{mainContent}</div>
        </div>
    );
};

Sidebar.propTypes = {
    /**
   * Sidebar's modifier classes
   */
    modifierClasses: PropTypes.string,
    /**
   * Sidebar's sidebar content
   */
    sidebarContent: PropTypes.string,
    /**
   * Sidebar's main content
   */
    mainContent: PropTypes.string,
};

Sidebar.defaultProps = {
    modifierClasses: '',
    sidebarContent: '',
    mainContent: '',
};
