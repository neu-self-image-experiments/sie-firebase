import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { SplitGradient } from '../../layouts/SplitGradient/SplitGradient';
import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Section } from '../../components/Section/Section';
import { Form } from '../../components/Form/Form';

/**
 * Component for login page.
 *
 * @component
 * @param {boolean} isDarkTheme theme color of the page.
 * @return {object} (
 *   <Login isDarkTheme={isDarkTheme}>
 * )
 */

export const Login = ({ isDarkTheme }) => {
  function renderContent() {
    return <SplitGradient
      modifierClasses={ !isDarkTheme ? 'split-gradient--light' : '' }
      leftContent={Content}
    />;
  }

  return (
    <Main>
      <div
        className="login"
      >
        <Header
          modifierClasses="header--no-border"
          leftContent={<Branding text="SIE" />}
        />
        <SplitGradient
          modifierClasses={ !isDarkTheme ? 'split-gradient--light' : '' }
          leftContent={<Content />}
          rightContent={<LoginForm isDarkTheme={isDarkTheme} />}
        />
        {renderContent()}
      </div>
    </Main>
  );
};

Login.propTypes = {
  /**
   * Login's isDarkTheme
   */
  isDarkTheme: PropTypes.bool,
};

Login.defaultProps = {
  isDarkTheme: true,
};

// Page content
const Content = () => {
  return (
    <Section
      title="Welcome back."
      content="Login into your account to access your user dashboard."
    />
  );
};

// Login Form
const LoginForm = ({ isDarkTheme, handleSubmit }) => {
  return (
    <Form
      isDarkTheme={isDarkTheme}
      type="login"
      buttonText="Login"
      handleSubmit={handleSubmit}
    />
  );
};

LoginForm.propTypes = {
  /**
   * Login's isDarkTheme
   */
  isDarkTheme: PropTypes.bool,
  /**
   * Login's handleSubmit
   */
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  isDarkTheme: true,
  handleSubmit: null,
};
