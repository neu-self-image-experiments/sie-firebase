import React from 'react';
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

/**
 * Component for signup page.
 *
 * @component
 * @param {boolean} isDarkTheme
 * @return {object} (
 *   <Signup isDarkTheme={isDarkTheme}>
 * )
 */

export const Signup = ({isDarkTheme}) => {
  return (
    <Main>
      <div className='signup'>
        <Header
          modifierClasses='header--no-border'
          leftContent={<Branding text="SIE" />}
        />
        <SplitGradient
          modifierClasses={!isDarkTheme ? 'split-gradient--light' : ''}
          leftContent={
            <Section titleEl=''
              title='Welcome'
              content={'To participate to an experiment, ' +
                'create an account and login onto the ' +
                'platform.'}
            />
          }
          rightContent={
            <Form type='default'>
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='FullName'
                type='text'
                placeholder='Full Name'
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Email'
                type='email'
                placeholder='Email'
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Password'
                type='password'
                placeholder='Password'
              />
              <FormItem
                modifierClasses={isDarkTheme ? 'form-item--light' : ''}
                label='Role'
                type='select'
                options={['Researcher', 'Participant']}
              />
              <Button
                modifierClasses={isDarkTheme ?
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
            <p>Already have an account? <a href="#">Login</a>.</p>
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
