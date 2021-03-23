import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Main } from '../../layouts/Main/Main';
import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Form } from '../../components/Form/Form';
import { FormItem } from '../../components/FormItem/FormItem';
import { Button } from '../../components/Button/Button';
import { Section } from '../../components/Section/Section';
import { SplitGradient } from '../../layouts/SplitGradient/SplitGradient';
import { Footer } from '../../layouts/Footer/Footer';
import { signUp } from '../../../firebase/api/users';
import { StatusCodes } from 'http-status-codes';

/**
 * Component for signup page.
 *
 * @component
 * @return {object} (
 *   <ParticipantSignup />
 * )
 */

export const ParticipantSignup = () => {
  const isDarkTheme = false;
  const history = useHistory();
  // define user fields
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const postUser = (e) => {
    e.preventDefault();
    // call user service
    // define new user object
    const user = {
      fullName,
      email,
      password,
    };

    const userData = {
      fullName,
      lastName,
      role,
    };

    signUp(user.email, user.password, userData).then((response) => {
      if (response.status === StatusCodes.CREATED) {
        // redirect to login page
        history.push('/login');
      } else {
        setError(response.errorMessage);
      }
    });
  };

  return (
    <Main>
      <div className="signup">
        <Header
          modifierClasses='header--no-border'
          leftContent={<Branding text="SIE" />}
        />
        <SplitGradient
          modifierClasses='split-gradient--light'
          leftContent={
            <Section titleEl='h1' title='Welcome'>
              <p>Welcome to the SIE platform. In order to participate to this
                study, please fill the identification form.
              </p>
            </Section>
          }
          rightContent={
            <Form type='signup'>
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Full Name'
                type='text'
                placeholder='Full Name'
                handleChange={(e) => setFullName(e.target.value)}
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Email'
                type='email'
                placeholder='Email'
                handleChange={(e) => setEmail(e.target.value)}
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Password'
                type='password'
                placeholder='Password'
                handleChange={(e) => setPassword(e.target.value)}
              />
              { error &&
                <div className="form__msg">
                  <p>{error}</p>
                </div>
              }
              <Button
                modifierClasses={isDarkTheme ?
                  'button--small button--quaternary' :
                  'button--small'
                }
                disabled={true}
                isButton={true} text="Create an account"
                onClick={(e) => postUser(e)}
              />
            </Form>
          }
        />
        <Footer
          modifierClasses={ !isDarkTheme ? 'footer--light' : '' }
          leftContent={<p>Need Help? <a href="#">Contact us</a>.</p>}
        />
      </div>
    </Main>
  );
};
