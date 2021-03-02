import React from 'react';
import { AccountInfoPage } from './AccountInfoPage';
import { Button } from '../../components/Button';
import { HorizontalTitle } from '../../components/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';

export const AccountPage = () => {
  const deleteUser = async (id) => {
    const userService = UserServices.getInstance();
    const result = await userService.deleteUserById(id);
    if (result) {
      // redirect
    } else {
      // show error
    }
  };

  // TODO: delete this
  const user = {
    firstName: 'Carlo',
    lastName: 'Mutuc',
    email: 'cmutuc25@gmail.com',
    role: 'Administrator',
    username: 'cjay747',
    password: 'mypassword',
  };

  return (
    <div>
      <HorizontalTitle
        eyebrow={'Account'}
        title={'Personal Information'}
        content={'Content goes here'}
      ></HorizontalTitle>
      <AccountInfoPage user={user}></AccountInfoPage>
      <Button onClick={deleteUser}></Button>
    </div>
  );
};
