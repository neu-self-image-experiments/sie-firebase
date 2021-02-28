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
import UserServices from '../../../firebase/CRUDServices/userServices';
import '../../../firebase/firebase';

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
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const getUser = (e) => {
    e.preventDefault();

    const userService = UserServices.getInstance();

    userService.getUsers().then((response) => {
      try {
        response.forEach((item) => {
          if (
            item.username === username &&
            item.password === password
          ) {
            // REDIRECT TO DASHBOARD
            setError(false);
            window.alert('USER  EXISTS!'); // remove eventually
            return;
          }
        });
      } catch (err) {
        // ERROR HANDLING
      }
    });
    setError(true);
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
              { error &&
                <div className="form__msg">
                  <p>Sorry, the login credentials you entered are incorrect.</p>
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
