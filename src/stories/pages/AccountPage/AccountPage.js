/* eslint-disable no-console */
import './styles.scss';

import React, { useEffect, useState } from 'react';
import { AccountInfoPage } from './AccountInfoPage/AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import {
  getCurrentUser,
  generateUserDoc,
} from '../../../firebase/api/users.js';

// This probably needs to be moved to the App level/higher level component
export const UserContext = React.createContext();

/**
 * Component for Account page.
 *
 * @component
 * @return {object} (
 *   <AccountPage>
 * )
 */
export const AccountPage = () => {
  const [logInState, setLogInState] = useState({ isLoggedIn: false });
  const [auth, setAuth] = useState();
  const [error, setError] = useState();

  const user = {
    firstName: 'Carlo',
    lastName: 'Mutuc',
    email: 'cjay747@yahoo.com',
    role: 'Administrator',
    username: 'cjay747',
    password: 'password',
  };

  // const deleteUser = async () => {
  //   const result = await userService.deleteUserById(logInState.user.uid);
  //   if (result) {
  //     // TODO: redirect
  //   } else {
  //     // TODO: show error
  //   }
  // };

  const updateUser = async () => {
    const result = generateUserDoc(auth, user).catch((e) => {
      console.log(e);
    });
    console.log(result);
  };

  useEffect(async () => {
    getCurrentUser()
      .then((res) => {
        console.log(res);
        setLogInState({ isLoggedIn: true, user });
        setAuth(res);
      })
      .catch((err) => {
        console.log(err);
        setLogInState({ isLoggedIn: false });
        setError(err);
      });
  }, [logInState.isLoggedIn]);

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : logInState.isLoggedIn ? (
    <UserContext.Provider value={logInState.user}>
      <div>
        <HorizontalTitle
          eyebrow={'Account'}
          title={'Personal Information'}
          content={
            'Here\'s an overview of what\'s going on your application. ' +
            'You can review your active experiments, ' +
            'check reports and analyze real-time data.'
          }
        ></HorizontalTitle>
        <AccountInfoPage></AccountInfoPage>
        <Button
          isButton={true}
          text="Update"
          onClick={async () => updateUser()}
        ></Button>
      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
