import './styles.scss';

import React, { useEffect, useState } from 'react';
import { AccountInfoPage } from './AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';

export const UserContext = React.createContext();

export const AccountPage = () => {
  const [logInState, setLogInState] = useState({ isLoggedIn: false });
  const [error, setError] = useState();

  const userService = UserServices.getInstance();

  const deleteUser = async () => {
    const result = await userService.deleteUserById(user.id);
    if (result) {
      // TODO: redirect
    } else {
      // TODO: show error
    }
  };

  useEffect(async () => {
    userService.getCurrentUser(setLogInState).catch((e) => setError(e));
  }, []);

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : logInState.isLoggedIn ? (
    <UserContext.Provider value={logInState.user}>
      <div>
        <HorizontalTitle
          eyebrow={'Account'}
          title={'Personal Information'}
          content={'Content goes here'}
        ></HorizontalTitle>
        <AccountInfoPage></AccountInfoPage>
        <Button text="Delete my account" onClick={deleteUser}></Button>
      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No user'}</div>
  );
};
