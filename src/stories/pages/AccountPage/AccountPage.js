import './styles.scss';

import React, { useEffect, useState } from 'react';
import { AccountInfoPage } from './AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';

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
    userService.getCurrentUser(setLogInState).catch((e) => setError(e));
  }, []);

  const getSidebarContent = () => {
    return (
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
    );
  };

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : logInState.isLoggedIn ? (
    <Constrain>
      <Sidebar leftContent={<h3>Menu goes here</h3>}
        rightContent={getSidebarContent()}/>
    </Constrain>
  ) : (
    <div>{'No user'}</div>
  );
};
