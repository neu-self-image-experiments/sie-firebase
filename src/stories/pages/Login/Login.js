import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { SplitGradient } from '../../layouts/SplitGradient/SplitGradient';
import { Header } from '../../layouts/Header/Header';
import { Footer } from '../../layouts/Footer/Footer';
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
        <Footer
          modifierClasses={ !isDarkTheme ? 'footer--light' : '' }
          leftContent={<p>Need Help? <a href="#">Contact us</a>.</p>}
          rightContent={
            <p>Don’t have an account yet? <a href="#">Sign up</a>.</p>
          }
        />
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
