import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../components/Form/Form';
import { FormItem } from '../../components/FormItem/FormItem';

export const AccountInfoPage = ({ user }) => {
  const [username, setUsername] = userState('');
  const [password, setPassword] = userState('');
  const [firstName, setFirstName] = userState('');
  const [lastName, setLastName] = userState('');
  const [email, setEmail] = userState('');
  const [role, setRole] = userState('');

  return (
    <div>
      <Form>
        <FormItem
          label={'First Name'}
          showLabel={true}
          value={firstName}
        ></FormItem>
        <FormItem
          label={'Last Name'}
          showLabel={true}
          value={lastName}
        ></FormItem>
        <FormItem
          label={'Email Address'}
          showLabel={true}
          value={email}
        ></FormItem>
        <FormItem
          label={'Role'}
          showLabel={true}
          value={role}
        ></FormItem>
        <FormItem
          label={'Username'}
          showLabel={true}
          value={username}
        ></FormItem>
        <FormItem
          label={'Password'}
          showLabel={true}
          value={password}
        ></FormItem>
      </Form>
    </div>
  );
};

AccountInfoPage.propTypes = {
  user: {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  },
};
