import './styles.scss';

import React, { useEffect, useState } from 'react';
import { AccountInfoPage } from './AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';

export const AccountPage = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const userService = UserServices.getInstance();

  useEffect(() => {
    userService.getCurrentUser(setUser).then(setError).catch(setError);
  }, []);

  const deleteUser = async () => {
    const result = await userService.deleteUserById(user.id);
    if (result) {
      // TODO: redirect
    } else {
      // TODO: show error
    }
  };

  return error ? (
    <div>
      <HorizontalTitle
        eyebrow={'Account'}
        title={'Personal Information'}
        content={'Content goes here'}
      ></HorizontalTitle>
      <AccountInfoPage user={user}></AccountInfoPage>
      <Button text="Delete my account" onClick={deleteUser}></Button>
    </div>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
