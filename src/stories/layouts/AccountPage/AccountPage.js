import './styles.scss';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AccountInfoPage } from './AccountInfoPage';
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import UserServices from '../../../firebase/CRUDServices/userServices';

export const AccountPage = ({ editing }) => {
  const [user, setUser] = useState({ loggedIn: false });
  const userService = UserServices.getInstance();

  useEffect(() => {
    const unsubscribe = userService.getCurrentUser(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const deleteUser = async (id) => {
    const result = await userService.deleteUserById(id);
    if (result) {
      // TODO: redirect
    } else {
      // TODO: show error
    }
  };

  // TODO: delete this
  // const userTest = {
  //   firstName: 'Carlo',
  //   lastName: 'Mutuc',
  //   email: 'cmutuc25@gmail.com',
  //   role: 'Administrator',
  //   username: 'cjay747',
  //   password: 'mypassword',
  // };

  return (
    <div>
      <HorizontalTitle
        eyebrow={'Account'}
        title={'Personal Information'}
        content={'Content goes here'}
      ></HorizontalTitle>
      <AccountInfoPage user={user} editing={editing}></AccountInfoPage>
      <Button text="Delete my account" onClick={deleteUser}></Button>
    </div>
  );
};

AccountPage.propTypes = {
  editing: PropTypes.bool.isRequired,
};
