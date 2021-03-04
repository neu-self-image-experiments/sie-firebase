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
import UserServices from '../../../firebase/CRUDServices/userServices';

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

  const postUser = (e) => {
    e.preventDefault();
    // call user service
    const service = UserServices.getInstance();
    // define new user object
    const user = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    service.signUp(user).then((response) => {
      if (response.status === 200) {
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
          modifierClasses={!isDarkTheme ? 'split-gradient--light' : ''}
          leftContent={
            <Section titleEl='h1'
              title='Welcome'
              content={'To participate to an experiment, ' +
                'create an account and login onto the ' +
                'platform.'}
            />
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
                options={['Administrator', 'Researcher', 'Participant']}
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