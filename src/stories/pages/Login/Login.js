
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { SplitGradient } from '../../layouts/SplitGradient/SplitGradient';
import { Header } from '../../layouts/Header/Header';
import { Footer } from '../../layouts/Footer/Footer';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Section } from '../../components/Section/Section';
import { FormItem } from '../../components/FormItem/FormItem';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { signIn } from '../../../firebase/api/users';

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
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const getUser = (e) => {
    e.preventDefault();

    signIn(email, password).then((response) => {
      if (response.data) {
        // REDIRECT TO DASHBOARD
        // ERROR HANDLING
        history.push('/dashboard');
      } else {
        setError(response.errorMessage);
      }
    });
  };

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
          leftContent={
            <Section titleEl="h1" title="Welcome back."
              content="Login into your account to access your user dashboard."
            />
          }
          rightContent={
            <Form type="login">
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                placeholder="Email"
                type="email"
                showLabel={false}
                label="Username"
                handleChange={(e) => setEmail(e.target.value)}
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                placeholder="Password"
                type="password"
                showLabel={false}
                label="Password"
                handleChange={(e) => setPassword(e.target.value)}
              />
              { error &&
                <div className="form__msg">
                  <p>{error}</p>
                </div>
              }
              <Button
                modifierClasses={
                  isDarkTheme ?
                    'button--small button--quaternary' :
                    'button--small'
                }
                disabled={true}
                isButton={true} text="Login" onClick={(e) => getUser(e)}
              />
            </Form>
          }
        />
        <Footer
          modifierClasses={ !isDarkTheme ? 'footer--light' : '' }
          leftContent={<p>Need Help? <a href="#">Contact us</a>.</p>}
          rightContent={
            <p>Don’t have an account yet? <Link to="/signup">Sign up</Link>.</p>
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
