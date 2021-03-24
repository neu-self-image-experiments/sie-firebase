import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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
 * @return {object} (
 *   <AnonymousLogin />
 * )
 */

export const AnonymousLogin = () => {
  const { experimentId } = useParams();
  const isDarkTheme = false;
  const history = useHistory();
  // define user fields
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');

  const goToExperiment = (e) => {
    e.preventDefault();
    // call user service
    // define new user object

    console.log(experimentId); // eslint-disable-line no-console
    if (fullName) {
      let participantId = new Date().toISOString();
      participantId = participantId.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      // redirect to login page
      history.push(`/user/${participantId}/study/${experimentId}`);
    } else {
      setError('Please, fill out all fields.');
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
          modifierClasses='split-gradient--light'
          leftContent={
            <Section titleEl='h1' title='Welcome'>
              <p>Welcome to the SIE Platform. In order to participate to this
                study, tell us your name and some basic information.
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
                isButton={true} text="Go to Study"
                onClick={(e) => goToExperiment(e)}
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
