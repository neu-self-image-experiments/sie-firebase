import './styles.scss';

import React, { useEffect, useState } from 'react';
import { AccountInfoPage } from './AccountInfoPage/AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';

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
  const [error, setError] = useState();

  const userService = UserServices.getInstance();

  const deleteUser = async () => {
    const result = await userService.deleteUserById(logInState.user.uid);
    if (result) {
      // TODO: redirect
    } else {
      // TODO: show error
    }
  };

  useEffect(async () => {
    userService.getCurrentUser(setLogInState).catch((e) => {
      setLogInState({ isLoggedIn: false });
      setError(e);
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
        <Button text="Delete my account" onClick={deleteUser}></Button>
      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
