import './styles.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SplitGradient } from '../../layouts/SplitGradient/SplitGradient';
import { Header } from '../../layouts/Header/Header';
import { Footer } from '../../layouts/Footer/Footer';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Section } from '../../components/Section/Section';
import { FormItem } from '../../components/FormItem/FormItem';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
// import UserServices from '../../../firebase/CRUDServices/userServices';

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
  const [user] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const newUser = {
    ...user,
    username,
    password,
  };

  const getUser = (e) => {
    e.preventDefault();
    console.log(newUser); // eslint-disable-line no-console
  };
  // UserServices.getUsers();
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
                placeholder="Username or Email"
                type="text"
                showLabel={false}
                label="Username"
                handleChange={(e) => setUsername(e.target.value)}
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                placeholder="Password"
                type="password"
                showLabel={false}
                label="Password"
                handleChange={(e) => setPassword(e.target.value)}
              />
              <Button
                modifierClasses="button--small button--quaternary"
                isButton={true} text="Login" onClick={(e) => getUser(e)}
              />
            </Form>
          }
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
