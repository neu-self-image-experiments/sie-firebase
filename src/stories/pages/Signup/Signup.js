import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
 * @param {boolean} isDarkTheme
 * @return {object} (
 *   <Signup isDarkTheme={isDarkTheme}>
 * )
 */

export const Signup = ({ isDarkTheme }) => {
  const history = useHistory();
  // define user fields
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const userRoles =[
    'Select a role',
    'Administrator',
    'Researcher',
  ];

  const validate = () => {
    setError('');
    let isError = false;

    if (firstName === '') {
      setError('Please enter a first name');
      isError = true;
    } else if (lastName === '') {
      setError('Please enter a last name');
      isError = true;
    } else if (email === '') {
      setError('Please enter a valid email address');
      isError = true;
    } else if (password === '') {
      setError('Please enter a password that is 6 characters long or more');
      isError = true;
    } else if (role === '') {
      setError('Please select a role');
      isError = true;
    }

    return isError;
  };

  const postUser = (e) => {
    e.preventDefault();
    // call user service
    // define new user object
    const isError = validate();

    if (!isError) {
      const user = {
        firstName,
        lastName,
        email,
        password,
        role,
      };

      const userData = {
        firstName,
        lastName,
        role,
      };

      signUp(user.email, user.password, userData).then((response) => {
        if (response.status === StatusCodes.CREATED) {
          // redirect to login page
          history.push('/login');
        } else {
          setError(response.error.message);
        }
      });
    }
  };

  return (
    <Main>
      <div className="signup">
        <Header
          modifierClasses='header--no-border'
          leftContent={<Branding text="SIE" />}
        />
        <SplitGradient
          modifierClasses={!isDarkTheme ? 'split-gradient--light' : ''}
          leftContent={
            <Section titleEl='h1' title='Welcome'>
              <p>To participate to an experiment, create an account
                and login onto the platform.</p>
            </Section>
          }
          rightContent={
            <Form type='signup'>
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='First Name'
                type='text'
                placeholder='First Name'
                handleChange={(e) => setFirstName(e.target.value)}
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Last Name'
                type='text'
                placeholder='Last Name'
                handleChange={(e) => setLastName(e.target.value)}
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
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Role'
                type='select'
                options={userRoles}
                handleChange={(e) => setRole(e.target.value)}
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
          rightContent={
            <p>Already have an account? <Link to="/login">Login</Link>.</p>
          }
        />
      </div>
    </Main>
  );
};

Signup.propTypes = {
  isDarkTheme: PropTypes.bool,
};

Signup.defaultProps = {
  isDarkTheme: true,
};
