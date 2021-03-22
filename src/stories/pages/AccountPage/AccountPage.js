/* eslint-disable no-console */
import './styles.scss';

import React, { useEffect, useState } from 'react';
import { AccountInfoPage } from './AccountInfoPage/AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import { getCurrentUser, getUser } from '../../../firebase/api/users.js';

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
  const [user, setUser] = useState();
  const [error, setError] = useState();

  // TODO
  // const deleteUser = async () => {
  //   const result = await userService.deleteUserById(logInState.user.uid);
  //   if (result) {
  //     // TODO: redirect
  //   } else {
  //     // TODO: show error
  //   }
  // };

  useEffect(async () => {
    try {
      const auth = await getCurrentUser();
      if (auth) {
        const user = await getUser(auth.uid);
        setUser(user.data);
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : user ? (
    <UserContext.Provider value={{ user, setUser }}>
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
        <Button isButton={true} text="Delete My Account"></Button>
      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
