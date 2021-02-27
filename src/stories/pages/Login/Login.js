import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { SplitGradient } from '../../layouts/SplitGradient/SplitGradient';
import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';

/**
 * Component for login page.
 *
 * @component
 * @param {string} modifierClasses Class modifiers of the page.
 * @return {object} (
 *   <Login modifierClasses={modifierClasses}>
 * )
 */

export const Login = ({
  modifierClasses, leftContent, rightContent,
}) => {
  return (
    <Main>
      <div
        className={[
          'login',
          `${modifierClasses}`,
        ].join(' ').trim()}
      >
        <Header
          modifierClasses="header--no-border"
          leftContent={<Branding text="SIE" />}
        />
        <SplitGradient>
        </SplitGradient>
      </div>
    </Main>
  );
};

Login.propTypes = {
  /**
   * Login's modifier classes
   */
  modifierClasses: PropTypes.string,
  /**
   * Login's left content
   */
  leftContent: PropTypes.node,
  /**
   * Login's right content
   */
  rightContent: PropTypes.node,
};

Login.defaultProps = {
  modifierClasses: '',
  leftContent: '',
  rightContent: '',
};
