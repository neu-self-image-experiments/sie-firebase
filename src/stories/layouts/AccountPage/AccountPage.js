import React from 'react';
import PropTypes from 'prop-types';
import { AccountInfoPage } from './AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';

export const AccountPage = ({ editing }) => {
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
      <AccountInfoPage user={user} editing={editing}></AccountInfoPage>
      <Button onClick={deleteUser}></Button>
    </div>
  );
};

AccountPage.propTypes = {
  editing: PropTypes.bool.isRequired,
};
